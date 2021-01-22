import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import background from '../assets/toa-heftiba-fbCxL_wEo5M-unsplash.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
    height: '100vh'
    },
    image: {
        height: '100%',
        width: '100%'
    }
  }))

export default function LandingPage() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <CssBaseline />
            <img 
            src={background}
            className={classes.image}
            alt="Landing"
            />
        </div>
    )
}
