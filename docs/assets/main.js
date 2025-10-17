// GLOBAL DECLARATIONS AND DEFINITIONS

const addButton = document.getElementById("addbutton");
const taskListCol = document.getElementById("tasklistcol");
var maxTaskID = -1;
var newTaskInput = document.getElementById("newtask");
var taskListArray = [];
var newArray = [];
var newTask;

// CORE FUNCTIONALITY
console.log("Hi")

addButton.addEventListener("click", function(e) {
    e.preventDefault();
    console.log(newTaskInput.value);
    newTask = {
        ID:maxTaskID,
        text:newTaskInput.value
    }
    console.log(newTask);
    if (newTask.text == ""){
        alert("Please write new task in the box.")
        return
    }
    duplicate = false;
    taskListArray.forEach(function (task) {duplicate = (duplicate || newTaskInput.value==task.text)})
    if (duplicate){
        alert("Please write unique task");
        return
    }
    else {
        maxTaskID++;
        newTask.ID = maxTaskID;
        console.log("new task created: ", newTask);
        addTask(newTask);
    }
});

function addTask(newTask) {
    taskListArray.push(newTask);
    console.log(taskListArray);
    showTasks(taskListArray, -1);
}

function showTasks(taskListArray, id) {
    currentTasks.innerHTML = "";
    taskListArray.forEach(function (task) {

        const taskNode = document.createElement("div");
        const taskTitleNode = document.createElement("div");
        var taskEditNode = document.createElement("button");
        const taskDeleteNode = document.createElement("button");

        taskNode.className = "row pb-3";
        
        taskTitleNode.className = "col-2 tasktitle bg-primary";

        taskDeleteNode.className = "col-2 taskdelete bg-danger";

        taskTitleNode.textContent = `Task ${task.ID+1}`;
        taskDeleteNode.textContent = "Delete";
        taskDeleteNode.id = task.ID;
        taskDeleteNode.addEventListener(
            "click",
            function(e) {
            e.preventDefault();
            console.log("Delete triggered: ");
            newArray = spliceOut(taskListArray, taskDeleteNode.id);
            showTasks(newArray);
            reset()
            }
        )

        taskEditNode.id = task.ID;

        if (taskEditNode.id == id) {
            taskEditNode.className = "col-2 taskedit bg-warning";
            taskEditNode.textContent = "Save";
            var taskTextNode = document.createElement("input");
            taskTextNode.className = "col-6 tasktext";
            taskTextNode.defaultValue = task.text;                   
            taskEditNode.addEventListener(
                "click",
                function(e) {
                    e.preventDefault();
                    console.log("Save triggered:");
                    task.text = taskTextNode.value;
                    showTasks(taskListArray, -1);
                }
            )
        }

        else {
            taskEditNode.className = "col-2 taskedit bg-success";
            taskEditNode.textContent = "Edit";
            var taskTextNode = document.createElement("div");
            taskTextNode.className = "col-6 tasktext";
            taskTextNode.textContent = task.text;
            taskEditNode.addEventListener(
                "click",
                function(e) {
                    e.preventDefault();
                    console.log("Edit triggered: ");
                    showTasks(taskListArray, taskEditNode.id);
                    reset()
                }
            )
        }

        taskNode.appendChild(taskTitleNode);
        taskNode.appendChild(taskTextNode);
        taskNode.appendChild(taskEditNode);
        taskNode.appendChild(taskDeleteNode);
        console.log(taskNode);
        currentTasks.appendChild(taskNode);
        newTaskInput.value = ""
    })
}

function spliceOut(taskListArray, id) {
    newArray = [];
    id = Number(id);
    taskListArray.forEach(
        function(task){
            console.log(task.ID, id);            
            if (!(task.ID == id)) {
                console.log(task.ID, id)
                console.log(!(task.ID == id));
                newArray.push(task)}
        }
    );
    return newArray
}

function reset() {
    taskListArray = newArray;
    console.log("Reset taskListArray ="+taskListArray)
}