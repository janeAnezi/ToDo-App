//select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const taskInput = document.getElementById("item");
const taskBox = document.querySelector("#list");
const buttonAdd = document.querySelector(".add");
const filters = document.querySelectorAll(".filters span");

let editId;
let isEditedTask = false;

//show todays date
const options = { weekday: "long", month: "short", day: "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//getting local storage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(element => {
    element.addEventListener('click', () => {
       document.querySelector("span.active").classList.remove("active");
       element.classList.add("active");
       showTodo(element.id);
    });
});

function showTodo(filter) {
    let li = "";
    if(todos){
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed"? "checked" : "";
           if(filter == todo.status || filter == "all") {
        
            li += `<li class="item">
                <label for="${id}">
                    <input onClick="updateStatus(this)" class="check" type="checkbox" name="" id="${id}" ${isCompleted}></i>
                    <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="settings">
                    <i onclick= "showMenu(this)" class="fa fa-ellipsis-h el" aria-hidden="true"></i>
                    <ul class="task-menu">
                        <i onClick="editTask(${id}, '${todo.name}' )"  class="fa-solid fa-pen pen" title="Edit"></i>
                        <i onClick= "deleteTask(${id})" class="fa fa-trash-o delete" job="delete" id="0" title="Delete"></i>
                    </ul>
                </div>
            </li>`;
           }
        });
    }  
    taskBox.innerHTML = li || `<span class = "taskMsg">No task? refresh or add new task</span>`;
}
showTodo("all");

function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if( e.target != selectedTask) {
            taskMenu.classList.remove("show");
        };
    });
};

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
    
}

function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
};
clear.addEventListener("click",() => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});

function updateStatus(selectedTask) {
    const taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.code == "Enter" && userTask) {
        if(!isEditedTask) {
            if(!todos) {
                todos =[];
            }
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        }else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
       
        taskInput.value = "";

        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
});

buttonAdd.addEventListener("click", e => {
    let userTask = taskInput.value.trim();
    if(buttonAdd && userTask) {
        if(!isEditedTask) {
            if(!todos) {
                todos =[];
            }
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        }else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
       
        taskInput.value = "";

        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
})