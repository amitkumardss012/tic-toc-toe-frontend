import { useEffect, useState } from "react";

import { Header } from "../components/Header";
import { Square } from "../components/Square";
import { Navigate, json, useNavigate } from "react-router-dom";
import { io } from "socket.io-client"
import axios from "axios";

const tic_toc_toe = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
];

const tic_toc = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];


function TicTokToe() {
    const [game, setGame] = useState(tic_toc_toe);
    const [currentPlayer, setCurrentPlayer] = useState("circle");
    const [finish, setFinish] = useState(false);
    const [winner, setWinner] = useState("");
    const [finishedArrayState, setFinishedArrayState] = useState([]);
    const [opponentLeftMatch, setOpponentLeftMatch] = useState(false)
    const [playOnline, setPlayOnline] = useState(false);
    const [socket, setSocket] = useState(null);
    const [playerName, setPlayerName] = useState("");
    const [opponentName, setOpponentName] = useState(null);
    const [playingAs, setPlayingAs] = useState(null);
    const [userDetals, setUserDetails] = useState(null)

    const navigate = useNavigate();


    const checkWinner = () => {
        // row dynamic winner check
        for (let row = 0; row < game.length; row++) {
            if (game[row][0] === game[row][1] && game[row][1] === game[row][2]) {
                setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
                return game[row][0];
            }
        }

        // column dynamic winner check
        for (let col = 0; col < game.length; col++) {
            if (game[0][col] === game[1][col] && game[1][col] === game[2][col]) {
                setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
                return game[0][col];
            }
        }

        // Check diagonals
        if (
            game[0][0] === game[1][1] &&
            game[1][1] === game[2][2] &&
            game[0][0] !== null
        ) {
            setFinishedArrayState([0, 4, 8]);
            return game[0][0];
        }
        if (
            game[0][2] === game[1][1] &&
            game[1][1] === game[2][0] &&
            game[0][2] !== null
        ) {
            setFinishedArrayState([2, 4, 6]);
            return game[0][2];
        }

        const isDrawMatch = game.flat().every((e) => {
            if (e === "circle" || e === "cross") return true;
        });

        if (isDrawMatch) return "draw";

        return null;
    };

    useEffect(() => {
        const winner = checkWinner();
        if (winner) {
            setFinish(true);
            setWinner(winner);
        }
    }, [game]);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        setUserDetails(user)
        if (!user) {
            return <Navigate to={"/"} />
        }
    }, [])

    socket?.on("playerMoveFromServer", (data) => {
        const id = data.state.id;
        setGame((prevState) => {
            let newState = [...prevState];
            const rowIndex = Math.floor(id / 3);
            const colIndex = id % 3;
            newState[rowIndex][colIndex] = data.state.sign;
            return newState;
        });
        setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");
    });

    socket?.on("opponentLeftMatch", () => {
        setOpponentLeftMatch("opponent has left the match now you can also quit the game");
    });

    // console.log("opponentLeftMatch", opponentLeftMatch)



    socket?.on("OpponentNotFound", function () {
        setOpponentName(false);
    });

    socket?.on("OpponentFound", function (data) {
        setPlayingAs(data.playingAs);
        setOpponentName(data.opponentName);
    });

    const handlePlayOnline = async () => {
        const newSocket = io("https://tic-toc-toe-backend.vercel.app", {
            autoConnect: true,
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
            timeout: 20000,
            secure: true,
        });

        socket?.on("connect", function () {
            setPlayOnline(true);
        });

        newSocket?.emit("request_to_play", {
            playerName: userDetals?.name,
        });

        setSocket(newSocket)
    }

    if (!playOnline) {
        return <div className="w-full h-full flex items-center justify-center flex-col gap-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32" onClick={handlePlayOnline}>Play online</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32" onClick={() => navigate("/play/offline")}>Play offline</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32" onClick={async () => {
                const res = await axios.get("https://tic-toc-toe-backend.vercel.app/logout", { withCredentials: true });
                localStorage.removeItem("user")
                navigate("/")
                console.log(res.data)
            }}>Log out</button>
            <h1 className="text-2xl font-bold">{userDetals?.name}</h1>
        </div>

    }

    if (playOnline && !opponentName) {
        return <div className="w-full h-full flex justify-center items-center bg-[#4B495f] text-white">
            <h1 className="text-2xl font-bold">Waiting for opponent .....</h1>
        </div>
    }


    return (
        <>
            <div className="bg-[#4B495f] flex flex-col  h-full justify-center items-center">
                <div className="flex gap-40 mb-20">
                    <h1 className={`text-white text-lg font-semibold ${currentPlayer === playingAs ? "bg-[#DD7F9F]" : ""}`}>
                        {userDetals?.name}
                    </h1>
                    <div className={`text-white text-lg font-semibold ${currentPlayer !== playingAs ? "bg-[#3FA7F0]" : ""}`}>
                        {opponentName}
                    </div>
                </div>
                <div className="tic-tac-toe">
                    {game.map((tic, rowIndex) =>
                        tic.map((e, colIndex) => {
                            return (
                                <Square
                                    socket={socket}
                                    playingAs={playingAs}
                                    game={game}
                                    finishedArrayState={finishedArrayState}
                                    finsh={finish}
                                    currentPlayer={currentPlayer}
                                    setCurrentPlayer={setCurrentPlayer}
                                    setGame={setGame}
                                    id={rowIndex * 3 + colIndex}
                                    key={rowIndex * 3 + colIndex}
                                    currentElement={e}
                                />
                            );
                        })
                    )}
                </div>
                {winner && (
                    <>
                        <span className="text-3xl text-yellow-300 font-bold mt-10">
                            {/* {winner === "draw" ? "It's a draw!" : `${winner} won the game`} */}
                            {winner === playingAs ? "You" : opponentName} won the match
                        </span>
                        <button
                            className="text-white bg-blue-700 h-10 w-40 mt-5 text-xl font-bold"
                            onClick={() => {
                                navigate(0)
                            }}
                        >
                            Restart
                        </button>
                    </>
                )}
                {opponentName && <span className="mt-5 text-xl text-center font-bold text-white">your opponent is {opponentName}</span>}
                {opponentLeftMatch && <span className="mt-5 text-xl text-red-500 font-bold text-center p-6">{opponentLeftMatch}</span>}
            </div>
        </>
    );
}

export default TicTokToe;
