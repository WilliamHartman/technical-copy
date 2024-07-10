export type UpsertShipmentInput = {
    external_id: string,
    shipment_type: string,
    origin_port: string,
    destination_port: string,
    total_pieces: number,
    total_weight: Unit,
    total_volume: Unit,
    notes?: string,
}

type Unit = { unit: string, value: number }