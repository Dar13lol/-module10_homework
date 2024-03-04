
const button = document.getElementById("button");

button.addEventListener("click", () => {
  const icon = button.querySelector(".icon");

  if (icon.classList.contains("icon_01")) {
    icon.classList.replace("icon_01", "icon_02");
  } else {
    icon.classList.replace("icon_02", "icon_01");
  }
});
