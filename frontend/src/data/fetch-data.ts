import axios from 'axios';
import { format } from 'date-fns';
import { Order, OrderStatusReadable } from './Order';

export const fetchData = (endpoint: string) => {
    return axios.get(`http://localhost:3001/${endpoint}`)
        .then((res) => {
            return { status: 'SUCCESS', data: res.data }
        })
        .catch((err) => {
            return {
                status: 'ERROR',
                error_message: err.message
            }
        })
}

const adjustDateString = (dateString: string): string => {
    const date = new Date(dateString).getTime()
    return format(date, 'MM/dd/yy')
}

const adjustOrderStatus = (status: string): OrderStatusReadable => {
    switch (status) {
        case 'DRAFT':
            return 'Draft'
        case 'IN_PROGRESS':
            return 'In Progress'
        case 'DELIVERED':
            return 'Delivered'
        default:
            return 'Unknown'
    }
}

export const adjustOrderData = (orders: Order[]): Order[] => orders.map(order => ({
    ...order,
    order_status: adjustOrderStatus(order.order_status),
    order_date: adjustDateString(order.order_date),
    estimated_time_arrival: adjustDateString(order.estimated_time_arrival),
    actual_time_arrival: adjustDateString(order.actual_time_arrival)
}))
