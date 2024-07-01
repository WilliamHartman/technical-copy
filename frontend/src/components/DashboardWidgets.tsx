import { Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import '../App.css';
import {WidgetData} from '../data/WidgetData'

const useStyles = makeStyles()({
    card: {
        width: '300px',
        height: '100px',
        margin: '10px',
        padding: '5px'
    },
})

function DashboardWidgets(widgetData: WidgetData) {
    const { classes } = useStyles();
    const { widgetData: data }: WidgetData['widgetData'] = widgetData

    return (
        <Grid container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Card variant="outlined" className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color="primary">
                        Outstanding Order Items
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {data?.outstandingOrderItems ?? 0}
                    </Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color="primary">
                        Unique Products Ordered
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {data?.uniqueProductsOrdered ?? 0}
                    </Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color="primary">
                        Total Amount Spent
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        ${parseFloat(data?.totalAmountSpent).toFixed(2) ?? 0}
                    </Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color="primary">
                        Late Deliveries
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {data?.lateDeliveries ?? 0}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )

}

export default DashboardWidgets;