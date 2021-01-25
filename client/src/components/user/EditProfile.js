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
        formData: '',
        about: '',
        error: '',
        success: false
    })
    const [redirectToProfile, setRedirectToProfile] = useState(false)
    const [photo, setPhoto] = useState("")
    const { id, username, email, password, formData, about, error } = values
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
                about: res.data.about,
                formData: new FormData()
             })
        }).catch(error => {
            // user not authenticated, redirect
            if(error) {
                setRedirectToProfile(true)
            }
        })
    }

    const fetchPhoto = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/user/photo/${userId}`,
            responseType: 'arraybuffer',
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            const base = btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
            setPhoto(`data:image/*;base64, ${base}`)
        }).catch(error => {
            console.log(error)
        })
    }

    const updateUser = user => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_SERVER}/api/user/update/${userId}`,
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${isAuthenticated().token}`
            },
            data: user
        })
    }

    const updateLocalStorage = (user, next) => {
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('username')) {
                localStorage.setItem('username', JSON.stringify(user.username))
            }
        }
        next()
    }

    useEffect(() => {
        fetchUser()
        fetchPhoto()
    }, [])

    // higher order function to target name and event of form
    const handleChange = name => e => {
        const value = name === 'image' ? e.target.files[0] : e.target.value
        formData.append('image', value)
        // array syntax to target all input fields
        setValues({ ...values, [name]: value })
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        setValues({ ...values, error: false })
        const user = { username, email, password: password || undefined, about }
        formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }))
        updateUser(formData).then(res => {
            updateLocalStorage(user, () => {
                setRedirectToProfile(true)
            })
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
        <form className={classes.form} encType="multipart/form-data" noValidate>
            <img 
            src={photo} 
            alt={username} 
            onError={i => (i.target.src="https://cdn2.iconfinder.com/data/icons/teen-people-face-avatar-6/500/teen_109-512.png")}
            style={{ width: 'auto', height: '200px' }} />
            <Typography component="h1" variant="subtitle1">
                Profile Picture
            </Typography>
            <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange("image")}
            />
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
            <TextField
            variant="outlined"
            multiline
            margin="normal"
            required
            fullWidth
            label="About"
            onChange={handleChange("about")}
            value={about}
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
