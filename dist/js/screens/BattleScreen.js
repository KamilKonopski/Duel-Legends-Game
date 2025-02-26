var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchHeroesData } from "../services/fetchHeroesData.js";
import Hero from "../logic/Hero.js";
export default class BattleScreen {
    static createBattleScreen() {
        return __awaiter(this, void 0, void 0, function* () {
            const heroes = yield fetchHeroesData();
            const selectedHero = heroes.find((hero) => hero.id === 4);
            const battle = document.createElement("section");
            battle.classList.add("game");
            battle.style.justifyContent = "normal";
            battle.dataset.screen = "3";
            battle.appendChild(this.createBattleHeroesContainer(selectedHero, heroes[0]));
            battle.appendChild(this.createControlPanel());
            return battle;
        });
    }
    static createBattleHeroesContainer(firstSelectedHero, secondSelectedHero) {
        const battleHeroesContainer = document.createElement("div");
        battleHeroesContainer.classList.add("w-full", "h-[70vh]", "flex", "items-center", "justify-between", "px-10");
        battleHeroesContainer.appendChild(this.choosenHero(firstSelectedHero, "Player 1"));
        battleHeroesContainer.appendChild(this.choosenHero(secondSelectedHero, "Computer"));
        return battleHeroesContainer;
    }
    static choosenHero(choosenHero, playerName) {
        const choosenHeroContainer = document.createElement("div");
        choosenHeroContainer.classList.add("w-[200px]", "h-[400px]", "text-[12px]");
        const playerNameText = document.createElement("span");
        playerNameText.classList.add("block", "text-center", "text-[15px]", "mb-2", "font-ui", "uppercase");
        playerNameText.innerText = playerName;
        const healthBarContainer = document.createElement("div");
        healthBarContainer.classList.add("w-[200px]", "h-[25px]", "border", "border-border", "mt-5");
        const manaBarContainer = document.createElement("div");
        manaBarContainer.classList.add("w-[200px]", "h-[25px]", "border", "border-border", "mt-3");
        healthBarContainer.appendChild(this.createBar("var(--color-hp)", "100%"));
        manaBarContainer.appendChild(this.createBar("var(--color-mana)", "100%"));
        choosenHeroContainer.appendChild(playerNameText);
        choosenHeroContainer.appendChild(Hero.createHero(choosenHero, true));
        choosenHeroContainer.appendChild(healthBarContainer);
        choosenHeroContainer.appendChild(manaBarContainer);
        return choosenHeroContainer;
    }
    static createBar(bgColor, fillBar) {
        const bar = document.createElement("div");
        bar.style.height = "100%";
        bar.style.width = fillBar;
        bar.style.backgroundColor = bgColor;
        return bar;
    }
    static createControlPanel() {
        const controlPanelContainer = document.createElement("div");
        controlPanelContainer.classList.add("bg-fight-bg", "w-[800px]", "h-[100px]", "rounded-lg", "mt-5", "flex", "justify-around", "items-center", "z-40");
        function buttonFunction() {
            console.log("button action");
        }
        controlPanelContainer.appendChild(this.createControlButton("Attack", buttonFunction, "var(--color-attack)"));
        controlPanelContainer.appendChild(this.createControlButton("Defence", buttonFunction, "var(--color-defense)"));
        controlPanelContainer.appendChild(this.createControlButton("Ability", buttonFunction, "var(--color-ability)"));
        controlPanelContainer.appendChild(this.createControlButton("Ultimate", buttonFunction));
        return controlPanelContainer;
    }
    static createControlButton(buttonName, buttonAction, buttonColor) {
        const controlButton = document.createElement("button");
        controlButton.classList.add("btn", "glow", "bordered-letter");
        controlButton.style.color = buttonColor;
        controlButton.innerText = buttonName;
        controlButton.addEventListener("click", buttonAction);
        return controlButton;
    }
}
