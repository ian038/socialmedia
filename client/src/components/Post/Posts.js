import { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isAuthenticated } from '../../auth'
import PostCard from './PostCard'

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(10)
    }
  }));

export default function Posts() {
    const classes = useStyles()
    const [posts, setPosts] = useState([])

    const fetchPosts = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/post/`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            setPosts(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchPosts()
    }, [setPosts])

    return (
        <div className={classes.root}>
            <Typography component="h1" variant="h5">
                Recent Posts
            </Typography>
            <Grid container spacing={4} style={{ marginTop: '1%', marginLeft: '1%' }}>
                {posts ?
                posts.map((post, i) => {
                    return <PostCard key={i} post={post} />
                }) : []}
            </Grid>
        </div>
    )
}
