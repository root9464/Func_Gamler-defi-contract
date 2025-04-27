import { compile, NetworkProvider } from '@ton/blueprint';
import { Address, Cell, toNano } from '@ton/core';
import {
  admin_address,
  jetton_master_address,
  jetton_master_code,
  jetton_master_data,
  nullable_jetton_wallet_address,
} from '../constants/const';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';

export async function run(provider: NetworkProvider) {
  const contractGamlerDefi = provider.open(
    ContractGamlerDefi.createFromConfig(
      {
        admin_address: Address.parse(admin_address),
        jetton_wallet_address: Address.parse(nullable_jetton_wallet_address),

        jetton_master_address: Address.parse(jetton_master_address),
        jetton_master_code: Cell.fromBase64(jetton_master_code),
        jetton_master_data: Cell.fromBase64(jetton_master_data),
      },
      await compile('ContractGamlerDefi'),
    ),
  );

  await contractGamlerDefi.sendDeploy(provider.sender(), toNano('0.05'));

  await provider.waitForDeploy(contractGamlerDefi.address);

  // run methods on `contractGamlerDefi`
}
