import { Address, Cell, Contract, ContractProvider } from "ton-core";

export class HunterItemWrapper implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: { code: Cell, data: Cell }
    ) { }

    async getOwner(provider: ContractProvider) {
        const { stack } = await provider.get("owner", []);
        return {
            owner: stack.readAddress(),
        };
    }

    async getBasicInfo(provider: ContractProvider) {
        const { stack } = await provider.get("getBasicInfo", []);
        return {
            isJoined: stack.readBoolean(),
            walletAddr: stack.readAddress()
        };
    }
}