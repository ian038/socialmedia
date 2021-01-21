import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography, CardActionArea, CardActions, CardMedia, Grid } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { isAuthenticated } from '../../auth'

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    body: {
        justifyContent: 'space-between'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
})

export default function FindPeopleCard({ person, toFollow, index }) {
    const classes = useStyles()
    const[photo, setPhoto] = useState("")
    const [error, setError] = useState("")
    const [followMessage, setFollowMessage] = useState("")
    
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

    const handleFollow = () => {
        axios({
            method: 'put',
            url: `${process.env.REACT_APP_SERVER}/api/user/follow/${isAuthenticated().id}/${person.id}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            if(res.data) {
                toFollow(index)
                setFollowMessage(`Following ${person.username}`)
                setTimeout(function () {
                    window.location.reload()
                }, 2000)
            }
        }).catch(error => {
            setError(error.res)
        })
    }

    const showFollowMessage = () => (
        <Alert severity="success" style={{ display: followMessage ? '' : 'none' }}>
            {followMessage}
        </Alert>
    )

    useEffect(() => {
        fetchPhoto(person.id)
    }, [])

    return (
        <Grid item xs={12} sm={6} md={4}> 
        {showFollowMessage()}
        <Card variant="outlined" className={classes.card}>
            <CardActionArea>
                <CardMedia 
                component="img"
                image={photo}
                height="250"
                />
                <CardContent>
                    <Typography variant="h6" component="h6">
                        {person.username}             
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" to={`/user/${person.id}`} component={Link}>
                    View Profile
                </Button>
                <Button size="small" color="primary" component={Link} onClick={handleFollow}>
                    Follow
                </Button>
            </CardActions>
            </Card>
        </Grid>
    )
}
