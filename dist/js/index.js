var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import MainMenuScreen from "./screens/MainMenuScreen.js";
// import HeroSelectionScreen from "./screens/HeroSelectionScreen.js";
import BattleScreen from "./screens/BattleScreen.js";
// import GameOverScreen from "./screens/GameOverScreen.js";
const gameContainer = document.querySelector(".game-container");
// function render() {
//   gameContainer.appendChild(MainMenuScreen.createMainMenuScreen());
// }
// async function render() {
//   gameContainer.appendChild(
//     await HeroSelectionScreen.createHeroSelectionScreen()
//   );
// }
function render() {
    return __awaiter(this, void 0, void 0, function* () {
        gameContainer.appendChild(yield BattleScreen.createBattleScreen());
    });
}
// function render() {
//   gameContainer.appendChild(GameOverScreen.createGameOverScreen(20, "win"));
// }
render();
