/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
import Team from './Team';

export function* characterGenerator(allowedTypes, maxLevel) {
  function generateChar(types, maxLev) {
    const index = Math.round((Math.random() * (types.length - 1)));

    const Type = types[index];
    const level = Math.round(Math.random() * (maxLev - 1) + 1);
    return new Type(level);
  }
  while (true) {
    yield generateChar(allowedTypes, maxLevel);
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const charGen = characterGenerator(allowedTypes, maxLevel);
  let i = 0;
  const chars = [];
  while (i <= characterCount) {
    chars.push(charGen.next().value);
    i += 1;
  }

  return new Team(chars);
  // TODO: write logic here
}
