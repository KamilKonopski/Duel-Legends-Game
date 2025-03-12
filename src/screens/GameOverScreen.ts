export default class GameOverScreen {
  static createGameOverScreen(turns: number, result: string) {
    const gameOver = document.createElement("section") as HTMLDivElement;
    gameOver.classList.add("game");
    gameOver.innerHTML = `
    <div class="mt-[100px]">
      <h2 class="text-4xl font-ui">Game is Over!</h2>
    </div>
    <div class="flex flex-col gap-6 text-center font-ui">
      <h3 class="text-4xl ${
        result === "win" ? "text-full-hp" : "text-low-hp"
      }">You ${result}!</h3>
      <span class="text-[20px]">Number of turns: ${turns}</span>
    </div>
    <div class="mb-40 flex gap-10">
      <button id="play-again-button" class="btn glow">Play Again!</button>
      <button id="leave-button" class="btn glow">Main Menu</button>
    </div>
    `;

    return gameOver;
  }
}
