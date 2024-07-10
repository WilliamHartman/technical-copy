import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import '../App.css';

export function ShipmentForm() {
	const { register } = useForm()

	return (
		<form>
			<Grid container >
				<Grid item xs>
					<TextField label="Shipment Id" {...register("shipmentId")} />
				</Grid>
				<Grid item xs>
					<TextField label="Shipment Type" {...register("shipmentType")} />
				</Grid>
				<Grid item xs>
					<TextField label="Origin Port Code" {...register("originPortCode")} />
				</Grid>
				<Grid item xs>
					<TextField label="Destination Port Code" {...register("destinationPortCode")} />
				</Grid>
				<Grid item xs>
					<TextField label="Total Pieces" {...register("totalPieces")} />
				</Grid>
				<Grid item xs>
					<TextField label="Total Weight" {...register("totalWeight")} />
				</Grid>
				<Grid item xs>
					<TextField label="Total Weight Unit" {...register("totalWeightUnit")} />
				</Grid>
				<Grid item xs>
					<TextField label="Total Volume" {...register("totalVolume")} />
				</Grid>
				<Grid item xs>
					<TextField label="Total Volume Unit" {...register("totalVolumeUnit")} />
				</Grid>
				<Grid item xs>
					<TextField label="Notes" {...register("notes")} />
				</Grid>
			</Grid>
		</form>
	);
}
