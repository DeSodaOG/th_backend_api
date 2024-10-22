import { TonClient } from "ton";
import { Address, } from 'ton-core';
import { TeleHunterFactory } from '@/assets/TeleHunterFactoryWrapper';
import { HunterItemWrapper } from "@/assets/HunterItemWrapper";

export async function verifyPayment(id: string, joinAddress: string): Promise<boolean> {
    const client = new TonClient({
        endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
        apiKey: "509a1c3746f03dd5cb9d8192209467d47d8f0392faa7077427520b2774e45dee"
    })

    try {
        const factory = await client.open(new TeleHunterFactory(Address.parse("EQB_xLfZPt4T1xtHYSVr6hrpt6evIk-Thty9i-D-gss4w5YN")));
        const hunterItem = await factory.getHunterItemAddr(id);
        const hunterContract = await client.open(new HunterItemWrapper(
            hunterItem.address
        ));

        const status = await hunterContract.getBasicInfo();

        console.log(status)
        return status.isJoined;
    } catch (error) {
        return false;
    }
}