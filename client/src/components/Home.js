import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Posts from './Post/Posts'
import { isAuthenticated } from '../auth'
import LandingPage from './LandingPage'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 6),
  }
}))

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
          Welcome to Social Media App
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Share your views and ideas without discrimination.
          Stay in touch with loved ones far from home.
          Connect with friends, new and old.  
        </Typography>
      </Container>
      { isAuthenticated() ? 
        <Posts /> :
        <LandingPage />
      }
    </div>
  )
}

  