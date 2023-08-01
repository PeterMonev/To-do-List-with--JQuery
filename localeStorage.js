import { createLi } from "./creatingLi.js";
import { alertNotification } from "./alertNotification.js";

// LOCAL STORAGE FUNCTIONALITY

// Creating functionality

export function addLocalStorage(task) {
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
  
export function getLocalStorage() {
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
  
export function clearAllListStorage() {
    localStorage.clear();
    getLocalStorage();
    alertNotification("Clear all list!", "alert alert-info");
  }