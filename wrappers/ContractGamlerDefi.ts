import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type ContractGamlerDefiConfig = {};

export function contractGamlerDefiConfigToCell(config: ContractGamlerDefiConfig): Cell {
    return beginCell().endCell();
}

export class ContractGamlerDefi implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

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
}
