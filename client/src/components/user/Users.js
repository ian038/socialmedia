import { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isAuthenticated } from '../../auth'
import UserCard from './UserCard'

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(10)
    }
  }));

export default function Users() {
    const classes = useStyles()
    const [users, setUsers] = useState([])

    const fetchUsers = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/user/`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            setUsers(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className={classes.root}>
            <Typography component="h1" variant="h5">
                Users
            </Typography>
            <Grid container spacing={4} style={{ marginTop: '1%', marginLeft: '1%' }}>
                {users.map((user, i) => {
                    return <UserCard key={i} user={user} />
                })}
            </Grid>
        </div>
    )
}
