import { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { Button, TextField, Typography, Container } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { isAuthenticated } from '../../auth'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(12),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function EditProfile() {
    const classes = useStyles()
    const [values, setValues] = useState({
        id: '',
        username: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    const [redirectToProfile, setRedirectToProfile] = useState(false)
    const { id, username, email, password, error } = values
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
            setValues({
                id: res.data.id,
                username: res.data.username,
                email: res.data.email,
             })
        }).catch(error => {
            // user not authenticated, redirect
            if(error) {
                setRedirectToProfile(true)
            }
        })
    }

    const updateUser = user => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_SERVER}/api/user/update/${userId}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            },
            data: JSON.stringify(user)
        })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    // higher order function to target name and event of form
    const handleChange = name => e => {
        // array syntax to target all input fields
        setValues({ ...values, [name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setValues({ ...values, error: false })
        const user = { username, email, password: password || undefined }
        updateUser(user).then(res => {
            setRedirectToProfile(true)
        }).catch(error => {
            setValues({ ...values, error: error.response.data.details })
        })
    }

    const showError = () => (
        <Alert severity="error" style={{ display: error ? '' : 'none' }}>
            {error}
        </Alert>
    )

    const editProfileForm = () => (
        <form className={classes.form} noValidate>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            type="text"
            autoComplete="username"
            onChange={handleChange("username")}
            value={username}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            onChange={handleChange("email")}
            value={email}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange("password")}
            value={password}
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            >
            Edit Profile
            </Button>
        </form>
    )
    return (
        <Container maxWidth="xs">
        {redirectToProfile ? <Redirect to={`/user/${id}`} /> : null}
        <div className={classes.paper}>
            {showError()}
            <Typography component="h1" variant="h5">
                Edit Profile
            </Typography>
            {editProfileForm()}
        </div>
        </Container>
    )
}
