class ChessPiece {
    constructor(owner) {
        this.name = "";
        this.domElement = null;
        this.className = "";
        this.owner = owner;
        this.x = -1;
        this.y = -1;
    }

    applyClass() {
        this.domElement.classList.add(this.className);
    }

    move(target) {
        this.x = +target.domElement.dataset.col;
        this.y = +target.domElement.dataset.row;
        this.removeIcon();
        this.domElement = target.domElement;
        this.applyIcon();
    }

    applyIcon() {
        var icon = document.createElement("i");
        icon.classList.add('fas');
        icon.classList.add(this.className);
        icon.classList.add(this.owner);
        this.domElement.appendChild(icon);
    }

    removeIcon() {
        this.domElement.querySelector("svg").remove();
    }

    isBlocked(targetCoord, boardState) {
        var piece = boardState[targetCoord.y][targetCoord.x].piece;
        if (piece) {
            return piece.owner === this.owner;
        }

        return false;
    }
}
