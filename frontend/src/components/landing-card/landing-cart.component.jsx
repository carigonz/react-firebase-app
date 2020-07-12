import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		maxWidth: 200,
		maxHeight: 200,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	content: {
		textAlign: 'center',
		backgroundColor: '#fafafa',
		opacity: '1 !important',
	},
});

const LandingCard = ({ history }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea onClick={() => history.push('/search')}>
				<CardContent className={classes.content}>
					<Typography gutterBottom variant='h5' component='h2'>
						Buscador
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						Lorem ipsum dolor sit amet consectetur adipiscing, elit odio platea
						ridiculus semper, lacus posuere nibh ullamcorper maecenas.
					</Typography>
				</CardContent>
			</CardActionArea>
			{/* <CardActions>
				<Button size='small' color='primary'>
					Share
				</Button>
				<Button size='small' color='primary'>
					Learn More
				</Button>
			</CardActions> */}
		</Card>
	);
};

export default withRouter(LandingCard);
