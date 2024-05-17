
export const Header = ({ user, opponentName }) => {
    return (
        <div className="flex gap-40 mb-20">
            <div className="bg-red-500">
                {user?.name}
            </div>
            <div className="bg-red-500">
                {opponentName}
            </div>
        </div>
    )
}

// #DD7F9F
// #3FA7F0