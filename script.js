function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong credentials");
  }
}
