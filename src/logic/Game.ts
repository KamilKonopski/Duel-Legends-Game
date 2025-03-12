import MainMenuScreen from "../screens/MainMenuScreen";
import HeroSelectionScreen from "../screens/HeroSelectionScreen";
import BattleScreen from "../screens/BattleScreen";

import { HeroType } from "../types/hero.js";
// import BattleScreen from "../screens/BattleScreen.js";
// import GameOverScreen from "../screens/GameOverScreen.js";

export default class Game {
  playerName: string;
  gameContainer: HTMLDivElement;
  heroes: HeroType[];

  constructor(heroes: HeroType[]) {
    this.playerName = "Player 1";
    this.gameContainer = document.querySelector(
      ".game-container"
    ) as HTMLDivElement;
    this.heroes = heroes;
  }

  startGame() {
    this.gameContainer.innerHTML = "";
    this.gameContainer.appendChild(MainMenuScreen.createMainMenuScreen());
  }

  async newGame() {
    this.gameContainer.innerHTML = "";
    this.gameContainer.appendChild(
      await HeroSelectionScreen.createHeroSelectionScreen(this.heroes)
    );
  }

  changePlayerName(playerName: string) {
    this.playerName = playerName;
  }

  async playBattle() {
    this.gameContainer.innerHTML = "";
    this.gameContainer.appendChild(
      await BattleScreen.createBattleScreen(this.heroes, this.playerName)
    );
  }
}

// function takeDamage(damage) {
//     const parent = healthBar.parentElement;
//     let healthBarWidth = healthBar.offsetWidth;
//     const parentWidth = parent.offsetWidth;

//   let widthInPercentage = (healthBarWidth / parentWidth) * 100;

//     const damageTaken = damage/1200 * 100;
//     healthBar.style.width = `${widthInPercentage - damageTaken}%`
//     if(widthInPercentage <= damageTaken) {
//       healthBar.style.width = "0%";
//     }
//   }
