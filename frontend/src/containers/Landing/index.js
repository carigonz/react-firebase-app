import React, { Component } from 'react';
import { connect } from 'react-redux';
import BackgroundImage from '../../assets/img/fondo1.jpg';
import './style.scss';
import Typography from '@material-ui/core/Typography';
import LandingCart from '../../components/landing-card/landing-cart.component';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://github.com/carigonz'>
				carigonz
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const Home = () => {
	return (
		<div className='container'>
			<div className='image-container'>
				<div
					className='image'
					style={{
						backgroundImage: `url(${BackgroundImage})`,
					}}
				/>
			</div>
			<div className='landing-content'>
				<Typography variant='h4' component='h1'>
					Ferremax searcher engine
				</Typography>
				<LandingCart />
				<Copyright />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state,
	users: state.users,
});

export default connect(mapStateToProps)(Home);
