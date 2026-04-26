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
// DASHBOARD UPDATE
// ======================
function updateDashboard() {

  let stats = {
    occupied: 0,
    available: 0,
    cleaning: 0,
    maintenance: 0
  };

  let revenue = 0;

  rooms.forEach(r => {

    if (r.status === "occupied") {
      stats.occupied++;
      revenue += 1500;
    }
    else if (r.status === "available") stats.available++;
    else if (r.status === "cleaning") stats.cleaning++;
    else if (r.status === "maintenance") stats.maintenance++;
  });

  let occupancy = (stats.occupied / rooms.length) * 100;

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
        Room ${r.number} - ${r.status}
        <br>
        ${r.guest ? "Guest: " + r.guest : ""}
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

  if (!room || room.status === "occupied") {
    alert("Room not available!");
    return;
  }

  room.status = "occupied";
  room.guest = name;

  updateDashboard();
  showRooms();

  alert("Room booked successfully!");
}
