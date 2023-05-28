/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  console.log('CALC FIELDS')
  const x = boardSize
  if (boardSize !== 8) return;
  if (index === 0) return 'top-left';
  if (index === x - 1) return 'top-right';
  if (index === x * x - 1) return 'bottom-right';
  if (index === x * x - x) return 'bottom-left';
  if (index > 0 && index < (x - 1)) return 'top';
  if (index > (x * x - x) && index < x * x - 1) return 'bottom';
  let leftCells = [];
  let rightCells = [];
  for (let i=x; i<(x*x-x); i+=x) {
  leftCells.push(i);
  }
  for (let i=2*x-1; i<(x*x-1); i+=x) {
    rightCells.push(i);
  }
  if (leftCells.findIndex(el => el == index) > -1) return 'left';
  if (rightCells.findIndex(el => el == index) > -1) return 'right';
  else return 'center';
  // TODO: ваш код будет тут
  // return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
