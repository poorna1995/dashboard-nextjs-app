import { Grid } from "@mui/material";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import React from "react";


const BlankForecastFilterSection = ({ data }) => {

	return (
		<div>
			{" "}
			<Grid container>
				{data.map((item, index) => {
					return (
						<Grid item md={2} key={index}>
							<FormSelectInput
								title={
									<span>
										{item.title} ({item.options.length})
									</span>
								}
								options={item.options}
								onChange={(e) => handleValueChanges(e, item)}
							/>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};

export default BlankForecastFilterSection;
