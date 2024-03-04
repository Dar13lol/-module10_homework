const button = document.getElementById("button");

button.addEventListener("click", () => {
  const screenWidth = screen.width;
  const screenHeight = screen.height;

  alert(`Ширина экрана: ${screenWidth}px\nВысота экрана: ${screenHeight}px`);
});
