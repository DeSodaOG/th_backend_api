import { Address, Cell, Contract, ContractProvider, TupleBuilder, Builder } from "ton-core";

export class TeleHunterFactory implements Contract {
	constructor(
		readonly address: Address,
		readonly init?: { code: Cell, data: Cell }
	){}

	async getOwner(provider: ContractProvider) {
		const { stack } = await provider.get("owner", []);
		return {
			owner: stack.readAddress(),
		};
	}

	async getBasicInfo(provider: ContractProvider) {
		const { stack } = await provider.get("getBasicInfo", []);
		return {
			totalUsers: stack.readBigNumber(),
		};
	}

	async getHunterItemAddr(provider: ContractProvider, tgID: string) {
		let builder = new TupleBuilder();
		builder.writeString(tgID);
		const { stack } = await provider.get("getHunterItemAddr", builder.build());
		return {
			address: stack.readAddress(),
		};
	}
}