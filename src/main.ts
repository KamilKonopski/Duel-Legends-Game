import "./index.css";

import Game from "./logic/Game";

import { fetchHeroesData } from "./services/fetchHeroesData";

const game = new Game(await fetchHeroesData());

game.startGame();
