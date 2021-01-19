import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, Typography, CardActionArea, CardActions, CardMedia, Box } from '@material-ui/core'
import { isAuthenticated } from '../../auth'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(13),
    },
    card: {
        maxHeight: 450,
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(1),
    }
}))

export default function SinglePost() {
    const classes = useStyles()
    const [post, setPost] = useState("")
    const [photo, setPhoto] = useState("")
    const { postId } = useParams()
    const posterId = post.postedBy ? `/user/${post.postedBy.id}` : ""
    const posterName = post.postedBy ? post.postedBy.username : "Unknown"

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
            setPost(res.data)
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
            // if photo does not exist, set default photo
            if(error) {
                setPhoto("https://www.flickr.com/photos/glaciernps/28806955114/in/album-72157670140016374/")
            }
        })
    }

    useEffect(() => {
        fetchPost()
        fetchPhoto()
    }, [])

    return (
        <div className={classes.root}>
            <Typography variant="h6" component="h6" style={{ textAlign: 'center' }}>
                {post.title}             
            </Typography>
            <Card variant="outlined" className={classes.card}>
                <CardActionArea>
                    <CardMedia 
                    component="img"
                    image={photo}
                    height="300px"
                    width="100%"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.body}
                        </Typography>
                        <br/>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Box fontStyle="italic">
                                Posted by <Link to={posterId} >{posterName}</Link> on {new Date(post.created).toDateString()}
                            </Box>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                     <Button size="small" variant="contained" color="primary" to={`/`} component={Link}>
                        Home
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
