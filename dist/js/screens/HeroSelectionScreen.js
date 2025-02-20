import { heroesData } from "../../../data/heroes.js";
export default class HeroSelectionScreen {
    static createHeroSelectionScreen() {
        const heroSelection = document.createElement("section");
        heroSelection.classList.add("game");
        heroSelection.innerHTML = `
    <h2 class="mt-[100px] text-4xl font-ui">Choose Your Hero!</h2>
    `;
        heroSelection.appendChild(this.createHeroChoiceContainer());
        heroSelection.appendChild(this.createPlayButton());
        return heroSelection;
    }
    static createHeroChoiceContainer() {
        const heroChoiceContainer = document.createElement("div");
        const heroes = heroesData;
        for (let i = 1; i <= heroes.length; i++) {
            heroChoiceContainer.appendChild(this.createHeroChoice());
        }
        return heroChoiceContainer;
    }
    static createHeroChoice() {
        const heroChoice = document.createElement("div");
        heroChoice.innerHTML = `
    <div>
      <span>Sir Leon</span>
      <span>Knight 🛡⚔</span>
    </div>
    <div>
    <span>Hp: 1200</span>
    <span>Mana: 500</span>
    </div>
    <div>
    <span>Attack: Sword Strike ⚔</span>
    <span>Defence: Shield Block 🛡</span>
    <span>Skill: Critical Slash 💥</span>
    <span>ULT: Divine Protection ✨</span>
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
