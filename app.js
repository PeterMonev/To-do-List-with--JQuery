$(document).ready(function () {
  getLocalStorage();
});

$("#clearBtn").click(clearAllList);

$("#addBtn").click(function (event) {
  event.preventDefault();
  const task = $("#todoInput").val();

  if (task) {
    addLocalStorage(task);
    alertNotification("Successfully entered a task!", "alert alert-success");
    $("#todoInput").val("");
  } else {
    alertNotification("Please write something!", "alert alert-danger");
  }
});

// LOCAL STORAGE FUNCTIONALITY

// Creating functionality

function addLocalStorage(task) {
  const id = new Date().getTime().toString();
  let taskObj = { id, value: task, checked: false };
  let tasks = JSON.parse(localStorage.getItem("tasks"))
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  tasks.push(taskObj);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  getLocalStorage();
}

// Adding functionality

function getLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  $("#todoList").empty();
  if (tasks !== null) {
    tasks.map((task) => {
      createLi(task);
    });
  }

  $("#todoList").sortable({
    stop: function () {
      const tasks = [];
      $("#todoList li").each(function (index) {
        $(this)
        .find("#numberTask")
        .text(index + 1);
        const id = $(this).data("id");
        const value = $(this).find("p").text();
        const checked = $(this).find("#checkbox").is(":checked");
        const task = { id, value, checked };
        tasks.push(task);
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
  });
}

// Clear LocalStorage functionality

function clearAllList() {
  localStorage.clear();
  getLocalStorage();
  alertNotification("Clear all list!", "alert alert-info");
}

// CREATING LIST ITEMS FUNCTIONALITY

function createLi(task) {
  $("#todoList").append(
    `
       <li data-id="${
         task.id
       }" id="list-item" class="list-item row justify-content-between  m-4 border border-light rounded-pill">
       <div id="numberTask"  class="col-12 col-sm-1 my-3">${
         $("#todoList").children().length + 1
       }</div>
       <div class="col-12 col-sm-5 text-center col-5"><p class="mt-3 ${
         task.checked ? "text-decoration-line-through" : ""
       }">${task.value}</p></div>
       <div id="divBtns" class="col-12 col-sm-6 justify-content-between py-2">
       <input id="checkbox" type="checkbox" ${task.checked ? "checked" : ""}> 
       <button id="editBtn" class="button mx-4 my-1"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="lightsalmon" class="bi bi-pencil-square" viewBox="0 0 16 16">
       <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
       <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
     </svg></button>
       <button id="deleteBtn" class="button delete " ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="lightsalmon" class="bi bi-trash3-fill" viewBox="0 0 16 16">
       <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
     </svg></button>
       </div>
       </li>
    `
  );
}

// DELETE BUTTON FUNCTION
$(document).on("click", "#deleteBtn", function () {
  const id = $(this).closest("li").data("id");
  if (confirm("Are you sure you want to delete this task?")) {
    deleteTask(id);
  }
});

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  if (tasks.length === 0) {
    localStorage.removeItem("tasks");
  }

  getLocalStorage();
  alertNotification("Task deleted!", "alert alert-warning");
}

// EDIT BUTTON FUNCTION

$(document).on("click", "#editBtn", function () {
  const id = $(this).closest("li").data("id");
  editTask(id);
});

function editTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const taskToEdit = tasks.find((task) => task.id == id);

  $("#editId").val(taskToEdit.id);
  $("#editValue").val(taskToEdit.value);
  $("#editModal").modal("show");
}

$("#editForm").submit(function (event) {
  event.preventDefault();

  const id = $("#editId").val();
  const newValue = $("#editValue").val();
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  const taskIndex = tasks.findIndex((task) => task.id == id);
  tasks[taskIndex].value = newValue;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  getLocalStorage();
  $("#editModal").modal("hide");
  alertNotification("Task updated!", "alert alert-primary");
});

// CHECHBOX FUNCTIONALITY

$(document).on("click", "#checkbox", function () {
  const id = $(this).closest("li").data("id");
  const isChecked = $(this).is(":checked");

  checkboxTask(id, isChecked);
});

function checkboxTask(id, isChecked) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const taskIndex = tasks.findIndex((task) => task.id == id);
  tasks[taskIndex].checked = isChecked;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  getLocalStorage();
}

// ALERT NOTIFICATION FUNCTIONALITY

function alertNotification(message, alert) {
  $(`#alert`)
    .fadeIn(1000)
    .text(message)
    .removeClass()
    .addClass(`${alert} text-center`);
  setTimeout(function () {
    $(`#alert`).fadeOut(1000);
  }, 2000);
}
