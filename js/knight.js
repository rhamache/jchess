class KnightChessPiece extends ChessPiece {
    constructor(owner) {
        super(owner);

        this.name = "Knight";
        this.className = "fa-chess-knight";
    }

    isValidMove(targetCoord, boardState) {
        // L shape
    
        var dy = targetCoord.y - this.y;
        var dx = targetCoord.x - this.x;

        return (Math.abs(dx) === 1 && Math.abs(dy) === 2) || (Math.abs(dx) === 2 && Math.abs(dy) === 1);
    }

    isBlocked(targetCoord, boardState) {
        if (super.isBlocked(targetCoord, boardState)) {
            return true;
        }
        // knights can hop; never blocked
        return false;
    }

}
