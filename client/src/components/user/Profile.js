import { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { Button, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { isAuthenticated } from '../../auth'

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(10),
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
                <Grid item xs={5}>
                    <Typography component="h1" variant="h5">
                        Profile
                    </Typography>
                    <p>Hello {isAuthenticated().username}</p>
                    <p>Email: {isAuthenticated().email}</p>
                    <p>Joined {new Date(user.createdDate).toDateString()}</p>
                </Grid>
                <Grid item xs={5}>
                    {isAuthenticated().id === userId && (
                        <div>
                            <Button variant="contained" color="primary" href={`/api/user/update/${userId}`}>
                                Edit
                            </Button>
                            <Button variant="contained" color="secondary" style={{ marginLeft: '5%' }} href={`/api/user/delete/${userId}`}>
                                Delete
                            </Button>
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>  
    )
}
