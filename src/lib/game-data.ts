import type { CharacterName, LevelInfo } from "../types/game";

export const levels: LevelInfo[] = [
  { id: 1, keyID: "level-1", level: 1, difficulty: "easy", image: "/boards/board_1.jpg", name: "The busy city" },
  { id: 2, keyID: "level-2", level: 2, difficulty: "easy", image: "/boards/board_2.jpg", name: "The seaside" },
  { id: 3, keyID: "level-3", level: 3, difficulty: "normal", image: "/boards/board_3.jpg", name: "The grand adventure" },
  { id: 4, keyID: "level-4", level: 4, difficulty: "normal", image: "/boards/board_4.jpg", name: "The crowded town" },
];

export const characters: Array<{
  name: CharacterName;
  label: string;
  image: string;
}> = [
  { name: "waldo", label: "Waldo", image: "/icons/waldo_icon.png" },
  { name: "wilma", label: "Wilma", image: "/icons/wilma_icon.png" },
  { name: "odlaw", label: "Odlaw", image: "/icons/odlaw_icon.png" },
  { name: "wizard", label: "Wizard", image: "/icons/wizard_icon.png" },
];
