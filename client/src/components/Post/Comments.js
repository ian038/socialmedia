import { useState } from 'react'
import { TextField, Typography, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import axios from 'axios'
import { isAuthenticated } from '../../auth'
import Comment from './Comment'

export default function Comments({ postId, comments, updateComments }) {
    const[values, setValues] = useState({
        text: '',
        error: ''
    })
    const { text, error } = values

    const addComment = comment => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_SERVER}/api/post/comment/${isAuthenticated().id}/${postId}`,
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${isAuthenticated().token}`
            },
            data: comment
        })
    }

    const handleChange = e => {
        setValues({ ...values, text: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const comment = { text }
        addComment(comment).then(res => {
            setValues({ ...values, text: '' })
            updateComments(res.data.comments)
        }).catch(error => {
            setValues({ ...values, error: error.response.data.details })
        })
    }

    const showError = () => (
        <Alert severity="error" style={{ display: error ? '' : 'none' }}>
            {error}
        </Alert>
    )

    return (
        <div>
            {showError()}
            <form onSubmit={handleSubmit}>
                <TextField
                style={{ width: '75%' }}
                label="Leave a comment..."
                type="text"
                autoComplete="text"
                onChange={handleChange}
                value={text}
                />
                <Button size="small" variant="contained" color="primary" style={{ marginTop: '4%', marginLeft: '3%' }} onClick={handleSubmit}>
                    Post
                </Button>
            </form>
            <div>
                <Typography variant="h6" component="h1">
                    {comments.length} Comments
                </Typography>
                {comments ?
                    comments.map((comment, i) => {
                        return <Comment key={i} comment={comment} comments={comments} updateComments={updateComments} />      
                    }) : []}
            </div>
        </div>
    )
}
