import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, TextField, Typography, Container, CircularProgress } from '@material-ui/core'
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
  }))

export default function NewPost() {
    const classes = useStyles()
    const [values, setValues] = useState({
        title: '',
        body: '',
        formData: '',
        error: '',
        loading: false,
        redirectToProfile: false
    })
    const { title, body, formData, error, loading, redirectToProfile } = values

    const createPost = post => {
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER}/api/post/new/${isAuthenticated().id}`,
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${isAuthenticated().token}`
            },
            data: post
        })
    }

    useEffect(() => {
        setValues({
            ...values,
            formData: new FormData()
        })
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
        setValues({ ...values, error: false, loading: true })
        const post = { title, body }
        formData.append('post', new Blob([JSON.stringify(post)], { type: 'application/json' }))
        createPost(formData).then(res => {
            setValues({ ...values, loading: false, title: '', body: '', redirectToProfile: true })
        }).catch(error => {
            setValues({ ...values, error: error.response.data.details })
        })
    }

    const showLoading = () => (
        <CircularProgress style={{ display: loading ? '' : 'none'}} />
    )

    const showError = () => (
        <Alert severity="error" style={{ display: error ? '' : 'none' }}>
            {error}
        </Alert>
    )

    const createPostForm = () => (
        <form className={classes.form} encType="multipart/form-data" noValidate>
            <Typography component="h1" variant="subtitle1">
                Upload Image Here
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
            label="Title"
            type="text"
            autoComplete="title"
            onChange={handleChange("title")}
            value={title}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            multiline
            fullWidth
            label="Body"
            type="text"
            autoComplete="body"
            onChange={handleChange("body")}
            value={body}
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            >
            Create Post
            </Button>
        </form>
    )

    return (
        <Container maxWidth="xs">
        {redirectToProfile ? <Redirect to={`/user/${isAuthenticated().id}`} /> : null}
        <div className={classes.paper}>
            {showLoading()}
            {showError()}
            <Typography component="h1" variant="h5">
                Create New Post
            </Typography>
            {createPostForm()}
        </div>
        </Container>
    )
}
