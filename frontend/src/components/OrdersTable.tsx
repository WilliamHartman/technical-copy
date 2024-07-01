import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from 'tss-react/mui';
import '../App.css';
import {OrderData} from '../data/Order' 

const useStyles = makeStyles()({
    grid: {
        marginInline: 16,
        height: '100%'
    },
    loader: {
        margin: 'auto',
        width: 'fit-content',
        marginTop: 200
    }
})

function OrdersTable(orders: OrderData) {
    const { classes } = useStyles();

    const columns: GridColDef[] = [
        {
            field: 'order_number',
            headerName: 'Order Number',
            width: 325
        },
        {
            field: 'order_date',
            headerName: 'Order Date',
            width: 275
        },
        {
            field: 'order_status',
            headerName: 'Status',
            width: 275
        },
        {
            field: 'estimated_time_arrival',
            headerName: 'ETA',
            width: 275
        },
        {
            field: 'actual_time_arrival',
            headerName: 'ATA',
            width: 275
        },
    ]

	return (
		<DataGrid
			className={classes.grid}
			rows={orders?.orders}
			columns={columns}
            initialState={{
                pagination: { paginationModel: { pageSize: 25 } },
              }}
            pageSizeOptions={[5, 10, 25]}
		/>
	)

}

export default OrdersTable;