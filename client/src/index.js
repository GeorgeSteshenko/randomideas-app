// import "@fortawesome/fontawesome-free/css/all.css"

import Modal from "./components/Modal";
import IdeaForm from "./components/IdeaForm";
import IdeaUpdateForm from "./components/IdeaUpdateForm";
import IdeaList from "./components/IdeaList";

import "./css/style.css";

new Modal();
const ideaForm = new IdeaForm();
ideaForm.render();
const ideaUpdateForm = new IdeaUpdateForm();
ideaUpdateForm.render();
new IdeaList();