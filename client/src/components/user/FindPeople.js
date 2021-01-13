import { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isAuthenticated } from '../../auth'
import FindPeopleCard from './FindPeopleCard'

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(10)
    }
  }));

export default function FindPeople() {
    const classes = useStyles()
    const [people, setPeople] = useState([])

    const findPeople = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/user/findpeople/${isAuthenticated().id}`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(res => {
            setPeople(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const toFollow = i => {
        let follow = people
        people.splice(i, 1)
        setPeople(follow)
    }

    useEffect(() => {
        findPeople()
    }, [setPeople])

    return (
        <div className={classes.root}>
            <Typography component="h1" variant="h5">
                Users
            </Typography>
            <Grid container spacing={4} style={{ marginTop: '1%', marginLeft: '1%' }}>
                {people ?
                people.map((person, i) => {
                    return <FindPeopleCard key={i} index={i} person={person} toFollow={i => toFollow(i)} />
                }) : []}
            </Grid>
        </div>
    )
}
