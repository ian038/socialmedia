import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Grid } from '@material-ui/core'

export default function Following({following}) {
    return (
        <div>
            <Link to={`${process.env.REACT_APP_SERVER}/api/user/${following.id}`}>
                <Grid container spacing={6}>
                    <Grid item xs={3}>
                            <img src={`${process.env.REACT_APP_SERVER}/api/user/photo/${following.id}`} 
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
