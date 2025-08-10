import "/src/index.css";
import { Renderer } from "./ui/Renderer";

const app = document.getElementById("app");
if (!app) throw new Error("Element #app not found");

new Renderer(app).renderHeroSelect();
