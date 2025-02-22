var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const fetchHeroesData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("../../../data/heroes.json");
        if (!response.ok) {
            throw new Error("Failed to load heroes data");
        }
        const heroes = yield response.json();
        return heroes;
    }
    catch (error) {
        console.error("Error fetching hero data:", error);
        return [];
    }
});
