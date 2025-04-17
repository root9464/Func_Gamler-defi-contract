import { compile, NetworkProvider } from '@ton/blueprint';
import { Address, toNano } from '@ton/core';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const admin_address = '0QANsjLvOX2MERlT4oyv2bSPEVc9lunSPIs5a1kPthCXydUX';
  const jetton_wallet_address = 'EQCcKc85YmbepP-9EsdBBeizEBYHJQniJrTEVoaqMZs3vodt';

  const contractGamlerDefi = provider.open(
    ContractGamlerDefi.createFromConfig(
      {
        admin_address: Address.parse(admin_address),
        jetton_wallet_address: Address.parse(jetton_wallet_address),
      },
      await compile('ContractGamlerDefi'),
    ),
  );

  await contractGamlerDefi.sendDeploy(provider.sender(), toNano('0.05'));

  await provider.waitForDeploy(contractGamlerDefi.address);

  // run methods on `contractGamlerDefi`
}
