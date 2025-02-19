import GameOverScreen from "./screens/GameOverScreen.js";
import MainMenuScreen from "./screens/MainMenuScreen.js";

const gameContainer = document.querySelector(
  ".game-container"
) as HTMLDivElement;

function render() {
  gameContainer.appendChild(MainMenuScreen.createMainMenuScreen());
}

render();

const startButton = document.getElementById("btn-start") as HTMLButtonElement;

startButton.addEventListener("click", () => {
  gameContainer.innerHTML = "";

  gameContainer.appendChild(GameOverScreen.createGameOverScreen(20, "win"));
});
