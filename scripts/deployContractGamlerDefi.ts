import { toNano } from '@ton/core';
import { ContractGamlerDefi } from '../wrappers/ContractGamlerDefi';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const contractGamlerDefi = provider.open(ContractGamlerDefi.createFromConfig({}, await compile('ContractGamlerDefi')));

    await contractGamlerDefi.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(contractGamlerDefi.address);

    // run methods on `contractGamlerDefi`
}
