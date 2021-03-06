import { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../../auth'
import { 
  Button,
  Tabs,
  Tab,
  AppBar, 
  Toolbar,
  Typography,
  CssBaseline,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1, 1.5)
  }
}))

function Menu({ history }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isActive = (history, path) => {
    if(history.location.pathname === path) return { color: '#00FFFF' } 
    else return { color: 'white' }
  }

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="relative"
        id="header-color"
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/">Social Media App</Link>
          </Typography>
            {isAuthenticated() ? 
            <Fragment>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="nav tabs example">
                  <Tab label="Home" to="/" component={Link} style={isActive(history, '/')} />
                  <Tab label={`${isAuthenticated().username}'s profile`} onClick={() => window.location.href=`/user/${isAuthenticated().id}`} style={isActive(history, `/user/${isAuthenticated().id}`)}  />
                  <Tab label="Users" to="/users" component={Link} style={isActive(history, '/users')} />
                  <Tab label="Find People" to="/findpeople" component={Link} style={isActive(history, '/findpeople')}  />
                  <Tab label="Create Post" to="/post/create" component={Link} style={isActive(history, '/post/create')} />
                </Tabs>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => signout(() => { history.push('/') })}>
                    Sign Out
                </Button>
            </Fragment>
              :
            <Fragment>
                <Button variant="contained" color="primary" to="/signup" component={Link} className={classes.button}>
                    Sign Up
                </Button>
                <Button variant="contained" color="primary" to="/signin" component={Link} className={classes.button}>
                    Sign In
                </Button>
            </Fragment>
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Menu)
