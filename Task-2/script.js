// Get HTML elements

const taskInput = document.getElementById("taskInput");

const addButton = document.getElementById("addButton");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");

const emptyMessage = document.getElementById("emptyMessage");

const clearCompleted =
    document.getElementById("clearCompleted");


// Store tasks

let tasks = [];


// Add Task Function

function addTask() {

    const taskText = taskInput.value.trim();

    // Prevent empty tasks

    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    // Create task object

    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    // Add task to array

    tasks.push(task);


    // Clear input

    taskInput.value = "";


    // Update UI

    renderTasks();

}


// Render Tasks

function renderTasks() {

    // Clear existing list

    taskList.innerHTML = "";


    // Create each task

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.classList.add("task");


        // Add completed class

        if (task.completed) {

            li.classList.add("completed");

        }


        // Checkbox

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-checkbox");

        checkbox.checked = task.completed;


        // Task text

        const text =
            document.createElement("span");

        text.classList.add("task-text");

        text.textContent = task.text;


        // Delete button

        const deleteButton =
            document.createElement("button");

        deleteButton.classList.add("delete-button");

        deleteButton.textContent = "✕";

        deleteButton.title = "Delete task";


        // Mark complete

        checkbox.addEventListener("change", function() {

            toggleTask(task.id);

        });


        // Delete task

        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        // Add elements to task

        li.appendChild(checkbox);

        li.appendChild(text);

        li.appendChild(deleteButton);


        // Add task to list

        taskList.appendChild(li);

    });


    updateTaskCount();

    updateEmptyMessage();

}


// Toggle Task

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });


    renderTasks();

}


// Delete Task

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    renderTasks();

}


// Clear Completed Tasks

function clearCompletedTasks() {

    tasks = tasks.filter(function(task) {

        return !task.completed;

    });


    renderTasks();

}


// Update Task Count

function updateTaskCount() {

    const remainingTasks =
        tasks.filter(function(task) {

            return !task.completed;

        }).length;


    if (remainingTasks === 1) {

        taskCount.textContent = "1 task remaining";

    } else {

        taskCount.textContent =
            remainingTasks + " tasks remaining";

    }

}


// Empty Message

function updateEmptyMessage() {

    if (tasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

}


// Add button event

addButton.addEventListener("click", addTask);


// Enter key event

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// Clear completed event

clearCompleted.addEventListener(
    "click",
    clearCompletedTasks
);


// Initial UI

renderTasks();