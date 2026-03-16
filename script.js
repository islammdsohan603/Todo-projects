const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filterBtn");

let tasks = [];

addBtn.addEventListener("click", addTask);

function addTask() {

  let text = taskInput.value.trim();

  if (text === "") return;

  showLoader();

  setTimeout(() => {

    const task = {
      id: Date.now(),
      text: text,
      completed: false
    };

    tasks.push(task);

    saveTasks();

    renderTasks(tasks);

    taskInput.value = "";

    hideLoader();

  }, 300);

}

function renderTasks(list) {

  taskList.innerHTML = "";

  list.forEach(task => {

    const li = document.createElement("li");

    li.className = "flex justify-between items-center bg-gray-100 p-2 rounded text-xl ";

    li.innerHTML = `
    
    <span class="${task.completed ? 'line-through text-gray-400' : ''}">
      ${task.text}
    </span>

    <div class="flex gap-2">

      <button
      onclick="toggleTask(${task.id})"
      class="bg-green-500 text-white px-2 rounded cursor-pointer">
      ✓
      </button>

      <button
      onclick="deleteTask(${task.id})"
      class="bg-red-500 text-white px-2 rounded cursor-pointer">
      X
      </button>

    </div>
    
    `;

    taskList.appendChild(li);

  });

}

function deleteTask(id) {

  tasks = tasks.filter(task => task.id !== id);

  saveTasks();

  renderTasks(tasks);

}

function toggleTask(id) {

  tasks = tasks.map(task => {

    if (task.id === id) {
      task.completed = !task.completed;
    }

    return task;

  });

  saveTasks();

  renderTasks(tasks);

}

function saveTasks() {

  localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks() {

  const data = localStorage.getItem("tasks");

  if (data) {
    tasks = JSON.parse(data);
    renderTasks(tasks);
  }

}

loadTasks();

filterBtns.forEach(btn => {

  btn.addEventListener("click", () => {

    filterBtns.forEach(b => b.classList.remove("bg-blue-400"));

    btn.classList.add("bg-blue-400");

    const type = btn.dataset.filter;

    let filtered = tasks;

    if (type === "completed") {
      filtered = tasks.filter(t => t.completed);
    }

    if (type === "pending") {
      filtered = tasks.filter(t => !t.completed);
    }

    if (type === "all") {
      filtered = tasks;
    }

    renderTasks(filtered);

  });

});

function showLoader() {

  document.getElementById("loader").classList.remove("hidden");

}

function hideLoader() {

  document.getElementById("loader").classList.add("hidden");

}