import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, TextField, Link, Typography, Container } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { resetPassword } from '../../auth'

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

export default function ResetPassword() {
    const classes = useStyles()
    const [values, setValues] = useState({
        password: '',
        message: '',
        success: false,
        error: ''
    })
    const { userId, token } = useParams()
    const { password, message, success, error } = values

    const handleChange = e => {
        setValues({ ...values, success: false, password: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const resetInfo = { userId, token, password }
        resetPassword(resetInfo).then(res => {
            console.log(res.data)
            setValues({ ...values, message: res.data, success: true, error: false })
        }).catch(error => {
            console.log(error.response)
            setValues({ ...values, success: false, error: error.response.data })
        })
    }

    const showError = () => (
        <Alert severity="error" style={{ display: error ? '' : 'none' }}>
            {error}
        </Alert>
    )

    const showSuccess = () => (
        <Alert severity="success" style={{ display: success ? '' : 'none' }}>
            {message} Please <Link href="/signin" variant="body2" >Sign In</Link>
        </Alert>
    )

    return (
        <Container maxWidth="xs">
        <div className={classes.paper}>
            {showError()}
            {showSuccess()}
            <Typography component="h1" variant="h5">
                Reset Password
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={password}
                />
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit}>
                    Submit
                </Button>
            </form>
        </div>
        </Container>
    )
}
