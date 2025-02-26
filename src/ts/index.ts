// import MainMenuScreen from "./screens/MainMenuScreen.js";
// import HeroSelectionScreen from "./screens/HeroSelectionScreen.js";
import BattleScreen from "./screens/BattleScreen.js";
// import GameOverScreen from "./screens/GameOverScreen.js";

const gameContainer = document.querySelector(
  ".game-container"
) as HTMLDivElement;

// function render() {
//   gameContainer.appendChild(MainMenuScreen.createMainMenuScreen());
// }

// async function render() {
//   gameContainer.appendChild(
//     await HeroSelectionScreen.createHeroSelectionScreen()
//   );
// }

async function render() {
  gameContainer.appendChild(await BattleScreen.createBattleScreen());
}

// function render() {
//   gameContainer.appendChild(GameOverScreen.createGameOverScreen(20, "win"));
// }

render();
