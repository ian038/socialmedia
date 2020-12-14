import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h5">
        Home
      </Typography>
      <p className="lead">Welcome to React Frontend</p>
    </div>
  )
}

  