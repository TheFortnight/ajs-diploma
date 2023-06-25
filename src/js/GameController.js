import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';
import Bowman from './characters/bowman';
import Swordsman from './characters/swordsman';
import Magician from './characters/magician';
import Daemon from './characters/daemon';
import Undead from './characters/undead';
import Vampire from './characters/vampire';
import GamePlay from './GamePlay';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.availableMoves;
    this.selectedCell;
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
   
    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  getHintDetails = (position) => {
    const level = position.getAttribute('level');
    const attack = position.getAttribute('attack');
    const defence = position.getAttribute('defence');
    const health = position.getAttribute('health');
    return `\u{1F396}${level} \u{2694}${attack} \u{1F6E1}${defence} \u{2764}${health}`
  }

  onCellClick = (index) => {
    
    let cellsArr = document.querySelectorAll('.cell');
    cellsArr = Array.from(cellsArr);
    let selectedElement = cellsArr.findIndex(element => element.classList.contains('selected'));
    const isPlayersMove = this.gamePlay.getMove();
    if (isPlayersMove) {
    if (selectedElement > -1) this.gamePlay.deselectCell(selectedElement);
    if (cellsArr[index].querySelector('.swordsman') || cellsArr[index].querySelector('.magician')|| cellsArr[index].querySelector('.bowman')) {
      this.gamePlay.selectCell(index);
    } else {
          GamePlay.showError('No player character in this cell!');
    }
  }
    // TODO: react to click
  }

  getAvailableMoves(index, character) {
    const boardSize = this.gamePlay.boardSize;
    let count;
    let cells = [];
    if(character === 'magician' || character === 'daemon') count = 1;
    if(character === 'swordsman' || character === 'undead') count = 3;
    if(character === 'bowman' || character === 'vampire') count = 2;
    for(let i = 1; i<count+1; i++) {
      cells.push(index+i);
      cells.push(index-i);
      cells.push(index+(boardSize*i));
      cells.push(index+(boardSize*i)+i);
      cells.push(index+(boardSize*i)-i);
      cells.push(index-(boardSize*i));
      cells.push(index-(boardSize*i)+i);
      cells.push(index-(boardSize*i)-i);
    }
    console.log('CHAR: '+character+'; CELLS: '+cells);
    this.availableCells = cells;
  }

  onCellEnter = (index) => {
        
    let cellsArr = document.querySelectorAll('.cell');
    cellsArr = Array.from(cellsArr);
   
    if (cellsArr[index].querySelector('.character')) {
      const position = cellsArr[index].querySelector('.character');
      const hint = this.getHintDetails(position);
      this.gamePlay.showCellTooltip(hint, index);
    }
    if (cellsArr.find(element => element.classList.contains('selected')) && cellsArr.findIndex(element => element.classList.contains('selected')) != index) {
      const selectedCell = cellsArr.findIndex(element => element.classList.contains('selected'));
      const currCellContent = cellsArr[index];
      const selectedChar = ['bowman', 'swordsman', 'magician'].find(char => cellsArr[selectedCell].querySelector('.'+char));
      const availableCells = this.availableMoves(selectedCell, selectedChar);
      
      if (['bowman', 'swordsman', 'magician'].find(element => currCellContent.querySelector('.'+element))) {
        this.gamePlay.setCursor(('pointer'));
        return;
      }
      if (!(currCellContent.querySelector('.character')) && availableCells.includes(index)) {
        this.gamePlay.setCursor(('pointer'));
        this.gamePlay.selectCell(index, 'green');
        return;
      }
      if (['.vampire', '.undead', '.daemon'].find(char => currCellContent.querySelector(char)) && nearCells.includes(index)) {
        this.gamePlay.setCursor(('crosshair'));
        this.gamePlay.selectCell(index, 'red');
        return
      } else {
        console.log('ELSE')
        this.gamePlay.setCursor(('not-allowed'));
      }
    }
  }

  onCellLeave = (index) => {
    let cellsArr = document.querySelectorAll('.cell');
    cellsArr = Array.from(cellsArr);
    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.setCursor(('auto'));
    
    if(!cellsArr[index].classList.contains('selected-yellow')) {
      this.gamePlay.deselectCell(index);
    }
    
  }
}
