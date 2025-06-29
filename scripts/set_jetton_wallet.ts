import { NetworkProvider } from '@ton/blueprint';
import { Address } from '@ton/core';
import { contract_address } from '../constants/const';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const new_jetton_wallet_address = 'kQB_m_HfpNjCtGsDPDp0CAWe9ZEcFWIveYcBIUFHMN7geWli';

  const contractGamlerDefi = provider.open(ContractGamlerDefi.createFromAddress(Address.parse(contract_address)));

  await contractGamlerDefi.sendSetJettonWalletAddress(provider.sender(), Address.parse(new_jetton_wallet_address));

  await provider.waitForDeploy(contractGamlerDefi.address);

  // run methods on `contractGamlerDefi`
}
