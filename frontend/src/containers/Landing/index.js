import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';
import {
	getUsers,
	getCategories,
	getProducts,
	buyProduct,
	getSuppliers
} from '../../redux/actions';
import {
	CircularProgress,
	Button,
	Container,
	GridList,
	Chip
} from '@material-ui/core';

import ProductCard from '../../components/ProductCard';
import ListWindow from '../../components/ListWindow';

class Home extends Component {
	state = {
		search: '',
		filters: []
	};
	componentDidMount() {
		this.props.dispatch(getUsers());
		this.props.dispatch(getCategories());
		this.props.dispatch(getProducts());
		this.props.dispatch(getSuppliers());
	}

	render() {
		const { status, products, suppliers, categories, dispatch } = this.props;
		console.log('====================================');
		console.log(this.props);
		console.log('====================================');
		console.log('==================asds==================');
		console.log(this.state.filters);
		console.log('====================================');
		return (
			<Container maxWidth='lg'>
				<input
					type='text'
					palceholder='SEARCH'
					value={this.state.search}
					onChange={e => this.setState({ search: e.target.value })}
				/>
				{categories &&
					categories.map(item => {
						let enabled = this.state.filters.indexOf(item.id) !== -1;
						let filters = this.state.filters.filter(i => i !== item.id);
						console.log('====================================');
						console.log(enabled);
						console.log('====================================');
						return (
							<Chip
								key={item.id}
								label={item.name}
								color={enabled ? 'primary' : 'secondary'}
								onClick={() =>
									this.setState({
										filters: enabled ? filters : [...this.state.filters, ...[item.id]]
									})
								}
							/>
						);
					})}
				<div className='list'>
					{status === 'FETCHING' && <CircularProgress />}
					{status !== 'FETCHING' &&
						products.map(product => {
							if (
								this.state.search.length > 0 &&
								product.name.toLowerCase().search(this.state.search) === -1
							) {
								return null;
							}
							if (
								this.state.filters.length > 0 &&
								!this.state.filters.includes(product.categories_id)
							) {
								return null;
							}
							return (
								<ProductCard
									key={product.id}
									{...product}
									action={() => dispatch(buyProduct(product))}
									image={product.pictures ? product.pictures[0].src : null}
								/>
							);
						})}
				</div>

				<div className='table'>
					{status === 'FETCHING' && <CircularProgress />}
					{status !== 'FETCHING' &&
						products.map(product => {
							if (
								this.state.search.length > 0 &&
								product.name.toLowerCase().search(this.state.search) === -1
							) {
								return null;
							}
							if (
								this.state.filters.length > 0 &&
								!this.state.filters.includes(product.categories_id)
							) {
								return null;
							}
						}) && (
							<ListWindow
								suppliers={suppliers}
								search={this.state.search}
								status={status}
								products={products}
								filters={this.state.filters}
							/>
						)}
				</div>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	...state,
	users: state.users
});

export default connect(mapStateToProps)(Home);
