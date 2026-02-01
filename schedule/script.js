const calendarDays = document.getElementById("calendar-days");
const monthYear = document.getElementById("month-year");

let currentDate = new Date();
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

function renderCalendar() {
  
  calendarDays.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.innerText =
    currentDate.toLocaleString("en-US", { month: "long" }) + " " + year;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // ช่องว่างก่อนวันที่ 1
  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  
  // วันจริง
  for (let day = 1; day <= lastDate; day++) {
    
    const dateKey = `${year}-${month + 1}-${day}`;

    calendarDays.innerHTML += `
      <div onclick="addTask(${day})">
        <div class="day-number">${day}</div>
        <div class="tasks" id="tasks-${day}"></div>
      </div>
    `;

    // ✅ แสดง task ที่เคยเก็บไว้
    if (tasks[dateKey]) {
      tasks[dateKey].forEach((task, index) => {
        document.getElementById(`tasks-${day}`).innerHTML +=
          `<div class="task" onclick="deleteTask(event,'${dateKey}', ${index})">
            ${task}
          </div>`;
      });
    }
  }
}

function addTask(day) {
  const task = prompt("What you need to do today?");
  if (!task) return;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const dateKey = `${year}-${month}-${day}`;

  
  if (!tasks[dateKey]) tasks[dateKey] = [];
  tasks[dateKey].push(task);
 


  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderCalendar();
}

function deleteTask(event, dateKey, index) {
  event.stopPropagation();
  if (!confirm("Delete this task?")) return;
  
  

  if (!tasks[dateKey]) return;

  // ลบ task ตาม index
  tasks[dateKey].splice(index, 1);

  
  

  // ถ้าวันนั้นไม่มี task แล้ว ลบ key ทิ้ง
  if (tasks[dateKey].length === 0) {
    delete tasks[dateKey];
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  // render ใหม่ให้หน้าจออัปเดต
  renderCalendar();
}

renderCalendar();

// ปุ่มเปลี่ยนเดือน
document.getElementById("prev").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

document.getElementById("next").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}