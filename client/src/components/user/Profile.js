import { useState, useEffect } from 'react'
import { useParams, Redirect, Link } from 'react-router-dom'
import { Button, Grid, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { signout, isAuthenticated } from '../../auth'
import Following from './Following'
import Follower from './Follower'

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(3),
    },
    grid: {
        justifyContent: 'center'
    }
  }));

export default function Profile() {
    const classes = useStyles();
    const [user, setUser] = useState("")
    const [photo, setPhoto] = useState("")
    const [posts, setPosts] = useState([])
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const [redirect, setRedirect] = useState(false)
    let [following, setFollowing] = useState(false)
    const { userId } = useParams()

    const checkFollow = user => {
        const match = user.followers.find(follower => {
            return follower.id === isAuthenticated().id
        })
        return match
    }

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
            setUser(res.data)
            if(checkFollow(res.data)) {
                setFollowing(true)
            }
        }).catch(error => {
            // user not authenticated, redirect
            if(error) {
                setRedirectToSignin(true)
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

    const fetchPostByUser = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/post/by/${userId}`,
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
        fetchUser()
        fetchPhoto()
        fetchPostByUser()
    }, [])

    const deleteAccount = () => {
        axios({
            method: 'delete',
            url: `${process.env.REACT_APP_SERVER}/api/user/delete/${userId}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            signout(() => console.log("User deleted successfully!"))
            setRedirect(true)
        }).catch(error => {
            console.log(error)
        })
    }

    const confirmDelete = () => {
        let answer = window.confirm("Are you sure you want to delete your account?")
        if(answer) {
            deleteAccount()
        } 
    }

    const handleFollow = () => {
        axios({
            method: 'put',
            url: `${process.env.REACT_APP_SERVER}/api/user/follow/${isAuthenticated().id}/${userId}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            setFollowing(!following)
        }).catch(error => {
            console.log(error)
        })
    }

    const handleUnfollow = () => {
        axios({
            method: 'put',
            url: `${process.env.REACT_APP_SERVER}/api/user/unfollow/${isAuthenticated().id}/${userId}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            setFollowing(!following)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={classes.root}>
            {redirectToSignin ? <Redirect to='/signin' /> : null}
            {redirect ? <Redirect to='/' /> : null}
            <Grid container spacing={5} className={classes.grid}>
                <Grid item xs={3}>
                    <Typography component="h1" variant="h5">
                        Profile
                    </Typography>
                    <img 
                    src={photo} 
                    alt={user.username} 
                    onError={i => (i.target.src="https://cdn2.iconfinder.com/data/icons/teen-people-face-avatar-6/500/teen_109-512.png")}
                    style={{ width: 'auto', height: '200px' }} />
                    <hr />
                    <Typography variant="subtitle1" component="p">
                        {user.about}
                    </Typography>
                    <hr />
                    <div style={{ marginTop: '4%' }}>
                        <Typography variant="h6" component="h1">
                            Followers
                        </Typography>
                        {user.followers ?
                        user.followers.map((follower, i) => {
                            return <Follower key={i} follower={follower} />
                        }) : []}
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ marginTop: '10%' }}>
                        <Typography variant="subtitle1" component="p">
                            Hello {user.username}
                        </Typography>
                        <Typography variant="subtitle1" component="p">
                            Email: {user.email}
                        </Typography>
                        <Typography variant="subtitle1" component="p">
                            Joined: {new Date(user.createdDate).toDateString()}
                        </Typography>
                    </div>
                    {isAuthenticated().id === userId ? (
                        <div style={{ marginTop: '5%', marginBottom: '1%' }}>
                            <Button variant="contained" href={`/post/create`} style={{ marginRight: '5%' }}>
                                Create Post
                            </Button>
                            <Button variant="contained" color="primary" href={`/user/edit/${userId}`}>
                                Edit Profile
                            </Button>
                            <Button variant="contained" color="secondary" style={{ marginLeft: '5%' }} onClick={confirmDelete}>
                                Delete Profile
                            </Button>
                        </div>
                    ) : (
                        <div style={{ marginTop: '5%', marginBottom: '1%' }}>
                            {!following ? <Button variant="contained" color="primary" onClick={handleFollow}>
                                Follow
                            </Button> : 
                            <Button variant="contained" color="secondary" onClick={handleUnfollow}>
                                Unfollow
                            </Button>
                            }
                        </div>
                    )}
                    <div style={{ marginTop: '16%' }}>
                        <Typography variant="h6" component="h1">
                            Following
                        </Typography>
                        {user.following ?
                        user.following.map((following, i) => {
                            return <Following key={i} following={following} />
                        }) : []}
                    </div>
                </Grid>
                <Grid item xs={3} style={{ marginTop: '16%' }}>
                    <Typography variant="h6" component="h1">
                        Posts
                    </Typography>
                    {posts ?
                        posts.map((post, i) => {
                            return <div key={i}>
                                <Link to={`/post/${post.id}`}>
                                    <Typography variant="h6" component="h6">
                                        <Box fontWeight="fontWeightBold">
                                            {post.title}             
                                        </Box>
                                    </Typography>
                                </Link>
                            </div>
                        }) : []}
                </Grid>
            </Grid>
        </div>  
    )
}
