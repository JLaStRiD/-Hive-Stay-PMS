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
// LOGIN FUNCTION (TOP)
// ======================
function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong credentials");
  }
}


// ======================
// DASHBOARD UPDATE
// ======================
function updateDashboard() {
  // logic here
}


// ======================
// SHOW ROOMS
// ======================
function showRooms() {
  // your room UI
}


// ======================
// BOOK ROOM
// ======================
function bookRoom(roomNo) {
  // booking logic
}
function login() {
// ======================
// ENHANCED DASHBOARD UPDATER
// ======================
function updateDashboard() {

  // 🧠 SAFETY CHECK (kung wala pa rooms)
  if (!Array.isArray(rooms) || rooms.length === 0) return;

  // 🧠 VALIDATE ROOM DATA (ignore corrupted entries)
  let validRooms = rooms.filter(r =>
    r &&
    typeof r.number !== "undefined" &&
    typeof r.status === "string"
  );

  // 🟢 COUNT ROOMS BY STATUS
  let occupied = validRooms.filter(r => r.status === "occupied").length;
  let available = validRooms.filter(r => r.status === "available").length;
  let cleaning = validRooms.filter(r => r.status === "cleaning").length;
  let maintenance = validRooms.filter(r => r.status === "maintenance").length;

  let total = validRooms.length;

  // 🧠 PREVENT DIVIDE BY ZERO
  let occupancyRate = total > 0 ? (occupied / total) * 100 : 0;

  // ======================
  // UPDATE UI ELEMENTS
  // ======================

  const setText = (id, value) => {
    let el = document.getElementById(id);
    if (el) el.innerText = value;
  };

  setText("occ", Math.round(occupancyRate) + "%");
  setText("guests", occupied);
  setText("available", available);
  setText("cleaning", cleaning);
  setText("maintenance", maintenance);
}  
// ======================
// LOGIN SYSTEM
// ======================
function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong credentials");
  }
}


// ======================
// ROOM DATA (67 ROOMS)
// ======================
let rooms = [];

// GENERATE 67 ROOMS
for (let i = 101; i <= 167; i++) {
  rooms.push({
    number: i,
    status: "available",
    guest: ""
  });
}  
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong credentials");
  }
}
// ======================
// SHOW ROOMS MODULE
// ======================
function showRooms() {

  let html = "<h2>Rooms</h2>";

  rooms.forEach(r => {

    html += `
      <div class="room ${r.status}">
        <strong>Room ${r.number}</strong> - ${r.status}
        <br>
        <small>${r.guest ? "Guest: " + r.guest : "No Guest"}</small>
        <br>
        <button onclick="bookRoom(${r.number})">Book</button>
      </div>
    `;
  });

  document.getElementById("main").innerHTML = html;
}
// ======================
// BOOK ROOM FUNCTION
// ======================
function bookRoom(roomNo) {

  let name = prompt("Guest Name:");

  // 🧠 VALIDATION (IMPORTANT)
  if (!name || name.trim() === "") {
    alert("Guest name is required!");
    return;
  }

  let room = rooms.find(r => r.number === roomNo);

  // 🧠 SAFETY CHECK
  if (!room) {
    alert("Room not found!");
    return;
  }

  if (room.status === "occupied") {
    alert("Room is already occupied!");
    return;
  }

  // 🟢 UPDATE ROOM
  room.status = "occupied";
  room.guest = name.trim();

  // 🧠 UPDATE SYSTEM
  updateDashboard();
  showRooms();

  alert(`Room ${roomNo} booked successfully for ${name}`);
}
