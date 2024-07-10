export type OrderStatus = 'DRAFT' | 'IN_PROGRESS' | 'DELIVERED' | ''
export type OrderStatusReadable = 'Draft' | 'In Progress' | 'Delivered' | 'Unknown'

export type Order = {
    id: string,
    order_number: string,
    order_date: string,
    order_status: string,
    estimated_time_arrival: string,
    actual_time_arrival: string,
}

export type OrderData = {
    orders: Order[]
} | any;
