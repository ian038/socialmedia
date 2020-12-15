import { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { Button, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { isAuthenticated } from '../../auth'

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(13),
    },
    grid: {
        justifyContent: 'center'
    }
  }));

export default function Profile() {
    const classes = useStyles();
    const [user, setUser] = useState("")
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const { userId } = useParams()

    const fetchUser = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/user/${userId}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            setUser(res.data)
        }).catch(error => {
            // user not authenticated, redirect
            if(error) {
                setRedirectToSignin(true)
            }
        })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const redirectUser = redirectToSignin => {
        if(redirectToSignin) {
            return <Redirect to='/signin' /> && <Alert severity="error">User not authenticated. Please sign in.</Alert>
        }
    }

    return (
        <div className={classes.root}>
            {redirectUser(redirectToSignin)}
            <Grid container spacing={6} className={classes.grid}>
                <Grid item xs={3}>
                    <Typography component="h1" variant="h5">
                        Profile
                    </Typography>
                    <img
                    src="https://cdn2.iconfinder.com/data/icons/teen-people-face-avatar-6/500/teen_109-512.png"
                    alt={user.username}
                    height="75%"
                    />
                </Grid>
                <Grid item xs={4}>
                    {isAuthenticated().id === userId && (
                        <div style={{ marginTop: '10%' }}>
                            <Typography variant="subtitle1" component="p">
                                Hello {user.username}
                            </Typography>
                            <Typography variant="subtitle1" component="p">
                                Email: {user.email}
                            </Typography>
                            <Typography variant="subtitle1" component="p">
                                Joined {new Date(user.createdDate).toDateString()}
                            </Typography>
                            <Button variant="contained" color="primary" href={`/api/user/update/${userId}`}>
                                Edit Profile
                            </Button>
                            <Button variant="contained" color="secondary" style={{ marginLeft: '5%' }} href={`/api/user/delete/${userId}`}>
                                Delete Profile
                            </Button>
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>  
    )
}
