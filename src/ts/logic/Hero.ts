import { HeroType } from "../types/hero";

export default class Hero {
  static createHero(hero: HeroType, isNonClickable: boolean) {
    const heroChoice = document.createElement("div") as HTMLDivElement;
    heroChoice.classList.add(
      "hero",
      "glow",
      "bordered-letter",
      ...(isNonClickable ? ["non-clickable"] : [])
    );
    heroChoice.style.backgroundImage = `url(${hero.heroImage})`;
    heroChoice.addEventListener("click", () => this.selectedHero(hero));

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

  static selectedHero(hero: HeroType) {
    return hero.id;
  }
}
