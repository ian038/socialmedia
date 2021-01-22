import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Grid } from '@material-ui/core'
import axios from 'axios'
import { isAuthenticated } from '../../auth'

export default function Following({ following }) {
    const[photo, setPhoto] = useState("")
    
    const fetchPhoto = id => {
        axios({
            method: 'get',
            url: `/api/user/photo/${id}`,
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
        fetchPhoto(following.id)
    }, [])

    return (
        <div>
            <Link onClick={() => window.location.href=`/user/${following.id}`}>
                <Grid container spacing={6}>
                    <Grid item xs={3}>
                            <img src={photo} 
                            alt={following.username} 
                            onError={i => (i.target.src="https://cdn2.iconfinder.com/data/icons/teen-people-face-avatar-6/500/teen_109-512.png")} 
                            style={{ width: 'auto', height: '100px', borderRadius: '50%', border: '1px solid black' }}
                            />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" component="h6">
                            {following.username}
                        </Typography>
                    </Grid>
                </Grid>
            </Link>
        </div>
    )
}
