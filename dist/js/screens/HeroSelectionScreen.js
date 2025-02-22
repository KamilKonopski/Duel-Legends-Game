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
export default class HeroSelectionScreen {
    static createHeroSelectionScreen() {
        return __awaiter(this, void 0, void 0, function* () {
            const heroes = yield fetchHeroesData();
            const heroSelection = document.createElement("section");
            heroSelection.classList.add("game");
            heroSelection.dataset.screen = "2";
            heroSelection.innerHTML = `
    <h2 class="mt-[100px] text-4xl font-ui">Choose Your Hero!</h2>
    `;
            heroSelection.appendChild(this.createHeroChoiceContainer(heroes));
            heroSelection.appendChild(this.createPlayButton());
            return heroSelection;
        });
    }
    static createHeroChoiceContainer(heroes) {
        const heroChoiceContainer = document.createElement("div");
        heroChoiceContainer.classList.add("hero-container");
        heroes.forEach((hero) => heroChoiceContainer.appendChild(this.createHeroChoice(hero)));
        return heroChoiceContainer;
    }
    static createHeroChoice(hero) {
        const heroChoice = document.createElement("div");
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
    static createPlayButton() {
        const playButton = document.createElement("button");
        playButton.classList.add("mb-32", "btn", "glow");
        playButton.innerText = "PLAY";
        return playButton;
    }
}
