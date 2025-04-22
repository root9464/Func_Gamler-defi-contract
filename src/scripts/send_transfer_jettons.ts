import { NetworkProvider } from '@ton/blueprint';
import { Address, toNano } from '@ton/core';
import { contract_address } from '../constants/const';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const contractGamlerDefi = provider.open(
    ContractGamlerDefi.createFromAddress(Address.parse(contract_address)), // адресс жетон валета (моего не смарта)
  );

  await contractGamlerDefi.sendTransferJettons(
    provider.sender(),
    Address.parse('0QAYRw04JzUo1IEK6TL6vKfos66gsdN6vUFfJeA3OOjOfDPG'), // адресс валета (не жетон валета)
    toNano('0.2'),
  );

  await provider.waitForDeploy(contractGamlerDefi.address);

  // run methods on `contractGamlerDefi`
}
