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

  let occRate = (occupied / rooms.length) * 100;

  document.getElementById("occ").innerText = Math.round(occRate) + "%";
  document.getElementById("occupied").innerText = occupied;
  document.getElementById("available").innerText = available;
}

// ======================
// RENDER ROOMS
// ======================
function renderRooms() {

  let container = document.getElementById("roomsContainer");
  container.innerHTML = "";

  rooms.forEach(r => {

    let div = document.createElement("div");
    div.className = "room " + r.status;
    div.innerText = r.number;

    div.onclick = function () {
      handleRoomClick(r.number);
    };

    container.appendChild(div);
  });
}

// ======================
// ROOM ACTION (BOOK / CHECKOUT)
// ======================
function handleRoomClick(roomNo) {

  let room = rooms.find(r => r.number === roomNo);

  if (room.status === "available") {

    let name = prompt("Enter Guest Name:");

    if (!name) return;

    room.status = "occupied";
    room.guest = name;

    alert("Room " + roomNo + " booked!");

  } else {

    let confirmCheckout = confirm("Checkout this room?");

    if (!confirmCheckout) return;

    room.status = "available";
    room.guest = "";

    alert("Room " + roomNo + " is now available.");
  }

  updateDashboard();
  renderRooms();
}
