import { alertNotification } from './alertNotification.js';
import { addLocalStorage, getLocalStorage, clearAllListStorage } from './localeStorage.js'

$(document).ready(function () {
  getLocalStorage();

});

// ALL BUTTONS LOGIC

  // CLEAR ALL FROM STORAGE BUTTON

$("#clearBtn").click(clearAllListStorage);

  // SUBMIT BUTTON 

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

  // CHECHBOX BUTTON FUNCTIONALITY

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

