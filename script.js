// ======================
// AUTH CHECK (INIT GUARD)
// ======================
window.onload = function () {

  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
    return;
  }

  init();
};

// ======================
// INIT SYSTEM
// ======================
function init() {
  generateRooms();
  updateDashboard();
  renderRooms();
  renderReservationTable(); // 🔥 ADD THIS
}
// ======================
// ROOMS DATA (67 ROOMS)
// ======================
let rooms = [];

function generateRooms() {
  rooms = [];

  for (let i = 101; i <= 167; i++) {
    rooms.push({
      number: i,
      status: "available", // available | reserved | occupied
      guest: ""
    });
  }
}

// ======================
// DASHBOARD UPDATE
// ======================
function updateDashboard() {

  let occupied = rooms.filter(r => r.status === "occupied").length;
  let available = rooms.filter(r => r.status === "available").length;
  let reserved = rooms.filter(r => r.status === "reserved").length;

  let occupancy = rooms.length ? (occupied / rooms.length) * 100 : 0;

  let revenue = occupied * 1500;

  setText("occ", Math.round(occupancy) + "%");
  setText("occupied", occupied);
  setText("available", available);
  setText("rev", revenue);
}

// ======================
// SAFE SET TEXT
// ======================
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerText = value;
}

// ======================
// RENDER ROOMS
// ======================
function renderRooms() {

  const container = document.getElementById("roomsContainer");
  if (!container) return;

  container.innerHTML = "";

  rooms.forEach(room => {

    const div = document.createElement("div");

    div.className = `room ${room.status}`;

    div.innerHTML = `
      <strong>${room.number}</strong><br>
      <small>${room.guest || room.status}</small>
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

  document.getElementById("guestName").value = selectedRoom.guest || "";
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

  if (!selectedRoom) return;

  const name = document.getElementById("guestName").value.trim();

  if (!name) {
    alert("Please enter guest name");
    return;
  }

  selectedRoom.status = "occupied";
  selectedRoom.guest = name;

  refresh();
}

// ======================
// CHECK-OUT
// ======================
function confirmCheckOut() {

  if (!selectedRoom) return;

  selectedRoom.status = "available";
  selectedRoom.guest = "";

  refresh();
}

// ======================
// RESERVE ROOM
// ======================
function reserveRoom() {

  if (!selectedRoom) return;

  const name = document.getElementById("guestName").value.trim();

  if (!name) {
    alert("Please enter guest name");
    return;
  }

  selectedRoom.status = "reserved";
  selectedRoom.guest = name;

  refresh();
}

// ======================
// CENTRAL REFRESH (IMPORTANT IMPROVEMENT)
// ======================
function refresh() {
  updateDashboard();
  renderRooms();
  renderReservationTable(); // 🔥 ADD THIS
  closeModal();
}
// ======================
// RENDER RESERVATION TABLE
// ======================
function renderReservationTable() {

  let table = document.querySelector("#reservationTable tbody");
  if (!table) return;

  table.innerHTML = "";

  rooms.forEach(room => {

    if (room.status !== "available") {

      let row = document.createElement("tr");

      row.innerHTML = `
        <td>${room.guest}</td>
        <td>${room.number}</td>
        <td>${room.status}</td>
      `;

      table.appendChild(row);
    }

  });
}
