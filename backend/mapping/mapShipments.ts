import { Shipment, ShipmentRawData } from '../models/Shipment';

export function mapShipments(rawData: ShipmentRawData): Shipment {
    if (!rawData) {
        throw new Error('Invalid raw shipment data');
    }

    const totalPieces = parseInt(rawData.totalPieces);
    if (isNaN(totalPieces)) {
        throw new Error('Invalid totalPieces value');
    }

    return {
        external_id: rawData.shipmentID,
        shipment_type: rawData.shipmentType,
        origin_port: rawData.originPortCode,
        destination_port: rawData.destinationPortCode,
        total_pieces: parseInt(rawData.totalPieces),
        total_weight: rawData.totalWeight,
        total_volume: rawData.totalVolume,
        notes: rawData.notes || undefined,
    }
}
