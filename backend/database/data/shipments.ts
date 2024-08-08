// export const messages = [
//     {
//         "shipmentID": "56789",
//         "shipmentType": "Air",
//         "originPortCode": "LAX",
//         "destinationPortCode": "NRT",
//         "totalPieces": "5",
//         "totalWeight": {
//             "unit": "kg",
//             "value": 2000.00
//         },
//         "totalVolume": {
//             "unit": "m3",
//             "value": 10.00
//         },
//         "notes": "Signature required",
//         "timestamp": "2024-06-01T10:15:00"
//     }
// ]

interface Shipment {
    shipmentID: string;
    shipmentType: string;
    originPortCode: string;
    destinationPortCode: string;
    totalPieces: number;
    totalWeight: {
        unit: string;
        value: number;
    };
    totalVolume: {
        unit: string;
        value: number;
    };
    notes: string;
    timestamp: string;
}

export const messages: Shipment[] = [
    {
        shipmentID: "56789",
        shipmentType: "Air",
        originPortCode: "LAX",
        destinationPortCode: "NRT",
        totalPieces: 5,
        totalWeight: {
            unit: "kg",
            value: 2000.00
        },
        totalVolume: {
            unit: "m3",
            value: 10.00
        },
        notes: "Signature required",
        timestamp: "2024-06-01T10:15:00"
    }
];