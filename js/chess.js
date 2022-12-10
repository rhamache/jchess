class ChessGame {

    STATES = {
        stopped: 0, // game not started yet
        selected: 1, // game is started and awaiting input
        whiteTurn: 2, // piece is currently selected
        blackTurn: 3
    }

    CURRENT_SELECTION = null;

    constructor(target) {
        this.boardManager = new ChessBoardManager(this, target);

        this.currentState = this.STATES.whiteTurn;
    }

    selectPiece(square) {
        this.currentState = this.STATES.selected;
        this.CURRENT_SELECTION = square;
        square.domElement.classList.add('selected');
    }

    deselectPiece() {
        this.currentState = this.CURRENT_SELECTION.piece.owner == 'white' ? this.STATES.whiteTurn : this.STATES.blackTurn;
        this.CURRENT_SELECTION.domElement.classList.remove('selected');
        this.CURRENT_SELECTION = null;
    } 

    advanceTurn() {

        switch (this.currentState) {
            case this.STATES.whiteTurn:
                this.currentState = this.STATES.blackTurn
                break;
            case this.STATES.blackTurn:
                this.currentState = this.STATES.whiteTurn
                break;
            default:
                throw new error("tried to advance turn from an invalid state!! state: " + this.currentState)
        }

    }
}
