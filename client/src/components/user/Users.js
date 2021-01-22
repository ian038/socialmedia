import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isAuthenticated } from '../../auth'
import UserCard from './UserCard'

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(3)
    },
    cardGrid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
  }));

export default function Users() {
    const classes = useStyles()
    const [users, setUsers] = useState([])

    const fetchUsers = () => {
        axios({
            method: 'get',
            url: `/api/user/`,
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
    }, [setUsers])

    return (
        <div className={classes.root}>
            <Typography component="h1" variant="h5" align="center">
                Users
            </Typography>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    { users ?
                    users.map((user, i) => {
                        return <UserCard key={i} user={user} />
                    }) : []}
                </Grid>
            </Container>
        </div>
    )
}
