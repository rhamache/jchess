class QueenChessPiece extends ChessPiece {
    constructor(owner) {
        super(owner);

        this.name = "Queen";
        this.className = "fa-chess-queen";
    }

    isValidMove(targetCoord, boardState) {
        
        // combine rook and bishop rules
    
        var dy = targetCoord.y - this.y;
        var dx = targetCoord.x - this.x;

        return (Math.abs(dx) === Math.abs(dy)) || (targetCoord.y === this.y || targetCoord.x === this.x);

    }

    isBlocked(targetCoord, boardState) {
        if (super.isBlocked(targetCoord, boardState)) {
            return true;
        }

        var dy = targetCoord.y - this.y;
        var dx = targetCoord.x - this.x;

        if (dx === 0 || dy == 0) { // straight move, rook rules
            if (dx === 0) { // vertical move

                var dirY = targetCoord.y < this.y ? -1 : 1;

                for (var i = 1; i < Math.abs(dy); i++) {
                    var offsetY = dirY * i;
                    if (!!boardState[this.y + offsetY][this.x].piece) {
                        return true;
                    }

                }

            } else { // horizontal move
                var dirX = targetCoord.x < this.x ? -1 : 1;

                for (var i = 1; i < Math.abs(dx); i++) {
                    var offsetX = dirX * i;
                    if (!!boardState[this.y][this.x + offsetX].piece) {
                        return true;
                    }
                }
            }
        } else { // bishop rules
            var dirX = targetCoord.x > this.x ? 1 : -1;
            var dirY = targetCoord.y > this.y ? 1 : -1;
    
            for (var i=1; i < Math.abs(this.x - targetCoord.x); ++i) {
                if (!!boardState[this.y + i*dirY][this.x + i*dirX].piece) {
                    return true;
                }
            }
        }

        return false;
    }
}
