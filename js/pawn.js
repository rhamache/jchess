class PawnChessPiece extends ChessPiece {
    constructor(owner) {
        super(owner);

        this.name = "Pawn";
        this.className = "fa-chess-pawn";
    }

    isValidMove(targetCoord, boardState) {
        
        // 1 space OR 2 if first move
        // OR 
        // diagonally if capturing
        // OR
        // en passant

        var dy = Math.abs(targetCoord.y - this.y);
        var dx = Math.abs(targetCoord.x - this.x);

        var isFirstMove = this.owner == 'white' ? (this.y === 6) : (this.y === 1);

        if (isFirstMove) { // special case, first move
            return targetCoord.x === this.x && (dy === 2 || dy === 1);
        }

        if (dy === 1 && dx === 1 && boardState[targetCoord.y][targetCoord.x].piece) {
            return true;
        }

        return dx === 0 && dy === 1;

    }

    isBlocked(targetCoord, boardState) {
        if (super.isBlocked(targetCoord, boardState)) {
            return true;
        }

        var dy = targetCoord.y - this.y;
        var dx = targetCoord.x - this.x;

        if(Math.abs(dy) === 1 && Math.abs(dx) === 1) { // adjacent move, cannot be blocked
            return false;
        }

        var dirY = dy < 0 ? -1 : 1;

        return !!boardState[this.y + dirY][this.x].piece;
    }
    
}
