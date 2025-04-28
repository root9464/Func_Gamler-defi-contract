import { NetworkProvider } from '@ton/blueprint';
import { Address } from '@ton/core';
import { contract_address } from '../constants/const';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const new_jetton_wallet_address = 'kQBaxDM-Bu8HeWW_CTO5QFs5gBdbasE1lm-J7KP9p4Slso1G';

  const contractGamlerDefi = provider.open(ContractGamlerDefi.createFromAddress(Address.parse(contract_address)));

  await contractGamlerDefi.sendSetJettonWalletAddress(provider.sender(), Address.parse(new_jetton_wallet_address));

  await provider.waitForDeploy(contractGamlerDefi.address);

  // run methods on `contractGamlerDefi`
}
