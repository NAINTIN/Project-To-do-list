
import { createToDoList, render, todos, renderCompletedTodos,removeTodosByProject  } from "./todo.js";

import { loadProjects } from "./index.js";

let currentProjectId = null; // keeps track of the project, if null, no project is opened

let projects = []

function saveProject(){
    localStorage.setItem('projects', JSON.stringify(projects))
}

function createProject(title){
    const project = {
        id: crypto.randomUUID(),
        title,
    }

    projects.push(project)
    saveProject();
    openProjects(project.id)
}

function openProjects(projectId){
    currentProjectId = projectId // assigns the current project id which is project.id
    renderProjectPage()
}

function getCurrentProjectId(){
    return currentProjectId; // RETURNS THE CURRENT PROJECT ID that the parameter got
    // value can be null or a random ID which the filter function in todo.js will check
}

function renderProjectPage(){
    const project = projects.find(p => p.id === currentProjectId)


    if(!project) return

    const app = document.getElementById('app')
    app.innerHTML = ''
    app.classList.add('project-page')

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const header = document.createElement('h2')
    header.textContent = project.title

    app.appendChild(header)

    const backBtn = document.createElement('button')
    backBtn.textContent = `Back`
    backBtn.addEventListener('click', () => {
        renderDefaultPage();
    })

    const button = document.createElement('button')
    button.textContent = 'Add List'
    button.addEventListener('click', () => {
        document.getElementById('list-dialog').showModal();
    })

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.textContent = `Delete Project`
    deleteBtn.dataset.id = currentProjectId;

    deleteBtn.addEventListener('click', (e)=> {
        if(e.target.classList.contains('delete-btn')){
            const id = e.target.dataset.id
            const projectList = projects.findIndex(t => t.id === id)
            projects.splice(projectList, 1)
            removeTodosByProject(id)
            saveProject();
            renderMyProjects();
        }
    })
    
    app.appendChild(buttonContainer)
    app.appendChild(backBtn)
    app.appendChild(button)
    app.appendChild(deleteBtn)
    buttonContainer.appendChild(backBtn)
    buttonContainer.appendChild(button)
    buttonContainer.appendChild(deleteBtn)
    render(currentProjectId) // displays all the list that matches the project id
    renderCompletedTodos(currentProjectId)
}

function renderDefaultPage(){
    currentProjectId = null;

    const app = document.getElementById('app')
    app.innerHTML = ''

    const container = document.createElement('div')
    container.classList.add('container')
    const header = document.createElement('div')
    header.classList.add('header')
    const h1 = document.createElement('h1')
    h1.textContent = `To Do List`
    header.appendChild(h1)
    container.appendChild(header)
    app.appendChild(container)

    const page = document.createElement('div')
    page.classList.add('page-content')
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const addList = document.createElement('button')
    addList.id = 'new'
    addList.textContent = `Add List`

    addList.addEventListener('click', () => {
        document.getElementById('list-dialog').showModal();
    })

    const addProject = document.createElement('button')
    addProject.id = `new-project`
    addProject.textContent = `Add Project`

    addProject.addEventListener('click', () => {
        document.getElementById('project-dialog').showModal();
    })

    const myProject = document.createElement('button')
    myProject.id = `my-projects`
    myProject.textContent = `My Projects`

    myProject.addEventListener('click', ()=>{
        renderMyProjects();
    })

    buttonContainer.appendChild(addList)
    buttonContainer.appendChild(addProject)
    buttonContainer.appendChild(myProject)
    page.appendChild(buttonContainer)
    app.appendChild(page)
    render(null);
    renderCompletedTodos(currentProjectId)
    
}

function renderMyProjects(){

    loadProjects();

    const defaultList = document.getElementById("todo-list")
    defaultList.innerHTML = " "
    const completedList = document.getElementById('completed-list')
    completedList.innerHTML = " "

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('project-container')

    const list = document.createElement('ul')
    list.innerHTML = ''
    const app = document.getElementById('app')
    app.innerHTML = ''

    const header = document.createElement('div')
    header.classList.add('project-lists')

    const h2 = document.createElement('h2')
    h2.textContent = `MY PROJECTS`
    
   const backBtn = document.createElement('button')
    backBtn.textContent = `Back`
    backBtn.addEventListener('click', () => {
        renderDefaultPage();
    })

    

    projects.forEach(project => {
        const item = document.createElement('button')
        item.textContent = project.title

        item.addEventListener('click', () => {
            openProjects(project.id) // assign the current id and calls renderProject page which renders that specific project id
        })
        
        list.appendChild(item)
    })    
    
   
    header.appendChild(h2)
    header.appendChild(list)
    header.appendChild(buttonContainer)
    buttonContainer.appendChild(list)
    app.appendChild(backBtn)
    app.appendChild(header)


}


export {createProject, getCurrentProjectId, projects, renderDefaultPage, renderMyProjects}