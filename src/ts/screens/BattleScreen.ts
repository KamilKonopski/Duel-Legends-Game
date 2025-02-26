import { HeroType } from "../types/hero";

import { fetchHeroesData } from "../services/fetchHeroesData.js";

import Hero from "../logic/Hero.js";

export default class BattleScreen {
  static async createBattleScreen() {
    const heroes: HeroType[] = await fetchHeroesData();

    const selectedHero = heroes.find((hero) => hero.id === 4);

    const battle = document.createElement("section") as HTMLDivElement;
    battle.classList.add("game");
    battle.style.justifyContent = "normal";
    battle.dataset.screen = "3";

    battle.appendChild(
      this.createBattleHeroesContainer(selectedHero, heroes[0])
    );
    battle.appendChild(this.createControlPanel());

    return battle;
  }

  private static createBattleHeroesContainer(
    firstSelectedHero: HeroType,
    secondSelectedHero: HeroType
  ) {
    const battleHeroesContainer = document.createElement(
      "div"
    ) as HTMLDivElement;

    battleHeroesContainer.classList.add(
      "w-full",
      "h-[70vh]",
      "flex",
      "items-center",
      "justify-between",
      "px-10"
    );

    battleHeroesContainer.appendChild(
      this.choosenHero(firstSelectedHero, "Player 1")
    );
    battleHeroesContainer.appendChild(
      this.choosenHero(secondSelectedHero, "Computer")
    );

    return battleHeroesContainer;
  }

  private static choosenHero(choosenHero: HeroType, playerName: string) {
    const choosenHeroContainer = document.createElement(
      "div"
    ) as HTMLDivElement;
    choosenHeroContainer.classList.add("w-[200px]", "h-[400px]", "text-[12px]");

    const playerNameText = document.createElement("span") as HTMLSpanElement;

    playerNameText.classList.add(
      "block",
      "text-center",
      "text-[15px]",
      "mb-2",
      "font-ui",
      "uppercase"
    );

    playerNameText.innerText = playerName;

    const healthBarContainer = document.createElement("div") as HTMLDivElement;
    healthBarContainer.classList.add(
      "w-[200px]",
      "h-[25px]",
      "border",
      "border-border",
      "mt-5"
    );
    const manaBarContainer = document.createElement("div") as HTMLDivElement;
    manaBarContainer.classList.add(
      "w-[200px]",
      "h-[25px]",
      "border",
      "border-border",
      "mt-3"
    );
    healthBarContainer.appendChild(this.createBar("var(--color-hp)", "100%"));
    manaBarContainer.appendChild(this.createBar("var(--color-mana)", "100%"));

    choosenHeroContainer.appendChild(playerNameText);
    choosenHeroContainer.appendChild(Hero.createHero(choosenHero, true));
    choosenHeroContainer.appendChild(healthBarContainer);
    choosenHeroContainer.appendChild(manaBarContainer);

    return choosenHeroContainer;
  }

  private static createBar(bgColor: string, fillBar: string) {
    const bar = document.createElement("div") as HTMLDivElement;
    bar.style.height = "100%";
    bar.style.width = fillBar;
    bar.style.backgroundColor = bgColor;
    return bar;
  }

  private static createControlPanel() {
    const controlPanelContainer = document.createElement(
      "div"
    ) as HTMLDivElement;
    controlPanelContainer.classList.add(
      "bg-fight-bg",
      "w-[800px]",
      "h-[100px]",
      "rounded-lg",
      "mt-5",
      "flex",
      "justify-around",
      "items-center",
      "z-40"
    );

    function buttonFunction() {
      console.log("button action");
    }

    controlPanelContainer.appendChild(
      this.createControlButton("Attack", buttonFunction, "var(--color-attack)")
    );
    controlPanelContainer.appendChild(
      this.createControlButton(
        "Defence",
        buttonFunction,
        "var(--color-defense)"
      )
    );
    controlPanelContainer.appendChild(
      this.createControlButton(
        "Ability",
        buttonFunction,
        "var(--color-ability)"
      )
    );
    controlPanelContainer.appendChild(
      this.createControlButton("Ultimate", buttonFunction)
    );

    return controlPanelContainer;
  }

  private static createControlButton(
    buttonName: string,
    buttonAction: () => void,
    buttonColor?: string
  ) {
    const controlButton = document.createElement("button") as HTMLButtonElement;
    controlButton.classList.add("btn", "glow", "bordered-letter");
    controlButton.style.color = buttonColor;
    controlButton.innerText = buttonName;
    controlButton.addEventListener("click", buttonAction);

    return controlButton;
  }
}
