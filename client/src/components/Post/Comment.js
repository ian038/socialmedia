import { useState, useEffect } from 'react'
import { Button, Box, Typography, Grid } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { isAuthenticated } from '../../auth'

export default function Comment({ comment, comments, updateComments }) {
    const[photo, setPhoto] = useState("")
    const { postId } = useParams()
    
    const fetchPhoto = id => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/user/photo/${id}`,
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
                setPhoto("https://cdn2.iconfinder.com/data/icons/teen-people-face-avatar-6/500/teen_109-512.png")
            }
        })
    }

    useEffect(() => {
        fetchPhoto(comment.postedBy.id)
    }, [])

    const confirmDelete = () => {
        let answer = window.confirm("Are you sure you want to delete your comment?")
        if(answer) {
            deleteComment()
        } 
    }

    const deleteComment = () => {
        axios({
            method: 'put',
            url: `${process.env.REACT_APP_SERVER}/api/post/uncomment/${comment.id}/${postId}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            updateComments(res.data.comments)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <Grid container spacing={6}>
                <Grid item xs={4}>
                    <Link to={`/user/${comment.postedBy.id}`}>
                        <img src={photo} 
                        alt={comment.postedBy.username} 
                        onError={i => (i.target.src="https://cdn2.iconfinder.com/data/icons/teen-people-face-avatar-6/500/teen_109-512.png")} 
                        style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid black' }}
                        />
                    </Link>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">
                        {comment.text}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <Box fontStyle="italic">
                            Posted by <Link to={`/user/${comment.postedBy.id}`} >{comment.postedBy.username}</Link> on {new Date(comment.created).toDateString()}
                        </Box>
                    </Typography>
                    {isAuthenticated().id === comment.postedBy.id && (
                    <>
                        <Button size="small" variant="contained" color="secondary" onClick={confirmDelete}>
                            Remove
                        </Button>
                    </>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}
