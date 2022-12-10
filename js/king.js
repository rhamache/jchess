class KingChessPiece extends ChessPiece {
    constructor(owner) {
        super(owner);

        this.name = "King";
        this.className = "fa-chess-king";
    }

    isValidMove(targetCoord, boardState) {
        
        // adjacent only
    
        var dy = targetCoord.y - this.y;
        var dx = targetCoord.x - this.x;

        return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
    }

    isBlocked(targetCoord, boardState) {
        if (super.isBlocked(targetCoord, boardState)) {
            return true;
        }

        return false;
    }
}
