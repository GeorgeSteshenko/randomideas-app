import IdeasApi from "../services/IdeasApi";

import Modal from "./Modal";
import IdeaUpdateForm from "../components/IdeaUpdateForm";
class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");

    this._modal = new Modal();

    this._ideas = [];

    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");

    this.getIdeas();
  }

  addEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();

        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-pen")) {
        e.stopImmediatePropagation();

        const ideaId = e.target.parentElement.parentElement.dataset.id;
        const idea = this._ideas.filter((idea) => idea._id === ideaId)[0];
        
        const ideaUpdateForm = new IdeaUpdateForm(idea);
        ideaUpdateForm.render();

        this._modal.openUpdate();
      }
    });
  }

  async getIdeas() {
    try {
      // res --> { data } OR { data: { data } } and then: this._ideas = data.data OR this._ideas = data;
      const res = await IdeasApi.getIdeas();
      // data.data is because axios returns 'data' by default,
      // so as BE returns an Obj with 'data'. See: BE --> routes/ideas --> e.g. line: 9
      this._ideas = res.data.data;
      // Render after data got back from backend
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from the server
      const res = await IdeasApi.deleteIdea(ideaId);
      // Delete from the DOM
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You can not delete this resource");
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  updateIdeaInList(idea) {
    const ideaInList = this._ideas.find((i) => i._id === idea._id);

    ideaInList.text = idea.text;
    ideaInList.tag = idea.tag;

    this.render();
  }

  getTags(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }

    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTags(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem("username")
            ? `<button class="delete"><i class="fas fa-times"></i></button>
               <button class="edit"><i class="fas fa-pen"></i></button>`
            : "";

        return `
        <div class="card" data-id="${idea._id}">
            ${deleteBtn}
            <h3>${idea.text}</h3>
            <p class="tag ${tagClass}">${idea.tag.toLocaleUpperCase()}</p>
            <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
            </p>
        </div>
        `;
      })
      .join("");

    this.addEventListeners();
  }
}

export default IdeaList;
