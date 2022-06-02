import { BatchPacket, DataPacket } from './Packets';
import { Protocol, RakNetSession } from '@jsprismarine/raknet';

import { Logger } from '../Prismarine';

/**
 * Act as the first connection layer, handles everything related to batching,
 * queuing and encrypting of Minecraft packets in a hypotetical session.
 * TODO: implement ticking, batching, queues, encryption.
 */
export default class MinecraftSession {
    private readonly rakSession: RakNetSession;
    private readonly logger?: Logger;

    public constructor(session: RakNetSession, logger?: Logger) {
        this.rakSession = session;
        this.logger = logger;
    }

    public async sendDataPacket(packet: DataPacket): Promise<void> {
        const batch = new BatchPacket();
        try {
            batch.addPacket(packet);
            batch.encode();
        } catch (error) {
            this.logger?.warn(
                `Packet §b${packet.constructor.name}§r to §b${this.rakSession
                    .getAddress()
                    .toToken()}§r failed with: ${error}`,
                'PlayerConnection/sendDataPacket'
            );
            return;
        }

        // Add this in raknet
        const sendPacket = new Protocol.Frame();
        sendPacket.reliability = Protocol.FrameReliability.RELIABLE_ORDERED;
        sendPacket.orderChannel = 0;
        sendPacket.content = batch.getBuffer();

        this.rakSession.sendFrame(sendPacket, Protocol.RakNetPriority.IMMEDIATE);
        this.logger?.silly(`Sent §b${packet.constructor.name}§r packet`, 'PlayerConnection/sendDataPacket');
    }

    public forceDisconnect(): void {
        this.rakSession.disconnect();
    }
}