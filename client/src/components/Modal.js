class Modal {
  constructor() {
    this._modal = document.querySelector("#modal");
    this._modalUpdate = document.querySelector("#modal-update");
    this._modalBtn = document.querySelector("#modal-btn");

    this.addEventListeners();
  }

  addEventListeners() {
    this._modalBtn.addEventListener("click", this.open.bind(this));
    this._modal.addEventListener("click", this.outsideClick.bind(this));
    this._modalUpdate.addEventListener("click", this.outsideClick.bind(this));

    document.addEventListener("closemodal", () => this.close());
  }

  open() {
    this._modal.style.display = "block";
  }

  openUpdate() {
    this._modalUpdate.style.display = "block";
  }

  close() {
    this._modal.style.display = "none";
    this._modalUpdate.style.display = "none";
  }

  outsideClick(e) {
    if (e.target === this._modal || e.target === this._modalUpdate) this.close();
  }
}

export default Modal;
