import { HeroType } from "../types/hero";

import Hero from "../logic/Hero";

export default class HeroSelectionScreen {
  static async createHeroSelectionScreen(heroes: HeroType[]) {
    const heroSelection = document.createElement("section") as HTMLDivElement;
    heroSelection.classList.add("game");
    heroSelection.dataset.screen = "2";
    heroSelection.innerHTML = `
    <h2 class="mt-[100px] text-4xl">Choose Your Hero!</h2>
    `;

    heroSelection.appendChild(this.createHeroChoiceContainer(heroes));
    heroSelection.appendChild(this.createPlayButton());

    return heroSelection;
  }

  private static createHeroChoiceContainer(heroes: HeroType[]) {
    const heroChoiceContainer = document.createElement("div") as HTMLDivElement;
    heroChoiceContainer.classList.add("hero-container");

    heroes.forEach((hero) => {
      heroChoiceContainer.appendChild(Hero.createHero(hero, false));
    });

    return heroChoiceContainer;
  }

  private static createPlayButton() {
    const playButton = document.createElement("button") as HTMLButtonElement;
    playButton.classList.add("mb-32", "btn", "glow");
    playButton.id = "btn-play";
    playButton.innerText = "PLAY";

    return playButton;
  }
}
