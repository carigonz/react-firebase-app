import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiVirtualizedTable from './VirtualizedTable';
import Paper from '@material-ui/core/Paper';
import './styles.css';

export default function ListWindow({ ...props }) {
	console.log(props);
	// rows
	let productsShown = props.products.slice();
	console.log(props.status);

	//if (props.status !== 'FETCHING') {
	productsShown.map(prod => {
		//prod.updatedAt = new Date();
		delete prod.pictures;
		delete prod.createdAt;
		delete prod.updatedAt;
	});
	// 	if (
	// 		props.search.length > 0 &&
	// 		prod.name.toLowerCase().search(props.search) === -1
	// 	) {
	// 		return null;
	// 	}
	// 	if (
	// 		props.filters.length > 0 &&
	// 		!props.filters.includes(prod.categories_id)
	// 	) {
	// 		return null;
	// 	}
	// });
	//}
	console.log(productsShown);

	//search

	//rows //
	const styles = theme => ({
		flexContainer: {
			display: 'flex',
			alignItems: 'center',
			boxSizing: 'border-box'
		},
		tableRow: {
			cursor: 'pointer'
		},
		tableRowHover: {
			'&:hover': {
				backgroundColor: theme.palette.grey[200]
			}
		},
		tableCell: {
			flex: 1
		},
		noClick: {
			cursor: 'initial'
		}
	});

	MuiVirtualizedTable.propTypes = {
		classes: PropTypes.object.isRequired,
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				dataKey: PropTypes.string.isRequired,
				label: PropTypes.string.isRequired,
				numeric: PropTypes.bool,
				width: PropTypes.number.isRequired
			})
		).isRequired,
		headerHeight: PropTypes.number,
		onRowClick: PropTypes.func,
		rowHeight: PropTypes.number
	};

	const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

	const suppliersArray = [];

	props.suppliers.map(supplier => {
		suppliersArray.push({ width: 160, label: supplier.name, key: supplier.id });
	});

	const getColumnNames = props.products;
	const itemNames = getColumnNames[0];

	const columns = [];

	for (const prop in itemNames) {
		if (prop === 'description' || prop === 'name') {
			columns.push({
				width: 300,
				label: prop,
				dataKey: prop
			});
		} else {
			columns.push({
				width: 150,
				label: prop,
				dataKey: prop
			});
		}
		console.log(prop);
	}
	console.log(columns);

	console.log(productsShown);
	let columnsShown = [];
	columnsShown = columns
		.filter(column => column.label !== 'pictures')
		.filter(column => column.label !== 'createdAt');
	console.log(columnsShown);

	return (
		<Paper style={{ height: 400, width: '100%' }}>
			<VirtualizedTable
				rowCount={productsShown.length}
				rowGetter={({ index }) => productsShown[index]}
				columns={columnsShown}
			/>
		</Paper>
	);
}
