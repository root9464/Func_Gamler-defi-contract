import { NetworkProvider } from '@ton/blueprint';
import { Address } from '@ton/core';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const contract_address = 'EQDQCBAxtjhAeA0D0q5Qi4uHZJytaCU7QbZv8uZWsabS5Yab';
  const jetton_wallet_address = '0:b5c703383818bfcda64b60d1723a5706ee0c6b9f40ab0509f3d9a340a6d0ecf5';

  const contractGamlerDefi = provider.open(ContractGamlerDefi.createFromAddress(Address.parse(contract_address)));

  await contractGamlerDefi.sendSetJettonWalletAddress(provider.sender(), Address.parse(jetton_wallet_address));

  await provider.waitForDeploy(contractGamlerDefi.address);

  // run methods on `contractGamlerDefi`
}
