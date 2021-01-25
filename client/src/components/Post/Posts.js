import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isAuthenticated } from '../../auth'
import PostCard from './PostCard'

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(5)
    },
    cardGrid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
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
            <Typography component="h1" variant="h5" align="center">
                Recent Posts
            </Typography>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {posts ?
                    posts.map((post, i) => {
                        return <PostCard key={i} post={post} />
                    }) : []}
                </Grid>
            </Container>
        </div>
    )
}
