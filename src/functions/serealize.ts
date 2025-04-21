import { Address, Dictionary, DictionaryValue } from '@ton/core';
import { sha256_sync } from '@ton/crypto';

export function toSha256(s: string): bigint {
  return BigInt('0x' + sha256_sync(s).toString('hex'));
}

const jettonsDictionaryValue: DictionaryValue<bigint> = {
  serialize: (src, builder) => {
    builder.storeCoins(src);
  },
  parse: (src) => {
    return src.loadCoins();
  },
};

export const createJettonsDictionary = (entries: { address: Address; amount: bigint } | { address: Address; amount: bigint }[]) => {
  const dictionary = Dictionary.empty(Dictionary.Keys.Address(), jettonsDictionaryValue);
  const entriesArray = Array.isArray(entries) ? entries : [entries];

  for (const entry of entriesArray) {
    dictionary.set(entry.address, entry.amount);
  }
  return dictionary;
};
