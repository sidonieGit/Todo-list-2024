const inputBox = document.getElementById("input-box");
const listContainer1 = document.getElementById("list-container1");
const buttonAddon2 = document.getElementById("button-addon2");
const allTasksBtn = document.querySelector(".btn-group a:first-child"); // Select "Toutes" button
const todoTasksBtn = document.querySelector(".btn-group a:nth-child(2)"); // Select "A faire" button
const completedTasksBtn = document.querySelector(".btn-group a:nth-child(3)"); // Select "Terminées" button

// Current filter (default: all tasks)
let currentFilter = "all";

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTaskToDOM(task.text, task.completed, task.id);
  });
}

// Function to add a task to the DOM
function addTaskToDOM(taskValue, completed = false, taskId) {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center mt-3";
  li.dataset.id = taskId;

  const div = document.createElement("div");
  div.className = "d-flex align-items-center";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input custom-checkbox me-5";
  checkbox.checked = completed;

  const taskText = document.createElement("span");
  taskText.textContent = taskValue;
  taskText.style.textDecoration = completed ? "line-through" : "none"; // Set initial decoration based on completed

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.innerHTML = "&times;";

  // Events for checkbox change, delete, and filter button clicks
  function gestionnaireChangeChecbox() {
    if (checkbox.checked) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "none";
    }
    updateTaskInStorage(taskId, checkbox.checked);
  }
  // Events for checkbox change, delete, and filter button clicks
  checkbox.addEventListener("change", gestionnaireChangeChecbox);

  deleteBtn.addEventListener("click", function () {
    li.remove();
    removeTaskFromStorage(taskId);
  });

  div.appendChild(checkbox);
  div.appendChild(taskText);
  li.appendChild(div);
  li.appendChild(deleteBtn);
  listContainer1.appendChild(li);
}

// Function to add a new task
function addTask() {
  const taskValue = capitalizeFirstLetter(inputBox.value.trim());

  if (taskValue === "") {
    alert("Vous devriez d'abord entrer une tâche");
    return;
  }

  const taskId = Date.now();
  addTaskToDOM(taskValue, false, taskId);
  saveTaskToStorage(taskValue, taskId);

  inputBox.value = "";
}

// Function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to save a task to local storage
function saveTaskToStorage(taskValue, taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskValue, completed: false, id: taskId });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove a task from local storage
function removeTaskFromStorage(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to update task completion in local storage
function updateTaskInStorage(taskId, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].completed = completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    filterTasks(); // Update the displayed tasks based on the current filter
  }
}

loadTasks();

// **11. Événement pour ajouter une tâche**
buttonAddon2.addEventListener("click", addTask);

// evénement pour chager les taches selon le statut
// allTasksBtn.addEventListener("click", loadTasks);
// todoTasksBtn.addEventListener("click");
// completedTasksBtn.addEventListener("click");

// Fonction pour charger les tâches selon le statut
function loadTasksByStatus(status) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  listContainer1.innerHTML = ""; // Vide le conteneur de liste

  tasks.forEach((task) => {
    if (
      (status === "all" && task) || // Affiche toutes les tâches si le statut est "all"
      (status === "todo" && !task.completed) || // Affiche les tâches non terminées si le statut est "todo"
      (status === "completed" && task.completed) // Affiche les tâches terminées si le statut est "completed"
    ) {
      addTaskToDOM(task.text, task.completed, task.id);
    }
  });
}

// Événements pour changer les tâches selon le statut
allTasksBtn.addEventListener("click", () => {
  currentFilter = "all";
  loadTasksByStatus("all");
});

todoTasksBtn.addEventListener("click", () => {
  currentFilter = "todo";
  loadTasksByStatus("todo");
});

completedTasksBtn.addEventListener("click", () => {
  currentFilter = "completed";
  loadTasksByStatus("completed");
});
