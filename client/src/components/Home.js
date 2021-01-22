import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Posts from './Post/Posts'
import { isAuthenticated } from '../auth'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 6),
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
          Welcome to Social Media App
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Make new connections with people around the world!
          See how your friends and family are doing.
          Share different views on various topics without censorship!
        </Typography>
      </Container>
      { isAuthenticated() ? 
        <Posts /> :
        <h1 className="lead">LANDING PAGE HERE</h1>
      }
    </div>
  )
}

  