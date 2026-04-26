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

  let occ = rooms.length ? (occupied / rooms.length) * 100 : 0;

  let set = (id, val) => {
    let el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  set("occ", Math.round(occ) + "%");
  set("occupied", occupied);
  set("available", available);
}

// ======================
// RENDER ROOMS
// ======================
function renderRooms() {

  let container = document.getElementById("roomsContainer");
  if (!container) return;

  container.innerHTML = "";

  rooms.forEach(r => {

    let div = document.createElement("div");
    div.className = "room " + r.status;

    div.innerHTML = `
      <strong>${r.number}</strong><br>
      <small>${r.guest || "No Guest"}</small>
    `;

    div.onclick = () => handleRoom(r.number);

    container.appendChild(div);
  });
}

// ======================
// MODAL SYSTEM ONLY (FINAL)
// ======================
let selectedRoom = null;

function handleRoom(roomNo) {

  selectedRoom = rooms.find(r => r.number === roomNo);
  if (!selectedRoom) return;

  document.getElementById("roomModal").style.display = "block";
  document.getElementById("modalRoomText").innerText =
    "Room " + selectedRoom.number + " (" + selectedRoom.status + ")";
}

function closeModal() {
  document.getElementById("roomModal").style.display = "none";
  document.getElementById("guestName").value = "";
}

function confirmCheckIn() {

  let name = document.getElementById("guestName").value;

  if (!name || name.trim() === "") return;

  if (selectedRoom.status === "available") {
    selectedRoom.status = "occupied";
    selectedRoom.guest = name.trim();

    updateDashboard();
    renderRooms();
    closeModal();
  }
}

function confirmCheckOut() {

  if (!selectedRoom) return;

  if (selectedRoom.status === "occupied") {

    selectedRoom.status = "available";
    selectedRoom.guest = "";

    updateDashboard();
    renderRooms();
    closeModal();
  }
}

// ======================
// INIT (ONLY ONE)
// ======================
window.onload = function () {

  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
    return;
  }

  updateDashboard();
  renderRooms();
};
