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
let selectedRoom = null;

// OPEN MODAL
function handleRoom(roomNo) {

  selectedRoom = rooms.find(r => r.number === roomNo);
  if (!selectedRoom) return;

  document.getElementById("roomModal").style.display = "block";
  document.getElementById("modalRoomText").innerText =
    "Room " + selectedRoom.number + " (" + selectedRoom.status + ")";
}

// CLOSE MODAL
function closeModal() {
  document.getElementById("roomModal").style.display = "none";
  document.getElementById("guestName").value = "";
}

// CHECK-IN
function confirmCheckIn() {

  let name = document.getElementById("guestName").value;

  if (!name || name.trim() === "") {
    alert("Please enter guest name");
    return;
  }

  if (selectedRoom.status === "available") {

    selectedRoom.status = "occupied";
    selectedRoom.guest = name.trim();

    updateDashboard();
    renderRooms();

    closeModal();
  }
}

// CHECK-OUT
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
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
    return;
  }

  updateDashboard();
  renderRooms();
};
