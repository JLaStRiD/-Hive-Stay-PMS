function login() {
// ======================
// DASHBOARD UPDATER
// ======================
function updateDashboard() {

  let occupied = rooms.filter(r => r.status === "occupied").length;
  let available = rooms.filter(r => r.status === "available").length;

  document.getElementById("occ").innerText =
    Math.round((occupied / rooms.length) * 100) + "%";

  document.getElementById("guests").innerText = occupied;
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
