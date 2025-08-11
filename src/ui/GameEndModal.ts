export class GameEndModal {
  modal: HTMLDivElement;
  countdown: number;
  intervalId?: number;

  constructor(result: "win" | "lose", onComplete: () => void) {
    this.modal = document.createElement("div");
    this.modal.className = "modal-backdrop";
    const content = document.createElement("div");
    content.className = "modal-content";

    const title = document.createElement("h2");
    title.textContent = result === "win" ? "Wygrałeś!" : "Przegrałeś!";
    content.appendChild(title);

    const countdownEl = document.createElement("p");
    this.countdown = 5;
    countdownEl.textContent = `Powrót do wyboru bohatera za ${this.countdown}...`;
    content.appendChild(countdownEl);

    this.intervalId = window.setInterval(() => {
      this.countdown--;
      countdownEl.textContent = `Powrót do wyboru bohatera za ${this.countdown}...`;
      if (this.countdown <= 0) {
        clearInterval(this.intervalId);
        onComplete();
        this.close();
      }
    }, 1000);

    this.modal.appendChild(content);
    document.body.appendChild(this.modal);
  }

  close() {
    this.modal.remove();
  }
}
