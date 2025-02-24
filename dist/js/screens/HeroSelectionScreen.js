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
export default class HeroSelectionScreen {
    static createHeroSelectionScreen() {
        return __awaiter(this, void 0, void 0, function* () {
            const heroes = yield fetchHeroesData();
            const heroSelection = document.createElement("section");
            heroSelection.classList.add("game");
            heroSelection.dataset.screen = "2";
            heroSelection.innerHTML = `
    <h2 class="mt-[100px] text-4xl">Choose Your Hero!</h2>
    `;
            heroSelection.appendChild(this.createHeroChoiceContainer(heroes));
            heroSelection.appendChild(this.createPlayButton());
            return heroSelection;
        });
    }
    static createHeroChoiceContainer(heroes) {
        const heroChoiceContainer = document.createElement("div");
        heroChoiceContainer.classList.add("hero-container");
        heroes.forEach((hero) => heroChoiceContainer.appendChild(Hero.createHero(hero)));
        return heroChoiceContainer;
    }
    static createPlayButton() {
        const playButton = document.createElement("button");
        playButton.classList.add("mb-32", "btn", "glow");
        playButton.innerText = "PLAY";
        return playButton;
    }
}
