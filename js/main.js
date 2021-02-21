const todoForm = document.querySelector('.todo-form'),
    todoInput = document.querySelector('.todo-input'),
    todoItemsList = document.querySelector('.todo-items'),
    clear=document.getElementById('clear'),
    checkAll=document.getElementById('checkAll');
let todos = [];
todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addToDoObj(todoInput.value); 
});
// function to add todo

function addToDoObj(item) {

    if (item !== '') {
        const todo = {
        id: Date.now(),
        name: item,
        completed: false
        };
        todos.push(todo);
        createLi(todos); 
        todoInput.value = '';
    }
    }


// function to render given todos to screen(show li in screen)
function createLi(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function(item) {
    const checked = item.completed ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
        li.classList.add('checked');
    }
    li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>`;
    todoItemsList.append(li);
    });
    }


// function to add todos to local storage
function addToLocalStorage(todos) {
    // conver the array to string then store it.
    localStorage.setItem('todos', JSON.stringify(todos));
    createLi(todos);
}

// initially get everything from localStorage
function getFromLocalStorage() {
const reference = localStorage.getItem('todos');
// if reference exists
if (reference) {
// converts back to array and store it in todos array
    todos = JSON.parse(reference);
    createLi(todos);
}}
getFromLocalStorage();


// after that addEventListener <ul> 

todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});
// toggle the value to completed and not completed
function toggle(id) {
    todos.forEach(function(item) {
  // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
  // toggle the value
        item.completed = !item.completed;
    }
    });
// update the localStorage with value false|| true of completed property
addToLocalStorage(todos);
}


function deleteTodo(id) {
// filters out the <li> with the id and updates the todos array
    todos = todos.filter(function(item) {
// use != not !==, because here types are different. One is number and other is string
    return item.id != id;
    });
// update the localStorage
    addToLocalStorage(todos);
}

clear.addEventListener("click",function(){
    todos=[];
    addToLocalStorage(todos);
    todoItemsList.innerHTML='';
})

function toggleAll() {
    todos.forEach(function(item) {
  // use == not ===, because here types are different. One is number and other is string
        item.completed = !item.completed;
        addToLocalStorage(todos);
    });
}
checkAll.addEventListener("click",function(){
    toggleAll();
})