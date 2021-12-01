import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/**
 * Props:
 * - imagePath, title, text, buttonLabel, buttonAction
 */ 
export default function CardWithImage(props) {

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 700 }}>
      { props.imagePath !== undefined &&
      	<CardMedia
	       component="img"
	       height="140"
	       image={props.imagePath}
	     />
      }
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.text}
        </Typography>
      </CardContent>
      { props.buttonLabel !== undefined &&
      	<CardActions>
	      <Button size="small" onClick={props.buttonAction}>{props.buttonLabel}</Button>
	    </CardActions>
      }
    </Card>
  );
}