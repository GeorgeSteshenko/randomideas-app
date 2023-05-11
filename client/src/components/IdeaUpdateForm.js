import IdeasApi from "../services/IdeasApi";
import IdeaList from "./IdeaList";

import Modal from "./Modal";

class IdeaUpdateForm {
  constructor() {
    this._formModal = document.querySelector("#form-update-modal");
    this._ideaList = new IdeaList();
    this._modal = new Modal();
    this._ideaToUpdateId;
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));

    this._ideaList._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-pen")) {
        e.stopImmediatePropagation();

        this._modal.openUpdate();

        this._ideaToUpdateId = e.target.parentElement.parentElement.dataset.id;
        const ideaToUpdate = this._ideaList._ideas.filter(
          (idea) => idea._id === this._ideaToUpdateId
        )[0];

        this._form.elements.text.value = ideaToUpdate.text;
        this._form.elements.tag.value = ideaToUpdate.tag;
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value
    ) {
      alert("Please enter all fields.");
      return;
    }

    const idea = {
      username: localStorage.getItem("username"),
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
    };


    // Update idea on the server
    const ideaToUpdate = await IdeasApi.updateIdea(this._ideaToUpdateId, idea);

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
        <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
        <label for="tag">Tag</label>
        <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
    </form>
    `;

    this._form = document.querySelector("#idea-update-form");
    this.addEventListeners();
  }
}
export default IdeaUpdateForm;
