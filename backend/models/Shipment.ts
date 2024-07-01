export type ShipmentRawData = {
    shipmentID: string,
    shipmentType: string,
    originPortCode: string,
    destinationPortCode: string,
    totalPieces: string,
    totalWeight: Unit,
    totalVolume: Unit,
    notes?: string,
};

export type Shipment = {
    external_id: string,
    shipment_type: string,
    origin_port: string,
    destination_port: string,
    total_pieces: string,
    total_weight: Unit,
    total_volume: Unit,
    notes?: string,
};


type Unit = { unit: string, value: string };
