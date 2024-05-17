import { useState } from "react";

export const OfflineSquare = ({
    id,
    finsh,
    currentPlayer,
    finishedArrayState,
    setCurrentPlayer,
    game,
    setGame,
    currentElement,
}) => {
    const [icon, setIcon] = useState(currentElement);

    const handleIconClick = () => {
        if (finsh) return;
        if (icon) return;

        const newIcon = currentPlayer === "circle" ? circleSvg : crossSvg;
        setIcon(newIcon);

        const newGameState = game.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
                rowIndex * 3 + colIndex === id ? currentPlayer : cell
            )
        );

        setGame(newGameState);
        setCurrentPlayer(currentPlayer === "circle" ? "cross" : "circle");
    };

    return (
        <div
            className={`h-20 w-20 bg-black rounded-lg cursor-pointer ${finsh ? "cursor-not-allowed" : ""} ${finishedArrayState.includes(id) ? "bg-yellow-200" : ""}`}
            onClick={handleIconClick}
        >
            {icon}
        </div>
    );
};

const circleSvg = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const crossSvg = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19 5L5 19M5.00001 5L19 19"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
