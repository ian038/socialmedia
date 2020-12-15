import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(10),
    }
  }));

export default function Users() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography component="h1" variant="h5">
                Users
            </Typography>
        </div>
    )
}
