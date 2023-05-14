import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';
import Bowman from './characters/bowman';
import Swordsman from './characters/swordsman';
import Magician from './characters/magician';
import Daemon from './characters/daemon';
import Undead from './characters/undead';
import Vampire from './characters/vampire';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi('prairie');

    const cells1 = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];
    const cells2 = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];

    const team1 = generateTeam([Bowman, Swordsman, Magician], 2, 16);
    const team2 = generateTeam([Daemon, Undead, Vampire], 2, 16);
    const charPosistions = [];

    for (let i = 0; i < cells1.length; i++) {
      charPosistions.push(new PositionedCharacter(team1.characters[i], cells1[i]));
      charPosistions.push(new PositionedCharacter(team2.characters[i], cells2[i]));
    }

    this.gamePlay.redrawPositions(charPosistions);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
