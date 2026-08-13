import { getCurrentProjectId } from "./project.js"

let todos = []

function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todos))
    //saves the todos array
}


function createToDoList(title, description, dueDate ,priority,projectId){
    const todo = {
        id: crypto.randomUUID(),
        title,
        description,
        dueDate,
        priority,
        projectId,
        completed: false,
    }
    
    todos.push(todo)
    saveTodos();
    render(getCurrentProjectId());
}

function removeTodosByProject(projectId){ //keeps every todo that does not match the one being deleted 
    // example if i delete a project that has that specific id then i'll keep the ones that dont match that specific one, i delete and keep the rest
    console.log('todos before', todos.length)
    todos = todos.filter(t => t.projectId !== projectId)
    console.log('todos after', todos.length)
    saveTodos();
}

// i need to find a way to connect this to a checkbox in html form, so the checkbox will identify the id
function toggleComplete(id){
    const todo = todos.find(t => t.id === id)
    if(todo){
        todo.completed = !todo.completed
    } 
    saveTodos();
    render(getCurrentProjectId());
}

function completedTodos(projectId = null){
    return todos.filter(t => t.completed === true && t.projectId === projectId)
}


const list = document.getElementById("todo-list")
list.addEventListener('click', (e)=>{
        if(e.target.classList.contains('delete-btn')){
            console.log('default todos before', todos.length)
            const id = e.target.dataset.id
            const list = todos.findIndex(t=> t.id === id)
            todos.splice(list, 1)
            saveTodos();
            render(getCurrentProjectId());
            console.log('default todos after ', todos.length)
        }
    })

function render(projectId = null){ // if there's no project id then it will show default list
    // which is every item that has a null projectId
    list.innerHTML = ""

    //filters out only the todos where there is a projectId 
    const projectTodos = todos.filter(t => t.projectId === projectId)

    projectTodos.forEach(todo => {
        const liTitle = document.createElement('div')
        liTitle.classList.add('list-title')

        liTitle.textContent = `${todo.title}`
        const li = document.createElement("li")
        li.classList.add('list-body')
        

        const details = document.createElement('details') // add disclosure widget to the actual list
        const summary = document.createElement('summary') // summary 
        summary.textContent = `Details`
        details.appendChild(summary)

        const body = document.createElement('div')
        body.classList.add('todo-body')
        body.innerHTML = `
        <p>Due Date: ${todo.dueDate}</p>
        <p>Priority Level: ${todo.priority}</p>
        <p>${todo.description}</p>
        <button class="delete-btn" data-id="${todo.id}">Delete</button>`;

        
        details.appendChild(body)

        li.appendChild(liTitle)
        li.appendChild(details)
        list.appendChild(li)

        // need to add a checkbox here so every list will have a toggle if it's complete

        const label = document.createElement('label')
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.dataset.id = todo.id // give the checkbox the id of the object it's been created
        checkbox.checked = todo.completed // dynamically change the state if checked
        const textNode = document.createTextNode("Mark as complete")

        checkbox.addEventListener('change', (e)=>{
            const toggleId = e.target.dataset.id // gives back the target id of the object
            console.log('toggle', toggleId)
            toggleComplete(toggleId) // makes it complete
            renderCompletedTodos(getCurrentProjectId());
        })
        label.appendChild(checkbox)
        label.appendChild(textNode)
        li.appendChild(checkbox)
        li.appendChild(label)

        console.log("Rendering:", todo.title);
    })
    // loop cuz it's a array and everytime we add something on the array then we will create
    // a new list
        saveTodos();
     
}

function renderCompletedTodos(projectId){
    const completed = completedTodos(projectId)
    const list = document.getElementById('completed-list')
    list.innerHTML = ''

    const header = document.createElement('div')
    

    const h2 = document.createElement('h2')
    h2.textContent = `Completed Lists`

    list.appendChild(h2)

    completed.forEach(todo => {

        const liTitle = document.createElement('div')
        liTitle.classList.add('list-title')

        liTitle.textContent = `${todo.title}`
        const li = document.createElement("li")
        li.classList.add('list-body')

        const details = document.createElement('details')
        const summary = document.createElement('summary')
        const body = document.createElement('div')
        summary.textContent = `Summary`
        details.appendChild(summary)
        body.classList.add('todo-body')
        body.innerHTML = `
        <p>${todo.description}</p>`

        details.appendChild(body)
        li.appendChild(liTitle)
        li.appendChild(details)
        list.appendChild(li)
        
    })

   
}




export {createToDoList, render, todos, renderCompletedTodos,removeTodosByProject}