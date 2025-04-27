import { compile, NetworkProvider } from '@ton/blueprint';
import { Address, Cell, toNano } from '@ton/core';
import { admin_address, jetton_minter_address, jetton_minter_code, nullable_jetton_wallet_address } from '../constants/const';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const contractGamlerDefi = provider.open(
    ContractGamlerDefi.createFromConfig(
      {
        admin_address: Address.parse(admin_address),
        jetton_wallet_address: Address.parse(nullable_jetton_wallet_address),
        minter_code: Cell.fromBase64(jetton_minter_code),
        jetton_minter_address: Address.parse(jetton_minter_address),
      },
      await compile('ContractGamlerDefi'),
    ),
  );

  await contractGamlerDefi.sendDeploy(provider.sender(), toNano('0.05'));

  await provider.waitForDeploy(contractGamlerDefi.address);

  // run methods on `contractGamlerDefi`
}
