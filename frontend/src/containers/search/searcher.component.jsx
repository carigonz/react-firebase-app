import React, { Component } from 'react';
import { connect } from 'react-redux';

import './searcher.styles.scss';
import {
	getUsers,
	getCategories,
	getProducts,
	getSuppliers,
} from '../../redux/actions';
import { CircularProgress, Container, Chip } from '@material-ui/core';

import ListWindow from '../../components/ListWindow';
import { log } from 'util';

class Searcher extends Component {
	state = {
		search: '',
		filters: [],
	};
	componentDidMount() {
		this.props.dispatch(getUsers());
		this.props.dispatch(getCategories());
		this.props.dispatch(getProducts());
		this.props.dispatch(getSuppliers());
	}

	render() {
		const { status, products, suppliers, categories, dispatch } = this.props;
		// console.log('====================================');
		// console.log(this.props);
		// console.log('====================================');
		// console.log('==================asds==================');
		// console.log(this.state.filters);
		// console.log('====================================');
		return (
			<Container maxWidth='lg'>
				<input
					type='text'
					palceholder='SEARCH'
					value={this.state.search}
					onChange={(e) => this.setState({ search: e.target.value })}
				/>
				{categories &&
					categories.map((item) => {
						let enabled = this.state.filters.indexOf(item.id) !== -1;
						let filters = this.state.filters.filter((i) => i !== item.id);
						return (
							<Chip
								key={item.id}
								label={item.name}
								color={enabled ? 'primary' : 'secondary'}
								onClick={() =>
									this.setState({
										filters: enabled
											? filters
											: [...this.state.filters, ...[item.id]],
									})
								}
							/>
						);
					})}

				<div className='table'>
					{status === 'FETCHING' && <CircularProgress />}
					{status !== 'FETCHING' && products && (
						<ListWindow
							suppliers={suppliers}
							search={this.state.search}
							status={status}
							products={products
								.map((product) => {
									let timestamp = '';
									if (
										this.state.search.length > 0 &&
										product.name.toLowerCase().search(this.state.search) === -1
									) {
										return null;
									}
									if (
										this.state.filters.length > 0 &&
										!this.state.filters.includes(product.category_id)
									) {
										return null;
									}
									timestamp = product.updatedAt.toDate();

									let day = timestamp.getDate();
									let month = timestamp.getMonth() + 1;
									let year = timestamp.getFullYear();

									product.date = `${day}/${month}/${year}`;
									//console.log('====================================');
									console.log(`${day}/${month}/${year}`);
									console.log(product);

									// let supplier = Array.from(suppliers).filter(
									// 	supplier => supplier.id === product.supplier_id
									// );
									// console.log(supplier.id);
									// console.log(product.supplier_id);
									// product.supplier_id = supplier.name;

									return product;
								})
								.filter((product) => product !== null)}
							filters={this.state.filters}
						/>
					)}
				</div>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	...state,
	users: state.users,
});

export default connect(mapStateToProps)(Searcher);
