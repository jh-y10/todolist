const $taskInput = document.getElementById("taskInput");
const $addButton = document.getElementById("addButton");
const $taskBoard = document.getElementById("taskBoard");
const taskList = [];

const addTask = () => {
  const taskContent = $taskInput.value;
  taskList.push(taskContent);
  render();
};

const render = () => {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div id="taskItem" class="task-item">
            <div>${taskList[i]}</div>
            <div>
              <button>Check</button>
              <button>Delete</button>
            </div>
          </div>`;
  }
  $taskBoard.innerHTML = resultHTML;
};

$addButton.addEventListener("click", addTask);
$taskInput.addEventListener("focus", function(){$taskInput.value="";});