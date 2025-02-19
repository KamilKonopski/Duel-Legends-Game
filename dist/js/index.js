import GameOverScreen from "./screens/GameOverScreen.js";
import MainMenuScreen from "./screens/MainMenuScreen.js";
const gameContainer = document.querySelector(".game-container");
function render() {
    gameContainer.appendChild(MainMenuScreen.createMainMenuScreen());
}
render();
const startButton = document.getElementById("btn-start");
startButton.addEventListener("click", () => {
    gameContainer.innerHTML = "";
    gameContainer.appendChild(GameOverScreen.createGameOverScreen(20, "win"));
});
