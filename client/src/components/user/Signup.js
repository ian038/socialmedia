import { useState } from 'react'
import { Avatar, Button, TextField, Link,  Grid, Typography, Container } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
export default function Signup() {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    const { username, email, password, error, success } = values

    // higher order function to target name and event of form
    const handleChange = name => e => {
        // array syntax to target all input fields
        setValues({ ...values, success: false, [name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setValues({ ...values, error: false })
        const user = { username, email, password }
        console.log(user)
    }

    const signUpForm = () => (
        <form className={classes.form} noValidate>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            type="text"
            autoComplete="username"
            onChange={handleChange("username")}
            value={username}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            onChange={handleChange("email")}
            value={email}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange("password")}
            value={password}
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            >
            Sign Up
            </Button>
            <Grid container>
                <Grid item>
                    <Link href="/signin" variant="body2">
                    {"Already have an account? Sign In"}
                    </Link>
                </Grid>
            </Grid>
        </form>
    )

    return (
        <Container maxWidth="xs">
        <div className={classes.paper}>
            {/* {showError()}
            {showLoading()} */}
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            {signUpForm()}
        </div>
        </Container>
    
    )
}
