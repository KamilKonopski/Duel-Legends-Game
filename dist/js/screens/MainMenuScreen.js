export default class MainMenuScreen {
    static createMainMenuScreen() {
        const mainMenu = document.createElement("section");
        mainMenu.classList.add("game");
        mainMenu.innerHTML = `
    <h1 class="text-[60px] mt-[50px]">🛡️ Duel Legends ⚔️</h1>
        <button id="btn-start" class="btn glow">
            <img
            src="./assets/icons/icon_sword_shield.png"
            alt="swords with shield icon"
            />New Game
        </button>
    <footer>
        <span class="font-ui text-[18px]">
            Created by
            <a
              class="text-standard hover:text-hover duration-200"
              target="_blank"
              href="https://github.com/KamilKonopski"
              >Kamil Konopski</a
            >
        </span>
    </footer>
    `;
        return mainMenu;
    }
}
