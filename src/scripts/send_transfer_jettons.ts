import { NetworkProvider } from '@ton/blueprint';
import { Address, toNano } from '@ton/core';
import { contract_address } from '../constants/const';
import { createJettonsDictionary } from '../functions/serealize';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const contractGamlerDefi = provider.open(
    ContractGamlerDefi.createFromAddress(Address.parse(contract_address)), // адресс смарта
  );

  const dictionary = createJettonsDictionary([
    { address: Address.parse('0QAYRw04JzUo1IEK6TL6vKfos66gsdN6vUFfJeA3OOjOfDPG'), amount: toNano('0.1') },
    { address: Address.parse('0QD-q5a1Z3kYfDBgYUcUX_MigynA5FuiNx0i5ySt37rfrFeP'), amount: toNano('0.2') },
    { address: Address.parse('0QC9vm__DOB74-HkN9pxfMDMLYT4YlDPYj54dZ9yqvsgXYpZ'), amount: toNano('0.3') },
    { address: Address.parse('0QC3PUCoxBdLfOmO8xFQ84TGFPQUatxvvRsSAODKEvjbb4OS'), amount: toNano('0.4') },
    { address: Address.parse('0QCmnBX_oEJ9kkeKV6uG9ifl-uEdC_SKGN_Q1EwYKh171brP'), amount: toNano('0.5') },
  ]);

  await contractGamlerDefi.sendTransferJettons(provider.sender(), dictionary);

  await provider.waitForDeploy(contractGamlerDefi.address);

  // run methods on `contractGamlerDefi`
}
