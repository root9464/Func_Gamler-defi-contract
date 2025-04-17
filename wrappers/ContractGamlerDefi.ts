import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode, toNano } from '@ton/core';

export type ContractGamlerDefiConfig = {
  admin_address: Address;
  jetton_wallet_address: Address;
};

export function contractGamlerDefiConfigToCell(config: ContractGamlerDefiConfig): Cell {
  return beginCell().storeAddress(config.admin_address).storeAddress(config.jetton_wallet_address).endCell();
}

export class ContractGamlerDefi implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell },
  ) {}

  static createFromAddress(address: Address) {
    return new ContractGamlerDefi(address);
  }

  static createFromConfig(config: ContractGamlerDefiConfig, code: Cell, workchain = 0) {
    const data = contractGamlerDefiConfigToCell(config);
    const init = { code, data };
    return new ContractGamlerDefi(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }

  //* functions
  async sendSetJettonWalletAddress(provider: ContractProvider, via: Sender, new_address: Address) {
    await provider.internal(via, {
      value: toNano('0.05'),
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeUint(0x9486490, 32).storeAddress(new_address).endCell(),
    });
  }

  async sendAcceptJettons(provider: ContractProvider, via: Sender, to_address: Address, jettons_amount: bigint) {
    await provider.internal(via, {
      value: jettons_amount,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(0xf8a7ea5, 32)
        .storeUint(Math.floor(Date.now() / 1000), 64)
        .storeCoins(toNano(10))
        .storeAddress(to_address)
        .storeUint(0, 2)
        .storeUint(0, 1)
        .storeCoins(jettons_amount)
        .endCell(),
    });
  }
}
