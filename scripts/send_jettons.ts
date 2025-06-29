import { NetworkProvider } from '@ton/blueprint';
import { Address, toNano } from '@ton/core';
import { createJettonsDictionary } from '../functions/serealize';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const contractGamlerDefi = provider.open(
    ContractGamlerDefi.createFromAddress(Address.parse('EQDr-DO4VlkvWbHQVQm1ujVjRb1SF7pjXSQPFsfkSFeIc49W')), // адресс жетон валета (моего не смарта)
  );

  const dictionary = createJettonsDictionary([
    { address: Address.parse('UQA_rGxGSOngCzBbPlQ69GH9Co0qYGeNWVixVi87cDgWj9CY'), amount: toNano('0.2') },
  ]);

  await contractGamlerDefi.sendAcceptJettons(provider.sender(), toNano('0.5'), dictionary);

  await provider.waitForDeploy(contractGamlerDefi.address);

  // run methods on `contractGamlerDefi`
}
