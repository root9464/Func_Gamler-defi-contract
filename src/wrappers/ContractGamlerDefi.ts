import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Dictionary, Sender, SendMode, toNano } from '@ton/core';
import { contract_address } from '../constants/const';

export type ContractGamlerDefiConfig = {
  admin_address: Address;
  jetton_wallet_address: Address;

  jetton_master_address: Address;
  jetton_master_code: Cell;
  jetton_master_data: Cell;
};

export function contractGamlerDefiConfigToCell(config: ContractGamlerDefiConfig): Cell {
  return beginCell()
    .storeAddress(config.admin_address)
    .storeAddress(config.jetton_wallet_address)

    .storeAddress(config.jetton_master_address)
    .storeRef(config.jetton_master_code)
    .storeRef(config.jetton_master_data)
    .endCell();
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

  //* setters
  async sendSetJettonWalletAddress(provider: ContractProvider, via: Sender, new_address: Address) {
    await provider.internal(via, {
      value: toNano('0.05'),
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeUint(0x9486490, 32).storeUint(0, 64).storeAddress(new_address).endCell(),
    });
  }

  async sendAcceptJettons(provider: ContractProvider, via: Sender, jettons_amount: bigint, dictionary: Dictionary<Address, bigint>) {
    await provider.internal(via, {
      value: toNano('0.4'),
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(0xf8a7ea5, 32)
        .storeUint(Math.floor(Date.now() / 1000), 64)
        .storeCoins(jettons_amount)
        .storeAddress(Address.parse(contract_address)) // адресс смарта
        .storeUint(0, 2) // response address -- null
        .storeUint(0, 1)
        .storeCoins(toNano(0.1))
        .storeBit(1)
        .storeRef(beginCell().storeDict(dictionary).endCell())
        .endCell(),
    });
  }

  async sendTransferJettons(provider: ContractProvider, via: Sender, dictionary?: Dictionary<Address, bigint>) {
    await provider.internal(via, {
      value: toNano('0.1'),
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeUint(0xfba77a9, 32).storeUint(0, 64).storeDict(dictionary).endCell(),
    });
  }

  async sendWithdrawFunds(provider: ContractProvider, via: Sender) {
    await provider.internal(via, {
      value: toNano('0.05'),
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeUint(0x456ab, 32).storeUint(0, 64).endCell(),
    });
  }

  //* getters
  async getJettonWalletAddress(provider: ContractProvider): Promise<Address | null> {
    const result = await provider.get('get_jetton_wallet_address', []);
    return result.stack.readAddress();
  }
}
