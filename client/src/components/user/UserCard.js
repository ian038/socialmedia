import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography, CardActions, CardMedia, Grid } from '@material-ui/core'
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

export default function UserCard({ user }) {
    const classes = useStyles()
    const[photo, setPhoto] = useState("")
    
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
        fetchPhoto(user.id)
    }, [])

    return (
        <Grid item xs={12} sm={6} md={4}> 
            <Card variant="outlined" className={classes.card}>
                    <CardMedia 
                    component="img"
                    image={photo}
                    height="250"
                    />
                    <CardContent>
                        <Typography variant="h6" component="h6">
                            {user.username}             
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {user.email}
                        </Typography>
                    </CardContent>
                <CardActions>
                     <Button size="small" color="primary" to={`/user/${user.id}`} component={Link}>
                        View Profile
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}