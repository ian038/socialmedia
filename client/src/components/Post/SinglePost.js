import { useState, useEffect } from 'react'
import { useParams, Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, Typography, CardActions, CardMedia, Box } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import { isAuthenticated } from '../../auth'
import Comments from './Comments'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
    },
    card: {
        height: "100%",
        maxWidth: 500,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(1),
    }
}))

export default function SinglePost() {
    const classes = useStyles()
    const [post, setPost] = useState("")
    const [photo, setPhoto] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [like, setLike] = useState(false)
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState([])
    const { postId } = useParams()
    const posterId = post.postedBy ? post.postedBy.id : ""
    const posterName = post.postedBy ? post.postedBy.username : "Unknown"

    const checkLike = likes => {
        let match
        for(let like of likes) {
            match = like.id === isAuthenticated().id
        }
        return match
    }

    const fetchPost = () => {
        axios({
            method: 'get',
            url: `/api/post/${postId}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            setPost(res.data)
            setLikes(res.data.likes.length)
            setLike(checkLike(res.data.likes))
            setComments(res.data.comments)
        }).catch(error => {
            console.log(error)
        })
    }

    const fetchPhoto = () => {
        axios({
            method: 'get',
            url: `/api/post/photo/${postId}`,
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

    const confirmDelete = () => {
        let answer = window.confirm("Are you sure you want to delete your post?")
        if(answer) {
            deletePost()
        } 
    }

    const likeToggle = async () => {
        let callApi = like ? 
        await axios({
            method: 'put',
            url: `/api/post/unlike/${isAuthenticated().id}/${postId}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            setLike(!like)
            setLikes(res.data.likes.length)
        }).catch(error => {
            console.log(error)
        }) 
        :         
        await axios({
            method: 'put',
            url: `/api/post/like/${isAuthenticated().id}/${postId}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            setLike(!like)
            setLikes(res.data.likes.length)
        }).catch(error => {
            console.log(error)
        })
        return callApi
    }

    const updateComments = comments => {
        setComments(comments)
    }

    const deletePost = () => {
        axios({
            method: 'delete',
            url: `/api/post/delete/${isAuthenticated().id}/${postId}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            setRedirect(true)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchPost()
        fetchPhoto()
    }, [])

    return (
        <div className={classes.root}>
            {redirect ? <Redirect to='/' /> : null}
            <Typography variant="h6" component="h6" style={{ textAlign: 'center' }}>
                {post.title}             
            </Typography>
            <Card variant="outlined" className={classes.card}>
                <CardMedia 
                component="img"
                image={photo}
                height="300px"
                width="100%"
                />
                <CardContent>
                    <h2 onClick={likeToggle} style={{ display: 'flex', alignItems: 'center' }}>
                        <ThumbUpIcon style={{ marginRight: '1%' }} />
                        {likes} likes
                    </h2>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post.body}
                    </Typography>
                    <br/>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <Box fontStyle="italic">
                            Posted by <Link to={`/user/${posterId}`} >{posterName}</Link> on {new Date(post.created).toDateString()}
                        </Box>
                    </Typography>
                </CardContent>
                <CardActions>
                {isAuthenticated().id === posterId && (
                    <>
                        <Button size="small" variant="contained" color="primary" to={`/`} component={Link}>
                            Home
                        </Button>
                        <Button size="small" variant="contained" color="primary" href={`/post/edit/${isAuthenticated().id}/${postId}`}>
                            Edit Post
                        </Button>
                        <Button size="small" variant="contained" color="secondary" onClick={confirmDelete}>
                            Delete Post
                        </Button>
                    </>
                    )}
                </CardActions>
                <Comments postId={postId} comments={comments} updateComments={updateComments} />
            </Card>
        </div>
    )
}
