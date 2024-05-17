import React, { useEffect, useState } from 'react';
import { OfflineSquare } from '../components/OfflineSquare';
import { Navigate, useNavigate } from 'react-router-dom';

const tic_toc_toe = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function Offline() {
    const [game, setGame] = useState(tic_toc_toe);
    const [currentPlayer, setCurrentPlayer] = useState("circle");
    const [finish, setFinish] = useState(false);
    const [winner, setWinner] = useState("");
    const [finishedArrayState, setFinishedArrayState] = useState([]);

    const navigate = useNavigate();

    const checkWinner = () => {
        // Row winner check
        for (let row = 0; row < game.length; row++) {
            if (game[row][0] && game[row][0] === game[row][1] && game[row][1] === game[row][2]) {
                setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
                return game[row][0];
            }
        }

        // Column winner check
        for (let col = 0; col < game.length; col++) {
            if (game[0][col] && game[0][col] === game[1][col] && game[1][col] === game[2][col]) {
                setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
                return game[0][col];
            }
        }

        // Diagonal winner check
        if (game[0][0] && game[0][0] === game[1][1] && game[1][1] === game[2][2]) {
            setFinishedArrayState([0, 4, 8]);
            return game[0][0];
        }
        if (game[0][2] && game[0][2] === game[1][1] && game[1][1] === game[2][0]) {
            setFinishedArrayState([2, 4, 6]);
            return game[0][2];
        }

        const isDrawMatch = game.flat().every(cell => cell !== null);
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

    return (
        <div className="bg-[#4B495f] flex flex-col h-full justify-center items-center">
            <div className="flex gap-40 mb-20">
                <h1 className={`text-white text-lg font-semibold ${currentPlayer === "circle" ? "bg-[#DD7F9F]" : ""}`}>
                    circle
                </h1>
                <div className={`text-white text-lg font-semibold ${currentPlayer === "cross" ? "bg-[#3FA7F0]" : ""}`}>
                    cross
                </div>
            </div>
            <div className="tic-tac-toe">
                {game.map((tic, rowIndex) =>
                    tic.map((e, colIndex) => (
                        <OfflineSquare
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
                    ))
                )}
            </div>
            {winner && (
                <>
                    <span className="text-3xl text-yellow-300 font-bold mt-10">
                        {winner === "draw" ? "It's a draw!" : `${winner} won the game`}
                    </span>
                    <button
                        className="text-white bg-blue-700 h-10 w-40 mt-5 text-xl font-bold"
                        onClick={() => {
                            navigate(0)
                        }}
                    >
                        Restart
                    </button>
                    <button
                        className="text-white bg-blue-700 h-10 w-40 mt-5 text-xl font-bold"
                        onClick={() => {
                            navigate("/play/online")
                        }}
                    >
                        Play online
                    </button>
                </>
            )}
        </div>
    );
}

export default Offline;
