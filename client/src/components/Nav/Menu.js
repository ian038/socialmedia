import { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../../auth'

import clsx from 'clsx';
import { 
  Button,
  Tabs,
  Tab,
  Drawer,
  AppBar, 
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItem,
  makeStyles, 
  useTheme
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrawer = () => {
    open ? setOpen(false) : setOpen(true)
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        id="header-color"
        className={clsx(classes.appBar, {
            [classes.appBarShift]: open
        })}
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
                  <Tab label="Home" to="/" component={Link} />
                  <Tab label={`${isAuthenticated().username}'s profile`} to={`/user/${isAuthenticated().id}`} component={Link} />
                  <Tab label="Users" to="/users" component={Link} />
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
