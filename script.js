document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") return;

    let taskItem = document.createElement("li");
    taskItem.textContent = taskInput.value;
    
    taskItem.addEventListener("click", () => {
        taskItem.remove();
        saveTasks();
    });

    taskList.appendChild(taskItem);
    saveTasks();
    taskInput.value = "";
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => tasks.push(task.textContent));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let taskList = document.getElementById("taskList");

    tasks.forEach(taskText => {
        let taskItem = document.createElement("li");
        taskItem.textContent = taskText;
        taskItem.addEventListener("click", () => {
            taskItem.remove();
            saveTasks();
        });
        taskList.appendChild(taskItem);
    });
}
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") return;

    let taskItem = document.createElement("li");
    taskItem.textContent = taskInput.value;
    taskItem.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        saveTasks();
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => {
        taskItem.remove();
        saveTasks();
    };

    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    saveTasks();
    taskInput.value = "";
}
function filterTasks() {
    let filter = document.getElementById("filter").value;
    document.querySelectorAll("#taskList li").forEach(task => {
        if (filter === "completed" && !task.classList.contains("completed")) {
            task.style.display = "none";
        } else if (filter === "pending" && task.classList.contains("completed")) {
            task.style.display = "none";
        } else {
            task.style.display = "block";
        }
    });
}
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.textContent.replace("❌", "").trim(),
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let taskList = document.getElementById("taskList");

    tasks.forEach(taskData => {
        let taskItem = document.createElement("li");
        taskItem.textContent = taskData.text;
        if (taskData.completed) taskItem.classList.add("completed");
        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => {
            taskItem.remove();
            saveTasks();
        };

        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    });
}
