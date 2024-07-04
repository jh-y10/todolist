const $taskInput = document.getElementById("taskInput");
const $addButton = document.getElementById("addButton");
const $taskBoard = document.getElementById("taskBoard");
const tabs = document.querySelectorAll(".task-tabs div");
const taskList = [];
let filterList = [];
let mode = "all";

const addTask = () => {
  if ($taskInput.value == "") {
    alert("비어있는 값은 입력할 수 없습니다");
    return;
  } else {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].taskContent == $taskInput.value) {
        alert("중복된 값은 입력할 수 없습니다");
        return;
      }
    }
  }
  const task = {
    id: createRandomID(),
    taskContent: $taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
  $taskInput.value = "";
};

const render = () => {
  let list = [];

  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div id="taskItem" class="task-item task-item-complete">
            <div class="task-complete">${list[i].taskContent}</div>
            <div>
              <i class="fa-solid fa-rotate-left task-button return-button" onclick="completeTask('${list[i].id}')"></i>
              <i class="fa-regular fa-square-minus task-button delete-button" onclick="deleteTask('${list[i].id}')"></i>
            </div>
          </div>`;
      continue;
    }

    resultHTML += `<div id="taskItem" class="task-item">
            <div>${list[i].taskContent}</div>
            <div>
              <i class="fa-solid fa-check task-button check-button" onclick="completeTask('${list[i].id}')"></i>
              <i class="fa-regular fa-square-minus task-button delete-button" onclick="deleteTask('${list[i].id}')"></i>
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
  
  document.getElementById(mode).click();
};

const deleteTask = (id) => {
  for (i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  for (let i = 0; i < filterList.length; i++) {
    if (filterList[i].id == id) {
      filterList.splice(i, 1);
      break;
    }
  }
  render();
};

const filter = (event) => {
  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
};

const indicator = (event) => {
  tabs[0].style.left = event.currentTarget.offsetLeft + "px";
  tabs[0].style.width = event.currentTarget.offsetWidth + "px";
  tabs[0].style.top =
    event.currentTarget.offsetTop + event.currentTarget.offsetHeight - 3 + "px";
};

const createRandomID = () => {
  return Math.random().toString(36).substr(2, 9);
};

$addButton.addEventListener("click", addTask);
$taskInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    addTask();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
  tabs[i].addEventListener("click", function (event) {
    indicator(event);
  });
}