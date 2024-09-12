const done = document.querySelector(".done");
const task_txt = document.querySelector(".task-title");
const task_box = document.querySelector(".task-box");
const del = document.querySelector(".delete");
const edit = document.querySelector(".other");
const add = document.querySelector(".add");
const task_container = document.querySelector(".task");
const desc_box = document.querySelector(".desc");
const exit = document.querySelector(".cross");
const save = document.querySelector(".save");
const scroll_container = document.querySelector(".scroll");
const edit_menu = document.querySelector(".other");
const edit_opt = document.querySelector(".edit-opt");
const del_opt = document.querySelector(".del-opt");
const container = document.querySelector(".container");

let editingTaskBox = null;

const delTask = () => {
    if (editingTaskBox) {
        scroll_container.removeChild(editingTaskBox);
        editingTaskBox = null;
        desc_box.style.visibility = "hidden";
        task_container.style.visibility = "visible";
        add.style.visibility = "visible";
        edit_menu.style.visibility = "hidden";
    }
};
del.addEventListener("click", delTask)

let cnt = 0;
function handleDoneClick(task_txt, done) {
    if (task_txt.style.textDecoration === "line-through") {
        task_txt.style.textDecoration = "none";
        done.style.backgroundColor = "white";
    } else {
        task_txt.style.textDecoration = "line-through";
        done.style.backgroundColor = "#a59cef";
    }
}

edit_menu.style.visibility = "hidden";

del_opt.addEventListener("click", delTask);
del.addEventListener("click", delTask);

save.addEventListener("click", () => {
    const taskTitleValue = document.querySelector(".desc-task-title").value;
    const taskDescriptionValue = document.querySelector(".description").value;

    if (editingTaskBox) {
        const taskTitleElement = editingTaskBox.querySelector(".task-title");
        const taskDescElement = editingTaskBox.querySelector(".task-desc");

        taskTitleElement.textContent = taskTitleValue;
        taskDescElement.textContent = taskDescriptionValue;

        desc_box.style.visibility = "hidden";
        task_container.style.visibility = "visible";
        add.style.visibility = "visible";
        edit_menu.style.visibility = "hidden";

        editingTaskBox = null;
    } else {
        const newTaskBox = document.querySelector(".task-box").cloneNode(true);
        const newTaskTitle = newTaskBox.querySelector(".task-title");
        const taskDescElement = newTaskBox.querySelector(".task-desc");
        newTaskBox.style.display = "block"

        newTaskTitle.textContent = taskTitleValue || "Untitled";
        taskDescElement.textContent = taskDescriptionValue;
        taskDescElement.style.display = "none";

        const newDone = newTaskBox.querySelector(".done");
        newDone.addEventListener("click", () => handleDoneClick(newTaskTitle, newDone));

        newTaskBox.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        
            const clickX = event.pageX;
            const clickY = event.pageY;
        
            const menuWidth = edit_menu.offsetWidth;
            const menuHeight = edit_menu.offsetHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const posX = (clickX + menuWidth > windowWidth) ? windowWidth - menuWidth : clickX;
            const posY = (clickY + menuHeight > windowHeight) ? windowHeight - menuHeight : clickY;
    
            edit_menu.style.left = `${posX-300}px`;
            edit_menu.style.top = `${posY}px`;
            edit_menu.style.visibility = "visible";
        
            editingTaskBox = newTaskBox;
        });
        

        scroll_container.appendChild(newTaskBox);
    }


    desc_box.style.visibility = "hidden";
    task_container.style.visibility = "visible";
    add.style.visibility = "visible";
    document.querySelector(".desc-task-title").value = "";
    document.querySelector(".description").value = "";
});

edit_opt.addEventListener("click", () => {
    if (editingTaskBox) {
        const taskTitleElement = editingTaskBox.querySelector(".task-title");
        const taskDescElement = editingTaskBox.querySelector(".task-desc");

        document.querySelector(".desc-task-title").value = taskTitleElement.textContent;
        document.querySelector(".description").value = taskDescElement.textContent;
        console.log(taskDescElement.textContent)

        desc_box.style.visibility = "visible";
        task_container.style.visibility = "hidden";
        add.style.visibility = "hidden";
        edit_menu.style.visibility = "hidden";
    }

});

container.addEventListener("click", () => {
    if (edit_menu.style.visibility == "visible") {
        edit_menu.style.visibility = "hidden";
    }
})

add.addEventListener("click", () => {
    editingTaskBox = null;
    task_container.style.visibility = "hidden";
    add.style.visibility = "hidden";
    desc_box.style.visibility = "visible";
});

desc_box.style.visibility = "hidden";

exit.addEventListener("click", () => {
    desc_box.style.visibility = "hidden";
    task_container.style.visibility = "visible";
    add.style.visibility = "visible";
    editingTaskBox = null;
    document.querySelector(".desc-task-title").value = "";
    document.querySelector(".description").value = "";
});

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.querySelector('.time').textContent = timeString;
}
updateTime();
setInterval(updateTime, 1000);

const curr = new Date();
document.querySelector(".day").innerHTML = curr.toLocaleDateString('en-US', { weekday: 'long' });

const day = curr.getDate();
const month = curr.toLocaleDateString('en-US', { month: 'long' });
document.querySelector(".month").innerHTML = day + " " + month;