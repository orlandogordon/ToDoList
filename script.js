"use strict";

const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const taskElements = document.querySelector("#tasks");

// Function to be used for generating tasks as the user submits the form
const renderMarkup = function () {
  return `  
  <div class="task">
  <div class="content">
  <input type="text" class="text" value="${input.value}" readonly />
  </div>
  <div class="actions">
  <button class="edit">Edit</button>
  <button class="delete">Delete</button>
  </div>
  </div>`;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  taskElements.insertAdjacentHTML("afterbegin", renderMarkup());
  const editBtn = document.querySelector(".edit");
  const deleteBtn = document.querySelector(".delete");
  const task = document.querySelector(".text");

  // Add event listener for the 'edit' button of each task
  editBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // Check if the user is attempting to edit the submitted task or save changes that they've made
    if (editBtn.innerHTML === "Edit") {
      task.removeAttribute("readonly");
      editBtn.innerHTML = "Save";
      // Allows the user to save their changes by pressing the enter key
      task.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
          task.readOnly = true;
          editBtn.innerHTML = "Edit";
        }
      });
    } else {
      task.readOnly = true;
      editBtn.innerHTML = "Edit";
    }
  });

  // Add event listener for the 'delete' button of each task
  deleteBtn.addEventListener("click", function (e) {
    e.preventDefault();
    deleteBtn.closest(".task").remove();
  });
});
