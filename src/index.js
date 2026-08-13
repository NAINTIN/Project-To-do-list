import "./style.css"
import { createToDoList, render, todos  } from "./todo.js";
import { createProject, getCurrentProjectId, projects, renderDefaultPage, renderMyProjects } from "./project.js";

const todoForm = document.getElementById("todo-form")
const newList = document.getElementById("new")
const listDialog = document.getElementById("list-dialog")
const projectForm = document.getElementById("project-form")
const projectDialog = document.getElementById('project-dialog')
const newProject = document.getElementById('new-project')
const myProjects = document.getElementById('my-projects')

todoForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const title = document.getElementById('title').value 
    const description = document.getElementById('list-info').value 
    const due = document.getElementById('todo-due').value
    const priority = document.getElementById('priority').value  

    createToDoList(title,description,due,priority,getCurrentProjectId())
    todoForm.reset();
    listDialog.close();

})

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('project-title').value
    createProject(title)
    projectForm.reset();
    projectDialog.close();
})

newList.addEventListener('click', () => {
    listDialog.showModal();
})

newProject.addEventListener('click', () => {
    projectDialog.showModal();
})



function loadTodos(){
    const saved = JSON.parse(localStorage.getItem("todos")); 
    //returns the string then turns it back into original array

    if(saved){
        todos.length = 0;
        todos.push(...saved) // copies the saved array back to the todos array one by one
    }
    renderDefaultPage(); // renders the todos array back again.
}

function loadProjects(){
    const saved = JSON.parse(localStorage.getItem('projects'))

    if (saved){
        projects.length = 0;
        projects.push(...saved)
    }
}

loadTodos();

export {loadProjects}