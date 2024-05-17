import { useState } from "react";

export const Square = ({
    id,
    finsh,
    currentPlayer,
    finishedArrayState,
    setCurrentPlayer,
    game,
    setGame,
    socket,
    playingAs,
    currentElement,
}) => {
    const [icon, setIcon] = useState(null);

    const handleIconClick = () => {
        if (finsh) return;
        if (playingAs !== currentPlayer) return;
        if (!icon) {
            if (currentPlayer === "circle") {
                setIcon(circleSvg);
            } else {
                setIcon(crossSvg);
            }
            const myCurrentPlayer = currentPlayer;
            socket.emit("playerMoveFromClient", {
                state: {
                    id,
                    sign: myCurrentPlayer,
                },
            });
            setCurrentPlayer(currentPlayer === "circle" ? "cross" : "circle");
            setGame((prevState) => {
                let newState = [...prevState];
                const rowIndex = Math.floor(id / 3);
                const colIndex = id % 3;
                newState[rowIndex][colIndex] = myCurrentPlayer;
                return newState;
            });
        } else {
            setIcon(null); // Reset icon to null if an icon is already present
        }
    };

    return (
        <div
            className={`h-20 w-20 bg-black rounded-lg cursor-pointer ${finsh ? "cursor-not-allowed" : ""
                } ${finishedArrayState.includes(id) ? "bg-yellow-200" : ""}
              ${currentPlayer !== playingAs ? "cursor-not-allowed" : ""}
              `}
            onClick={handleIconClick}
        >
            {currentElement === "circle"
                ? circleSvg
                : currentElement === "cross"
                    ? crossSvg
                    : icon}
        </div>
    );
};

const circleSvg = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    </svg>
);

const crossSvg = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M19 5L5 19M5.00001 5L19 19"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    </svg>
);
