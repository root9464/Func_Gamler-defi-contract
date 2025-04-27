import { beginCell, Cell } from '@ton/core';
import { jetton_minter_code } from '../constants/const';

const res: Cell = beginCell().storeStringTail(jetton_minter_code).endCell();
const res2: Cell = Cell.fromBase64(jetton_minter_code);

console.log(res.toBoc().toString('base64'), '\n');
console.log(res2.toBoc().toString('base64'), '\n');
