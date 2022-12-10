

class ChessBoardManager {

    COLUMN_NAMES = ['A','B','C','D','E','F','G','H'];

    INITIAL_POSITION = [
        [new RookChessPiece('black'),new KnightChessPiece('black'),new BishopChessPiece('black'),new QueenChessPiece('black'),new KingChessPiece('black'),new BishopChessPiece('black'),new KnightChessPiece('black'),new RookChessPiece('black')],
        [new PawnChessPiece('black'),new PawnChessPiece('black'),new PawnChessPiece('black'),new PawnChessPiece('black'),new PawnChessPiece('black'),new PawnChessPiece('black'),new PawnChessPiece('black'),new PawnChessPiece('black')],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [new PawnChessPiece('white'),new PawnChessPiece('white'),new PawnChessPiece('white'),new PawnChessPiece('white'),new PawnChessPiece('white'),new PawnChessPiece('white'),new PawnChessPiece('white'),new PawnChessPiece('white')],
        [new RookChessPiece('white'),new KnightChessPiece('white'),new BishopChessPiece('white'),new QueenChessPiece('white'),new KingChessPiece('white'),new BishopChessPiece('white'),new KnightChessPiece('white'),new RookChessPiece('white')]
    ]

    boardSquares = [];

    constructor(gameManager, target) {
        this.initBoard(target);
        this.gameManager = gameManager;
    }

    initBoard(target) {

        this.boardSquares = [
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null]
        ];


        var domElements = document.querySelectorAll(".grid-item");

        for (var row = 0; row < 8; row++) {

            for (var col = 0; col < 8; col++) {
                var square = domElements[ (row * 8) + col ];
                square.dataset.col = col;
                square.dataset.row = row;
                square.dataset.coord = this.COLUMN_NAMES[col] + (row + 1).toString();
                square.addEventListener("click", this.onBoardSquareClicked.bind(this, square) );

                var icon = document.createElement("i");

                if (this.INITIAL_POSITION[row][col]) {
                    var piece  = this.INITIAL_POSITION[row][col];
                    piece.domElement = square;
                    piece.x = col;
                    piece.y = row;
                    this.boardSquares[row][col] = {
                        piece: piece,
                        domElement: square
                    };
                    
                    icon.classList.add('fas');
                    icon.classList.add(piece.className);
                    icon.classList.add(piece.owner);
                    square.appendChild(icon);
                } else {
                    this.boardSquares[row][col] = {
                        piece: null,
                        domElement: square
                    };
                }
            }
        }


    }

    onBoardSquareClicked(square) {
        console.log("clicked " + square.dataset.coord);
        var x = +square.dataset.col
        var y = +square.dataset.row;
        var square = this.boardSquares[y][x];

        switch (this.gameManager.currentState) {
            case this.gameManager.STATES.whiteTurn:

                if (square.piece && square.piece.owner === 'white') {
                    this.gameManager.selectPiece(square);
                }

                break;
            case this.gameManager.STATES.blackTurn:

                    if (square.piece && square.piece.owner === 'black') {
                        this.gameManager.selectPiece(square);
                    }
    
                    break;
            case this.gameManager.STATES.selected:

                this.movePiece(this.gameManager.CURRENT_SELECTION.piece, square);

                break;  
            default:
                throw new Error("no state?");
        }
    }

    movePiece(piece, square) {

        var target_coord = {
            x: +square.domElement.dataset.col,
            y: +square.domElement.dataset.row
        }

        if (target_coord.x === piece.x && target_coord.y === piece.y) {
            // same piece clicked, just deselect
            this.gameManager.deselectPiece();
            return;
        }

        console.log(piece.isValidMove(target_coord, this.boardSquares));

        if (this.isValidMove(piece, target_coord)) {
            this.gameManager.deselectPiece();

            if (this.boardSquares[target_coord.y][target_coord.x].piece) {
                this.boardSquares[target_coord.y][target_coord.x].piece.removeIcon();
            }
 
            this.boardSquares[target_coord.y][target_coord.x].piece = piece;
            this.boardSquares[piece.y][piece.x].piece = null;

            piece.move(square);
            
            this.gameManager.advanceTurn();

            return;
        }

        this.gameManager.deselectPiece();
        return;

    }

    isValidMove(piece, target_coord) {
        return (piece.isValidMove(target_coord, this.boardSquares)  && !piece.isBlocked(target_coord, this.boardSquares));
    }
}
