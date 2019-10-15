import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	card: {
		maxWidth: 345,
		margin: 25
	},
	media: {
		height: 160,
		width: '100%',
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	}
});

export default function MediaCard(props) {
	const classes = useStyles();

	return (
		<Card className={classes.card} key={props.id}>
			<CardActionArea>
				{props.image && (
					<div
						className={classes.media}
						style={{ backgroundImage: `url(${props.image})` }}
					/>
				)}
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{props.name}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						{props.price}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button onClick={props.secondAction} size='small' color='primary'>
					Comparar
				</Button>
				<Button onClick={props.action} size='small' color='primary'>
					Comprar
				</Button>
			</CardActions>
		</Card>
	);
}
