import Character from '../src/js/Character';
import Bowman from '../src/js/characters/bowman';

test('new Character', () => {
  expect(() => new Character()).toThrow('This class can only be extended');
});

test('Bowman', () => {
  const bowman = new Bowman(2);
  const templ = {
    level: 2,
    attack: 25,
    defence: 25,
    health: 50,
    type: 'bowman',
  };
  expect(bowman).toEqual(templ);
});
