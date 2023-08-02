import { createLi } from "./creatingLi.js";
import { alertNotification } from "./alertNotification.js";

// LOCAL STORAGE FUNCTIONALITY

// Creating functionality

export function addLocalStorage(task) {
  const id = new Date().getTime().toString();
  const taskObj = { id, value: task, checked: false };
  const tasks = JSON.parse(localStorage.getItem("tasks"))
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
    $(".main").show();
    tasks.map((task, index) => {
      createLi(task, index);
    });
  } else {
    $(".main").hide();
  }

  // Drag and Drop functionality

  let dragingIndex;
  let draggingLi;
  

  $("#todoList").sortable({
    start: function (e, ui) {
      draggingLi = ui.item.find("#numberTask");

    },
  
    change: function (event, ui) {
      let arrya = $("#todoList li").length;

      dragingIndex = ui.placeholder.index();

      if(ui.item.index() < dragingIndex) {
        $("#todoList li").each(function (index) {
        draggingLi.text(dragingIndex);
   
        $(this).find("#numberTask").text(index);
  
      });
      } else {
       
        $("#todoList li").each(function (index) {
          $(this).find("#numberTask").text(index + 1);

        if(draggingLi !== $("#todoList").children().last()){
      
            $('.ui-sortable-helper').find('#numberTask').text(dragingIndex +1);
            $("#todoList").children().last().find('#numberTask').text(arrya - 1)
            draggingLi.text(dragingIndex);
          } else {
            $('.ui-sortable-helper').find('#numberTask').text(+dragingIndex +1);
      
          }
        
        })
      }
    },
    stop: function () {
      const tasks = [];
      $("#todoList li").each(function (index) {
        $(this).find("#numberTask").text(index + 1);
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
