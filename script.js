// ======================
// LOGIN
// ======================
function login() {

  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong credentials");
  }
}

// ======================
// ROOMS DATA
// ======================
let rooms = [];

for (let i = 101; i <= 167; i++) {
  rooms.push({
    number: i,
    status: "available",
    guest: ""
  });
}

// ======================
// DASHBOARD
// ======================
function updateDashboard() {

  let occupied = rooms.filter(r => r.status === "occupied").length;
  let available = rooms.filter(r => r.status === "available").length;

  let occ = (occupied / rooms.length) * 100;

  let set = (id, val) => {
    let el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  set("occ", Math.round(occ) + "%");
  set("occupied", occupied);
  set("available", available);
}

// ======================
// RENDER ROOMS (MAIN CLICK SYSTEM)
// ======================
function renderRooms() {

  let container = document.getElementById("roomsContainer");
  if (!container) return;

  container.innerHTML = "";

  rooms.forEach(r => {

    let div = document.createElement("div");
    div.className = "room " + r.status;
    div.innerText = r.number;

    div.onclick = function () {
      handleRoom(r.number);
    };

    container.appendChild(div);
  });
}

// ======================
// ROOM ACTION (BOOK + CHECKOUT)
// ======================
function handleRoom(roomNo) {

  let room = rooms.find(r => r.number === roomNo);
  if (!room) return;

  if (room.status === "available") {

    let name = prompt("Guest Name:");
    if (!name || name.trim() === "") return;

    room.status = "occupied";
    room.guest = name.trim();

  } else {

    let out = confirm("Checkout room?");
    if (!out) return;

    room.status = "available";
    room.guest = "";
  }

  updateDashboard();
  renderRooms();
}

// ======================
// INIT (IMPORTANT FIX)
// ======================
window.onload = function () {

  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
    return;
  }

  updateDashboard();
  renderRooms();
};
