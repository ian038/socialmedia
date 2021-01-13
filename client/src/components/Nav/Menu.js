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
  makeStyles
} from '@material-ui/core'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1)
  },
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
    <div className={classes.root}>
      <AppBar
        position="fixed"
        id="header-color"
      >
        <Toolbar>
          {/* {isAuthenticated() ? 
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, open)}
          >
            <MenuIcon />
          </IconButton>
          : ''
          } */}
          <Typography variant="h6" className={classes.title}>
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/">Social Media App</Link>
          </Typography>
            {isAuthenticated() ? 
            <Fragment>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="nav tabs example">
                  <Tab label="Home" to="/" component={Link} style={isActive(history, '/')} />
                  <Tab label={`${isAuthenticated().username}'s profile`} to={`/user/${isAuthenticated().id}`} component={Link} style={isActive(history, `/user/${isAuthenticated().id}`)}  />
                  <Tab label="Users" to="/users" component={Link} style={isActive(history, '/users')} />
                  <Tab label="Find People" to="/findpeople" component={Link} style={isActive(history, '/findpeople')}  />
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
      {/* {isAuthenticated() ? 
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText>
                <Link className="drawer_links" to="/">Home</Link>
            </ListItemText>
          </ListItem>
        </List>
        <List>
          <ListItem button>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText>
                <Link className="drawer_links" to="/signout">Sign Out</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      : ''
      } */}
    </div>
  );
}

export default withRouter(Menu)
