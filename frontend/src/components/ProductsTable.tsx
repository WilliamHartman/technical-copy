import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from 'tss-react/mui';
import '../App.css';
import {ProductData} from '../data/Product'

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

function ProductsTable(products: ProductData) {
    const { classes } = useStyles();

    const columns: GridColDef[] = [
        {
            field: 'sku',
            headerName: 'SKU',
            width: 300
        },
        {
            field: 'product_description',
            headerName: 'Description',
            width: 800
        },
        {
            field: 'is_active',
            headerName: 'Is Active?',
            width: 300
        },
    ]

	return (
		<DataGrid
			className={classes.grid}
			rows={products?.products}
			columns={columns}
            initialState={{
                pagination: { paginationModel: { pageSize: 25 } },
              }}
            pageSizeOptions={[5, 10, 25]}
		/>
	)

}

export default ProductsTable;