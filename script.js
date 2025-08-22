let index = 0
let number = 1
let sortByNow = "Time Added"
let statusNow = "All"
let orderNow = "Descending"


function add() {
    let input = document.getElementById("input").value;
    let date = document.getElementById("date").value;

    if (input.trim() === "") return;

    const container = document.getElementById("task-list-body");

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("tasks");
    taskDiv.id = index;
    taskDiv.dataset.index = index;

    taskDiv.innerHTML = `
      <div class="no">${number}</div>
      <div class="title">${input}</div> 
      <div class="date">${date}</div> 
      <div class="status">
        <button data-status="false" onclick="changeStatus(this)">❌</button>
      </div>
      <div class="actions">
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
      </div>
    `;


    container.appendChild(taskDiv);
    document.getElementById("input").value = "";
    document.getElementById("date").value = "";


    index++;
    number++;

}


function changeStatus(btn) {
    let status = btn.dataset.status === "true";
    btn.dataset.status = !status;
    btn.textContent = status ? "❌" : "✅";
}

function deleteTask(btn) {
    const taskDiv = btn.parentElement.parentElement;
    taskDiv.remove();
    updateNumbers();
}

function updateNumbers() {
    const tasks = document.querySelectorAll('.tasks');
    tasks.forEach((task, i) => {
        task.querySelector(".no").textContent = i + 1;
    });
    number = tasks.length + 1;
}



function deleteAll() {
    let yesOrNo = confirm("Are you sure you want to delete all tasks?");
    if (!yesOrNo) return;
    document.getElementById("task-list-body").innerHTML = "";
    number = 1
}

function toggleDropdown() {
    document.getElementById("dropdown").classList.toggle("open");
}

function submitPilihan() {
    let bagian1 = document.querySelector('input[name="first"]:checked')?.value || "";
    let bagian2 = document.querySelector('input[name="second"]:checked')?.value || "";
    let bagian3 = document.querySelector('input[name="third"]:checked')?.value || "";

    if (bagian1 !== sortByNow || bagian3 !== orderNow) {
        sortBy(bagian1, bagian3);
        orderNow = bagian3;
        sortByNow = bagian1;
    }

    if (bagian2 !== statusNow) {
        statusNow = bagian2;
        filterStatus(bagian2)
    }



    let hasil = `Filter`;
    document.querySelector(".dropdown-btn").textContent = hasil;
    toggleDropdown();
}

function sortBy(bagian1, bagian3) {

    if (bagian1 !== sortByNow) {
        const container = document.getElementById('task-list-body');
        const tasks = Array.from(container.querySelectorAll('.tasks'));

        if (bagian1 === "Due Date") {
            tasks.sort((a, b) => {

                let dateAraw = a.querySelector('.date')?.textContent?.trim();
                let dateBraw = b.querySelector('.date')?.textContent?.trim();

                if (!dateAraw) dateAraw = a.querySelector('input[type="date"]')?.value || "";
                if (!dateBraw) dateBraw = b.querySelector('input[type="date"]')?.value || "";

                const toTime = s => s ? new Date(s).getTime() : 1e15;
                const timeA = toTime(dateAraw);
                const timeB = toTime(dateBraw);

                return timeA - timeB;
            });
        }
        else if (bagian1 === "Time Added") {
            tasks.sort((a, b) => {

                const idxA = parseInt(a.dataset.index || a.getAttribute('data-index') || a.id.replace(/\D/g, ''), 10) || 0;
                const idxB = parseInt(b.dataset.index || b.getAttribute('data-index') || b.id.replace(/\D/g, ''), 10) || 0;
                return idxA - idxB;
            });
        }
        else if (bagian1 === "Alphabetical") {
            tasks.sort((a, b) => {

                const titleA = (a.querySelector('.title')?.textContent || a.querySelector('input[type="text"]')?.value || "").trim().toLowerCase();
                const titleB = (b.querySelector('.title')?.textContent || b.querySelector('input[type="text"]')?.value || "").trim().toLowerCase();
                return titleA.localeCompare(titleB);
            });
        }
    }

    if (bagian3 != orderNow) {
        orderNow = bagian3;
        tasks.reverse();
    }

    tasks.forEach((t, i) => {
        container.appendChild(t);
        t.querySelector(".no").textContent = i + 1;
    });
}
function filterStatus(bagian2) {
    const tasks = Array.from(document.querySelectorAll('.tasks'));

    tasks.forEach(task => {
        const status = task.querySelector('button').textContent.trim();

        if (bagian2 === "All") {
            task.style.display = "";
        }
        else if (bagian2 === "Done") {
            task.style.display = status === "✅" ? "" : "none";
        }
        else if (bagian2 === "To Do") {
            task.style.display = status === "❌" ? "" : "none";
        }
    });

    let visibleNumber = 1;
    tasks.forEach(task => {
        if (task.style.display !== "none") {
            task.querySelector(".no").textContent = visibleNumber;
            visibleNumber++;
        }
    });
}

document.addEventListener("keydown", function (e) {
    const input = document.getElementById("input");
    const active = document.activeElement;
    if (active.tagName !== "INPUT" && active.tagName !== "TEXTAREA") {
        input.focus();
        if (e.key.length === 1) {
            input.value += e.key;
        }
    }
});

document.addEventListener("keydown", function (e) {
    const input = document.getElementById("input");
    const active = document.activeElement;
    if (active.tagName !== "INPUT" && active.tagName !== "TEXTAREA") {
        input.focus();
        if (e.key.length === 1) {
            input.value += e.key;
        }
    }
    if (e.key === "Enter") {
        add();
    }
});
