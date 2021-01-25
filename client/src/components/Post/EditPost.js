import { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
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

export default function EditPost() {
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
    const [photo, setPhoto] = useState("")
    const { postId } = useParams()

    const fetchPost = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/post/${postId}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            setValues({
                id: res.data.id,
                title: res.data.title,
                body: res.data.body,
                formData: new FormData()
             })
        }).catch(error => {
            console.log(error)
        })
    }

    const fetchPhoto = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/post/photo/${postId}`,
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

    const updatePost = post => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_SERVER}/api/post/update/${isAuthenticated().id}/${postId}`,
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${isAuthenticated().token}`
            },
            data: post
        })
    }

    useEffect(() => {
        fetchPost()
        fetchPhoto()
    }, [])

    const handleChange = name => e => {
        const value = name === 'image' ? e.target.files[0] : e.target.value
        formData.append('image', value)
        // array syntax to target all input fields
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setValues({ ...values, error: false })
        const post = { title, body }
        formData.append('post', new Blob([JSON.stringify(post)], { type: 'application/json' }))
        updatePost(formData).then(res => {
            setValues({ ...values, loading: false, title: '', body: '', redirectToProfile: true })
        }).catch(error => {
            console.log(error)
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

    const editPostForm = () => (
        <form className={classes.form} encType="multipart/form-data" noValidate>
            <img 
            src={photo} 
            alt={title} 
            onError={i => (i.target.src="https://www.flickr.com/photos/glaciernps/28806955114/in/album-72157670140016374/")}
            style={{ width: '100%', height: '200px' }} />
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
            Edit Post
            </Button>
        </form>
    )

    return (
        <Container maxWidth="xs">
        {redirectToProfile ? <Redirect to={`/`} /> : null}
        <div className={classes.paper}>
            {showLoading()}
            {showError()}
            <Typography component="h1" variant="h5">
                Edit Post
            </Typography>
            {editPostForm()}
        </div>
        </Container>
    )
}
