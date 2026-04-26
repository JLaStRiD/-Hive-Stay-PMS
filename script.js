// ======================
// AUTH CHECK (INIT GUARD)
// ======================
window.onload = function () {

  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
    return;
  }

  updateDashboard();
  renderRooms();
};

// ======================
// ROOMS DATA (67 ROOMS)
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
// DASHBOARD UPDATE
// ======================
function updateDashboard() {

  let occupied = rooms.filter(r => r.status === "occupied").length;
  let available = rooms.filter(r => r.status === "available").length;

  let occupancy = rooms.length ? (occupied / rooms.length) * 100 : 0;
// 💰 REVENUE LOGIC
  let revenue = occupied * 1500;

  setText("occ", Math.round(occupancy) + "%");
  setText("occupied", occupied);
  setText("available", available);
  setText("rev", revenue);
}
// helper
function setText(id, value) {
  let el = document.getElementById(id);
  if (el) el.innerText = value;
}

// ======================
// RENDER ROOMS GRID
// ======================
function renderRooms() {

  let container = document.getElementById("roomsContainer");
  if (!container) return;

  container.innerHTML = "";

  rooms.forEach(room => {

    let div = document.createElement("div");
    div.className = "room " + room.status;

    div.innerHTML = `
      <strong>${room.number}</strong><br>
      <small>${room.guest || "Available"}</small>
    `;

    div.onclick = () => openRoomModal(room.number);

    container.appendChild(div);
  });
}

// ======================
// MODAL STATE
// ======================
let selectedRoom = null;

// ======================
// OPEN MODAL
// ======================
function openRoomModal(roomNo) {

  selectedRoom = rooms.find(r => r.number === roomNo);
  if (!selectedRoom) return;

  document.getElementById("roomModal").style.display = "block";
  document.getElementById("modalRoomText").innerText =
    `Room ${selectedRoom.number} - ${selectedRoom.status}`;

  document.getElementById("guestName").value = "";
}

// ======================
// CLOSE MODAL
// ======================
function closeModal() {
  document.getElementById("roomModal").style.display = "none";
}

// ======================
// CHECK-IN
// ======================
function confirmCheckIn() {

  let name = document.getElementById("guestName").value;

  if (!name || name.trim() === "") {
    alert("Please enter guest name");
    return;
  }

  if (!selectedRoom) return;

  if (selectedRoom.status === "available") {
    selectedRoom.status = "occupied";
    selectedRoom.guest = name.trim();

    updateDashboard();
    renderRooms();
    closeModal();
  }
}

// ======================
// CHECK-OUT
// ======================
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
