import { compile, NetworkProvider } from '@ton/blueprint';
import { Address, toNano } from '@ton/core';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const admin_address = '0x0000000000000000000000000000000000000000';
  const jetton_wallet_address = '0x0000000000000000000000000000000000000000';

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
