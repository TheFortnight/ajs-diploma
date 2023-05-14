import { calcTileType } from '../src/js/utils';

test('top-left', () => {
  const result = calcTileType(0, 8);
  expect(result).toEqual('top-left');
});

test('right-left', () => {
  const result = calcTileType(7, 8);
  expect(result).toEqual('top-right');
});

test('bottom-left', () => {
  const result = calcTileType(56, 8);
  expect(result).toEqual('bottom-left');
});

test('bottom-right', () => {
  const result = calcTileType(63, 8);
  expect(result).toEqual('bottom-right');
});

test('left', () => {
  const result = calcTileType(16, 8);
  expect(result).toEqual('left');
});

test('right', () => {
  const result = calcTileType(15, 8);
  expect(result).toEqual('right');
});

test('top', () => {
  const result = calcTileType(5, 8);
  expect(result).toEqual('top');
});

test('bottom', () => {
  const result = calcTileType(60, 8);
  expect(result).toEqual('bottom');
});

test('center', () => {
  const result = calcTileType(10, 8);
  expect(result).toEqual('center');
});
