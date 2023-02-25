export class MatrixService {
  constructor(size) {
    this.matrixStore = Array.from({ length: size * size }, () => ({
      value: null,
      isOpen: false,
    }));
    this.containerElement = document.getElementById("container");
    this.shuffleCTA = document.getElementById("shuffle-cta");
    this.cellNumber = 0;
    this.size = size;
  }

  renderMatrix() {
    for (let row = 0; row < this.size; row++) {
      let rowElement = document.createElement("div");
      rowElement.classList.add("rowContainer");
      this.containerElement.append(rowElement);
      for (let col = 0; col < this.size; col++, this.cellNumber++) {
        this.matrixStore[this.cellNumber].value =
          this.cellNumber * this.cellNumber;
        let cellElement = document.createElement("div");
        cellElement.classList.add("cellContainer");
        cellElement.id = "cellContainer-" + this.cellNumber;
        let colNumber = document.createElement("span");
        colNumber.id = "cellNumber";
        colNumber.append(this.cellNumber);
        colNumber.classList.add("colNumber");
        cellElement.append(colNumber);
        rowElement.append(cellElement);
      }
    }
    this.attachClickListener();
  }

  attachClickListener() {
    this.containerElement.addEventListener("click", this.showSquares.bind(this));
    this.shuffleCTA.addEventListener('click', this.handleShuffle.bind(this));
  }

  showSquares(event) {
    let cellContainer = event.target;
    let [_, cellNumber] = cellContainer.id.split("-");
    if (this.matrixStore[cellNumber].isOpen) {
      this.matrixStore[cellNumber].isOpen = false;
      const squareElement = cellContainer.querySelector("#squareElement");
      cellContainer.removeChild(squareElement);
    } else {
      this.matrixStore[cellNumber].isOpen = true;
      let squareElement = document.createElement("div");
      squareElement.classList.add("squareElement");
      squareElement.id = "squareElement";
      squareElement.innerText = this.matrixStore[cellNumber].value;
      cellContainer.append(squareElement);
    }
  }

  renderCellSquare(cellNumber) {
    let cellContainer = document.getElementById("cellContainer-" + cellNumber);
    const squareElement = cellContainer.querySelector("#squareElement");
    if (squareElement) {
      squareElement.innerText = this.matrixStore[cellNumber].value;
    }
  }

  handleShuffle() {
    for (let i = 0; i < this.matrixStore.length; i++) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      if (this.matrixStore[i].isOpen && this.matrixStore[randomIndex].isOpen) {
        [this.matrixStore[i], this.matrixStore[randomIndex]] = [
          this.matrixStore[randomIndex],
          this.matrixStore[i],
        ];
        this.renderCellSquare(i);
        this.renderCellSquare(randomIndex);
      }
    }
  }
}
