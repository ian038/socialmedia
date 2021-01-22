import { useState } from 'react'
import { forgotPassword } from '../../auth'
import { TextField, Container, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))

export default function ForgotPassword() {
    const classes = useStyles()
    const [values, setValues] = useState({
        email: '',
        success: false,
        error: ''
    })
    const { email, success, error } = values

    const handleChange = e => {
        setValues({ ...values, success: false, email: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        forgotPassword(email).then(res => {
            console.log(res.data)
        }).catch(error => {
            console.log(error.response)
            // setValues({ ...values, success: false, error: error.response.data })
        })
    }

    const showError = () => (
        <Alert severity="error" style={{ display: error ? '' : 'none' }}>
            {error}
        </Alert>
    )

    const showSuccess = () => (
        <Alert severity="success" style={{ display: success ? '' : 'none' }}>
            An email has been sent to you. Please follow the instructions in the email.
        </Alert>
    )

    return (
        <Container maxWidth="xs">
        <div className={classes.paper}>
            {showError()}
            {showSuccess()}
            <Typography component="h1" variant="h5">
                Forgot Password?
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                autoComplete="email"
                onChange={handleChange}
                value={email}
                />
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit}>
                    Submit
                </Button>
            </form>
        </div>
        </Container>
    )
}
