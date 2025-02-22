import { fetchHeroesData } from "../services/fetchHeroesData.js";
import { HeroType } from "../types/hero";

export default class HeroSelectionScreen {
  static async createHeroSelectionScreen() {
    const heroes: HeroType[] = await fetchHeroesData();

    const heroSelection = document.createElement("section") as HTMLDivElement;
    heroSelection.classList.add("game");
    heroSelection.dataset.screen = "2";
    heroSelection.innerHTML = `
    <h2 class="mt-[100px] text-4xl font-ui">Choose Your Hero!</h2>
    `;

    heroSelection.appendChild(this.createHeroChoiceContainer(heroes));
    heroSelection.appendChild(this.createPlayButton());

    return heroSelection;
  }

  private static createHeroChoiceContainer(heroes: HeroType[]) {
    const heroChoiceContainer = document.createElement("div") as HTMLDivElement;
    heroChoiceContainer.classList.add("hero-container");

    heroes.forEach((hero) =>
      heroChoiceContainer.appendChild(this.createHeroChoice(hero))
    );

    return heroChoiceContainer;
  }

  private static createHeroChoice(hero: HeroType) {
    const heroChoice = document.createElement("div") as HTMLDivElement;
    heroChoice.classList.add("hero", "glow", "bordered-letter");
    heroChoice.style.backgroundImage = `url(${hero.heroImage})`;

    heroChoice.innerHTML = `
    <div class="mb-1.5 text-[14px] flex flex-col items-center border-y border-border w-full">
      <span class="uppercase font-bold">${hero.name}</span>
      <span>${hero.heroClass}</span>
    </div>
    <div class="flex w-full justify-between">
    <span class="border-y border-border">Hp: ${hero.healthPoints}</span>
    <span class="border-y border-border">Mana: ${hero.mana}</span>
    </div>
    <div class="flex flex-col items-center w-full mt-3 mb-2">
    <span class="text-attack">Attack: ${hero.abilities[0].name}</span>
    <span class="text-defense">Defence: ${hero.abilities[1].name}</span>
    <span class="text-ability">Skill: ${hero.abilities[2].name}</span>
    <span class="text-standard">ULT: ${hero.ultimate.name}</span>
    </div>
    `;

    return heroChoice;
  }

  private static createPlayButton() {
    const playButton = document.createElement("button") as HTMLButtonElement;
    playButton.classList.add("mb-32", "btn", "glow");
    playButton.innerText = "PLAY";

    return playButton;
  }
}
