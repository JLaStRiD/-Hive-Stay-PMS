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
// LOGIN FUNCTION
// ======================
function login() {

  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (!u || !p) {
    alert("Please enter username and password");
    return;
  }

  if (u === "admin" && p === "1234") {

    localStorage.setItem("loggedIn", "true");

    window.location.href = "dashboard.html";

  } else {
    alert("Wrong credentials");
  }
}


// ======================
// DASHBOARD UPDATER
// ======================
function updateDashboard() {

  if (!rooms || rooms.length === 0) return;

  let stats = {
    occupied: 0,
    available: 0,
    cleaning: 0,
    maintenance: 0
  };

  let revenue = 0;

  rooms.forEach(r => {

    if (!r || !r.status) return;

    switch (r.status) {
      case "occupied":
        stats.occupied++;
        revenue += 1500;
        break;

      case "available":
        stats.available++;
        break;

      case "cleaning":
        stats.cleaning++;
        break;

      case "maintenance":
        stats.maintenance++;
        break;
    }
  });

  let total = rooms.length;
  let occupancy = total ? (stats.occupied / total) * 100 : 0;

  const set = (id, val) => {
    let el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  set("occ", Math.round(occupancy) + "%");
  set("guests", stats.occupied);
  set("available", stats.available);
  set("cleaning", stats.cleaning);
  set("maintenance", stats.maintenance);
  set("rev", revenue);
}


// ======================
// SHOW ROOMS
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
// BOOK ROOM
// ======================
function bookRoom(roomNo) {

  let name = prompt("Guest Name:");

  if (!name || name.trim() === "") {
    alert("Guest name is required!");
    return;
  }

  let room = rooms.find(r => r.number === roomNo);

  if (!room) {
    alert("Room not found!");
    return;
  }

  if (room.status === "occupied") {
    alert("Room is already occupied!");
    return;
  }

  room.status = "occupied";
  room.guest = name.trim();

  updateDashboard();
  showRooms();

  alert(`Room ${roomNo} booked successfully for ${name}`);
      }
