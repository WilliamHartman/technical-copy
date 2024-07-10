import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import '../App.css';
import DashboardWidgets from '../components/DashboardWidgets';
import OrdersTable from '../components/OrdersTable';
import ProductsTable from '../components/ProductsTable';
import { OrderData } from '../data/Order';
import { ProductData } from '../data/Product';
import { WidgetData } from '../data/WidgetData';
import { adjustOrderData, fetchData } from '../data/fetch-data';

const useStyles = makeStyles()({
	toggleGroup: {
		margin: '25px',
	},
})

function DashboardPage() {
	const { classes } = useStyles()

	const [ordersData, setOrdersData]: OrderData = useState({})
	const [productsData, setProductsData]: ProductData = useState({})
	const [widgetData, setWidgetData]: WidgetData = useState({
		widgetData: {
			outstandingOrderItems: 0,
			uniqueProductsOrdered: 0,
			totalAmountSpent: '',
			lateDeliveries: 0
		}
	})
	const [toggle, setToggle] = useState('orders')

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		selection: string,
	) => {
		setToggle(selection)
	}

	useEffect(() => {
		// Dashboard Tables
		fetchData('orders')
			.then((dataResponse: any) => {
				const orders = adjustOrderData(dataResponse.data)
				setOrdersData(orders)
			})
		fetchData('products')
			.then((dataResponse: any) => {
				setProductsData(dataResponse.data)
			})

		// Dashboard Widgets
		fetchData('outstandingOrderItems')
			.then((dataResponse: any) => {
				widgetData.widgetData.outstandingOrderItems = dataResponse.data
				setWidgetData({ ...widgetData })
			})
		fetchData('uniqueProductsOrdered')
			.then((dataResponse: any) => {
				widgetData.widgetData.uniqueProductsOrdered = dataResponse.data
				setWidgetData({ ...widgetData })
			})
		fetchData('totalAmountSpent')
			.then((dataResponse: any) => {
				widgetData.widgetData.totalAmountSpent = dataResponse.data
				setWidgetData({ ...widgetData })
			})
		fetchData('lateDeliveries')
			.then((dataResponse: any) => {
				widgetData.widgetData.lateDeliveries = dataResponse.data
				setWidgetData({ ...widgetData })
			})
	}, [toggle])

	return (
		<div>
			<h1>Dashboard</h1>
			<Divider />
			<DashboardWidgets widgetData={widgetData.widgetData} />
			<Divider />
			<ToggleButtonGroup
				color="primary"
				value={toggle}
				exclusive
				onChange={handleChange}
				aria-label="Entity"
				className={classes.toggleGroup}
			>
				<ToggleButton value="orders">Orders</ToggleButton>
				<ToggleButton value="products">Products</ToggleButton>
			</ToggleButtonGroup>
			{toggle === 'orders' ? <OrdersTable orders={ordersData} /> : <ProductsTable products={productsData} />}
		</div>
	);
}

export default DashboardPage;