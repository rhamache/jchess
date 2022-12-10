class BishopChessPiece extends ChessPiece {
    constructor(owner) {
        super(owner);

        this.name = "Bishop";
        this.className = "fa-chess-bishop";
    }

    isValidMove(targetCoord, boardState) {
        
        // rook can move diagonally, in otherwords, abs delta-x == delta-y
    
        var dy = targetCoord.y - this.y;
        var dx = targetCoord.x - this.x;

        return Math.abs(dx) === Math.abs(dy);

    }

    isBlocked(targetCoord, boardState) {
        if (super.isBlocked(targetCoord, boardState)) {
            return true;
        }

        var dirX = targetCoord.x > this.x ? 1 : -1;
        var dirY = targetCoord.y > this.y ? 1 : -1;

        for (var i=1; i < Math.abs(this.x - targetCoord.x); ++i) {
            if (!!boardState[this.y + i*dirY][this.x + i*dirX].piece) {
                return true;
            }
        }

        return false;
    }
}
