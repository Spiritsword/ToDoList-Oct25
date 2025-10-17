// GLOBAL DECLARATIONS AND DEFINITIONS

const addButton = document.getElementById("addbutton");
const taskListCol = document.getElementById("tasklistcol");
const maxTaskID = -1;
var newTaskInput = document.getElementById("newtask");
var taskListArray = [];

// CORE FUNCTIONALITY
console.log("Hi")

/*
addButton.addEventListener("click", function() {
    var newTask;
    console.log(newTaskInput);
    newTask.text = newTaskInput.value;
    console.log(newTaskInput.value);
    if (newTask = ""){
        alert("Please write new task in the box.")
    }
    duplicate = false;
    tasklistarray.forEach(function (task) {duplicate = (duplicate || newTask==task)})
    if (duplicate){
        alert("Please write unique task");
    }
    else {
        maxID++;
        newTask.ID = maxID;
        console.log("new task created: ", newTask);
        addTask(newTask);
    }
});

function addTask(newTask) {
    taskListArray.push(newTask);
    console.log(taskListArray);
    showTasks(taskListArray);
};
*/

// function taskCompleted(taskID){}

function showTasks(taskListArray){
    taskListArray.forEach(function (task) {taskList.appendChild(createTaskElement(task))})
};

function createTaskElement (task) {
    return(`<div class=row>${task.text}</div>`)
};
