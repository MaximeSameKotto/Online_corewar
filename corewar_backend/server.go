package main

import (
	"fmt"
	"log"
	"net/http"
    "time"
	"os"
    "os/exec"

	socketio "github.com/googollee/go-socket.io"
	uuid "github.com/satori/go.uuid"
)

type Lobby struct {
	id      uuid.UUID
	players []Player
	state   string
}

type Player struct {
	name   string
	id     uuid.UUID
	state  string
	socket socketio.Conn
}

func newLobby() Lobby {
	lobby := Lobby{id: uuid.Must(uuid.NewV4(), nil),
		players: make([]Player, 0),
		state:   "Waiting for game to start."}
	return lobby
}

func newPlayer(name string, socket socketio.Conn) Player {
	player := Player{name: name,
		id:     uuid.Must(uuid.NewV4(), nil),
		state:  "In lobby.",
		socket: socket}
	return player
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		allowHeaders := "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Headers", allowHeaders)

		next.ServeHTTP(w, r)
	})
}

func is_name_taken(lobbies []Lobby, username string, socket socketio.Conn) bool {  
    for _, lobby := range lobbies {
        for _, player := range lobby.players {
            if player.name == username {
                log.Println("username: ", username, "already taken.")
                socket.Emit("isLobbyJoined", "Username already taken.")
                return true
            }
        }
    }
    return false;
}

func main() {
	server, err := socketio.NewServer(nil)
	lobbies := []Lobby{}

	if err != nil {
		log.Fatal(err)
	}
	server.OnConnect("/", func(socket socketio.Conn) error {
		fmt.Println("Client connected as socket id:", socket.ID())
		return nil
	})
	server.OnEvent("/", "createLobby", func(socket socketio.Conn, username string) {
        if is_name_taken(lobbies, username, socket) {
            return
        }
		lobby := newLobby()
		creator := newPlayer(username, socket)
		lobby.players = append(lobby.players, creator)
		lobbies = append(lobbies, lobby)
		log.Println("Lobby created as uuid: ", lobby.id)
		socket.Emit("isLobbyCreated", lobby.id.String())
	})
	server.OnEvent("/", "joinLobby", func(socket socketio.Conn, uuid uuid.UUID, username string) {
		for _, lobby := range lobbies {
			if lobby.id == uuid {
				lobby.players = append(lobby.players, newPlayer(username, socket))
				log.Println("Lobby: ", uuid.String(), "\n", "Joined by ", username)
				socket.Emit("isLobbyJoined", "Lobby joined.")
				return
			}
		}
        time.Sleep(time.Second)
		log.Println("No Lobby with uuid: ", uuid.String())
		socket.Emit("isLobbyJoined", "Lobby does not exist.")
	})
	server.OnEvent("/", "UploadChampion", func(socket socketio.Conn, binary string, username string) {
        champ_file, err := os.Create(username + ".cor")
        if err != nil {
		    fmt.Println("Cannot create file")
		    socket.Emit("isChampionUploaded", "Champion not uploaded")
            return
        }
        defer champ_file.Close()
        champ_file.WriteString(binary)
        champ_file.Sync()
		socket.Emit("isChampionUploaded", "Champion Uploaded")
	})
    server.OnEvent("/", "Run", func(socket socketio.Conn, players []Player) {
        arguments := ""
        for _, player := range players {
            arguments += " " + player.name
        }
        executable := "./corewar " + arguments
        output, err := exec.Command(executable).Output()
        if (err != nil) {
            fmt.Println("execution error: ", err)
            return
        }
        fmt.Println("Sending game data ...")
        socket.Emit("getGameData", output)
    })
	server.OnDisconnect("/", func(socket socketio.Conn, msg string) {
		fmt.Println("Client disconnected as socket id:", socket.ID(), "for:", msg)
		socket.Close()
	})
    
	go server.Serve()
	defer server.Close()

	http.Handle("/socket.io/", corsMiddleware(server))
	http.Handle("/", http.FileServer(http.Dir("./asset")))
	log.Println("Serving at localhost:8000...")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
