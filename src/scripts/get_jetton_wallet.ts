import { NetworkProvider } from '@ton/blueprint';
import { Address } from '@ton/core';
import { contract_address } from '../constants/const';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const contractGamlerDefi = provider.open(ContractGamlerDefi.createFromAddress(Address.parse(contract_address)));

  const result = await contractGamlerDefi.getJettonWalletAddress();

  console.log('\n[JETTON WALLET ADDRESS] -->', result);
}
