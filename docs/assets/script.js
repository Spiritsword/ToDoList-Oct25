// GLOBAL DECLARATIONS, DEFINITIONS, AND INITIALISATION

const addButton = document.getElementById("addbutton");
const taskListCol = document.getElementById("tasklistcol");
var maxTaskID = -1;
var newTaskInput = document.getElementById("newtask");
var taskListArray = [];
var newArray = [];
var newTask;

// ADDING TASKS

addButton.addEventListener("click", function(e) {
    e.preventDefault();
    newTask = {
        ID:maxTaskID,
        text:newTaskInput.value
    }
//Excluding empty tasks
    if (newTask.text == ""){
        alert("Please write new task in the box.")
        return
    }
//Excluding duplicate tasks  
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

//Helper function to add new task into task storage array, and display the task list on the page
function addTask(newTask) {
    taskListArray.push(newTask);
    console.log(taskListArray);
    showTasks(taskListArray, -1);
}

//DISPLAYING THE TASKS

//Helper function to display the tasks
function showTasks(taskListArray, id) {
//"id" is the task id of a task for which the edit button has been clicked. If no task is being edited, then this is -1.
    //Clear display of tasks, to rebuild
    currentTasks.innerHTML = "";

//Adding tasks into the display, one at a time
    taskListArray.forEach(function (task) {
//"taskTitleNode" is the node displaying the task number label
//"taskEditNode" is the edit button
//"taskDeleteNode" is the delete button
//"taskTextNode" is the task description
//"taskNode" is the full task row
//Node generation
        const taskNode = document.createElement("div");
        const taskTitleNode = document.createElement("div");
        var taskEditNode = document.createElement("button");
        const taskDeleteNode = document.createElement("button");
//Node styling
        taskNode.className = "row pb-3";
        taskTitleNode.className = "col-2 tasktitle bg-primary";
        taskDeleteNode.className = "col-2 taskdelete bg-danger";
        taskTitleNode.style.textAlign = "center";
//Node content
        taskTitleNode.textContent = `Task ${task.ID+1}`;
        taskDeleteNode.textContent = "Delete";
//Task deletion functionality added to delete button
        taskDeleteNode.id = task.ID;
        taskDeleteNode.addEventListener(
            "click",
            function(e) {
            e.preventDefault();
            newArray = spliceOut(taskListArray, taskDeleteNode.id);
            showTasks(newArray);
            reset()
            }
        )
//Labelling the edit node with the task id, so that the id can be accessed when the edit event listener is triggered.
        taskEditNode.id = task.ID;
//If task has been clicked for editing, replace the edit button with a save button, and requisite functionality
        if (taskEditNode.id == id) {
            taskEditNode.className = "col-2 taskedit bg-warning";
            taskEditNode.textContent = "Save";
//In this case, define the text node as an "input" element
            var taskTextNode = document.createElement("input");
            taskTextNode.defaultValue = task.text;                   
            taskEditNode.addEventListener(
                "click",
                function(e) {
                    e.preventDefault();
//When the save button is clicked, the edited text becomes the fixed task description.
                    task.text = taskTextNode.value;
//Rebuilding the task list without any task being in edit mode
                    showTasks(taskListArray, -1);
                }
            )
        }
//If the task is not already being edited, then set up the edit button, with appropriate functionality
        else {
            taskEditNode.className = "col-2 taskedit bg-success";
            taskEditNode.textContent = "Edit";
            var taskTextNode = document.createElement("div");
            taskTextNode.textContent = task.text;
            taskEditNode.addEventListener(
                "click",
                function(e) {
                    e.preventDefault();
//If the edit event listener is triggered, then display the tasks, with the current task in edit mode
                    showTasks(taskListArray, taskEditNode.id);
                    reset()
                }
            )
        }
//Formatting the task description
        taskTextNode.className = "col-6 tasktext border";
        taskTextNode.style.textWrap = "wrap";
//Adding the task to the DOM       
        taskNode.appendChild(taskTitleNode);
        taskNode.appendChild(taskTextNode);
        taskNode.appendChild(taskEditNode);
        taskNode.appendChild(taskDeleteNode);
        currentTasks.appendChild(taskNode);
//Clearing the "new task" input field
        newTaskInput.value = ""
    })
}

//Helper function to remove a deleted task from the task list array
function spliceOut(taskListArray, id) {
    newArray = [];
    id = Number(id);
    taskListArray.forEach(
        function(task){
            if (!(task.ID == id)) {
                newArray.push(task)}
        }
    );
    return newArray
}

//Helper function to reset the task list array with the depleted version
function reset() {
    taskListArray = newArray;
}