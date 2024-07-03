const $taskInput = document.getElementById("taskInput");
const $addButton = document.getElementById("addButton");
const $taskBoard = document.getElementById("taskBoard");
const taskList = [];

const addTask = () => {
  const task = {
    id: createRandomID(),
    taskContent: $taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
};

const render = () => {
  let resultHTML = "";

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<div id="taskItem" class="task-item task-item-complete">
            <div class="task-complete">${taskList[i].taskContent}</div>
            <div>
              <i class="fa-solid fa-rotate-left task-button return-button" onclick="completeTask('${taskList[i].id}')"></i>
              <i class="fa-regular fa-square-minus task-button delete-button" onclick="deleteTask('${taskList[i].id}')"></i>
            </div>
          </div>`;
      continue;
    }

    resultHTML += `<div id="taskItem" class="task-item">
            <div>${taskList[i].taskContent}</div>
            <div>
              <i class="fa-solid fa-check task-button check-button" onclick="completeTask('${taskList[i].id}')"></i>
              <i class="fa-regular fa-square-minus task-button delete-button" onclick="deleteTask('${taskList[i].id}')"></i>
            </div>
          </div>`;
  }
  $taskBoard.innerHTML = resultHTML;
};

const completeTask = (id) => {
  for (i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
};

const deleteTask = (id) => {
  for (i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
};

const createRandomID = () => {
  return Math.random().toString(36).substr(2, 9);
};

$addButton.addEventListener("click", addTask);
$taskInput.addEventListener("focus", function () {
  $taskInput.value = "";
});
