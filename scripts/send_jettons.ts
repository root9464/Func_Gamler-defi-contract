import { NetworkProvider } from '@ton/blueprint';
import { Address, toNano } from '@ton/core';
import { createJettonsDictionary } from '../functions/serealize';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const contractGamlerDefi = provider.open(
    ContractGamlerDefi.createFromAddress(Address.parse('kQA7HB2Wn5uCUTDJqR4gsqY68v7VH1HZ5F9GkNIWFEH8oK4v')), // адресс жетон валета (моего не смарта)
  );

  const dictionary = createJettonsDictionary([
    { address: Address.parse('0QAYRw04JzUo1IEK6TL6vKfos66gsdN6vUFfJeA3OOjOfDPG'), amount: toNano('0.2') },
  ]);

  await contractGamlerDefi.sendAcceptJettons(provider.sender(), toNano('0.2'), dictionary);

  await provider.waitForDeploy(contractGamlerDefi.address);

  // run methods on `contractGamlerDefi`
}
