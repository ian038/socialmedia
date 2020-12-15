import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography, CardActionArea, CardActions, CardMedia, Grid } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    body: {
        justifyContent: 'space-between'
    },
    card: {
        maxHeight: 450
    }
})


export default function UserCard({ user }) {
    const classes = useStyles()

    return (
        <Grid item xs={2}> 
            <Card variant="outlined" className={classes.card}>
                <CardActionArea>
                    <CardMedia 
                    component="img"
                    image="https://cdn2.iconfinder.com/data/icons/teen-people-face-avatar-6/500/teen_109-512.png"
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
                </CardActionArea>
                <CardActions>
                     <Button size="small" color="primary" to={`/user/${user.id}`} component={Link}>
                        View Profile
                    </Button>
                </CardActions>
                </Card>
        </Grid>
    )
}