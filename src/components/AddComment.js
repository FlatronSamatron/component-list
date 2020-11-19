import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import postsApi from '../utils/requests'

const AddComment = () => {

    const [open, setOpen] = useState(false);

    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const post = {
            userId,
            title,
            body
        }
        
        await postsApi.addPost(JSON.stringify(post))

        setUserId('')
        setTitle('')
        setBody('')
        setOpen(false);
    }

    const useStyles = makeStyles({
        button: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
            margin: '20px auto',
            display: 'block'
        },
        paper: {
            position: 'absolute',
            width: 400,
            border: '2px solid #000',
            padding: '16px 32px 24px',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
            transform: 'translate(-50%, 0)',
            top: '10%',
            left: '50%',
            background: '#fff'
        },
        form: {
            width: '100%', // Fix IE 11 issue.
        },
    });

    const classes = useStyles()

    return (
        <>
            <Button className={classes.button} onClick={handleOpen}>Add Post</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Typography component="h3" variant="h3" style={{padding:'40px 0',textAlign:'center'}}>
                        Add Comment
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="userId"
                                label="UserId"
                                name="userId"
                                onChange={(e)=>{setUserId(e.target.value)}}
                                value={userId}
            
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                onChange={(e)=>{setTitle(e.target.value)}}
                                value={title}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="text"
                                label="Text"
                                type="text"
                                id="text"
                                onChange={(e)=>{setBody(e.target.value)}}
                                value={body}
                            />
                            </Grid>
                        </Grid>
                        <Button className={classes.button} type="submit">Add Post</Button>
                        <Grid container justify="flex-end">
                        </Grid>
                        </form>
                    </div>
                </Container>
            </Modal>
        </>
    )
}

export default AddComment
