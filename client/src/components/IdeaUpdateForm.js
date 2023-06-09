import IdeasApi from "../services/IdeasApi";
import IdeaList from "./IdeaList";

import Modal from "./Modal";

class IdeaUpdateForm {
  constructor(ideaToUpdate) {
    this.ideaToUpdate = ideaToUpdate;
    this._formModal = document.querySelector("#form-update-modal");
    this._ideaList = new IdeaList();
    this._modal = new Modal();
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this._form.elements.text.value || !this._form.elements.tag.value) {
      alert("Please enter all fields.");
      return;
    }

    const idea = {
      username: localStorage.getItem("username"),
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
    };

    // Update idea on the server
    const ideaToUpdate = await IdeasApi.updateIdea(this.ideaToUpdate._id, idea);

    // Update idea in the list
    this._ideaList.updateIdeaInList(ideaToUpdate.data.data);

    this._form.elements.text.value = "";
    this._form.elements.tag.value = "";

    this.render();

    document.dispatchEvent(new Event("closemodal"));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-update-form">
        <div class="form-control">
        <label for="idea-text">Update your Idea</label>
        <textarea name="text" id="idea-text">${this.ideaToUpdate.text}</textarea>
        </div>
        <div class="form-control">
        <label for="tag">Tag</label>
        <input type="text" name="tag" id="tag" value="${this.ideaToUpdate.tag}" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
    </form>
    `;

    this._form = document.querySelector("#idea-update-form");
    this.addEventListeners();
  }
}
export default IdeaUpdateForm;
