import GameController from '../src/js/GameController';
console.log('GAME CONTROL: '+typeof GameController);

const gameController = new GameController();
const element = document.createElement('element');
element.setAttribute('level', 1);
element.setAttribute('attack', 40);
element.setAttribute('defence', 20);
element.setAttribute('health', 50);

test('charInfo', () => {
    const result = gameController.getHintDetails(element);
    expect(result).toEqual(`\u{1F396}1 \u{2694}40 \u{1F6E1}20 \u{2764}50`);
  });