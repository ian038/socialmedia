import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, Typography, CardActions, CardMedia, Grid, Box } from '@material-ui/core'
import { isAuthenticated } from '../../auth'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    body: {
        justifyContent: 'space-between'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    }
}))

export default function PostCard({ post }) {
    const classes = useStyles()
    const[photo, setPhoto] = useState("")
    const posterId = post.postedBy ? `/user/${post.postedBy.id}` : ""
    const posterName = post.postedBy ? post.postedBy.username : "Unknown"
    
    const fetchPhoto = id => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/post/photo/${id}`,
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
        fetchPhoto(post.id)
    }, [])

    return (
        <Grid item xs={12} sm={6} md={4}> 
            <Card variant="outlined" className={classes.card}>
                    <CardMedia 
                    component="img"
                    image={photo}
                    height="200px"
                    width="100%"
                    />
                    <CardContent>
                        <Typography variant="h6" component="h6" style={{ marginBottom: '5%' }}>
                            {post.title}             
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.body.substring(0, 25)}
                        </Typography>
                        <br/>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Box fontStyle="italic">
                                Posted by <Link to={posterId} >{posterName}</Link> on {new Date(post.created).toDateString()}
                            </Box>
                        </Typography>
                    </CardContent>
                <CardActions>
                     <Button size="small" variant="contained" color="primary" to={`/post/${post.id}`} component={Link}>
                        Read More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
