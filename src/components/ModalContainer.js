import React,{useState,useEffect} from 'react'

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import postsApi from '../utils/requests'

const ModalContainer = ({open,handleClose,postInfo}) => {

    const[edit, setEdit] = useState(false)

    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
       if(!edit){
            setUserId(postInfo[1])
            setTitle(postInfo[2])
            setBody(postInfo[3])
       }
    }, [edit, postInfo])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setEdit(true)

        if(edit){
            const put = {
                id: postInfo[0],
                title,
                body,
                userId,
            }

            await postsApi.editPost(JSON.stringify(put),postInfo[0])
            setEdit(false)
            handleClose(false)
        }
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
        textArea: {
            width: '100%',
            boxSizing: 'border-box', 
            border: 'solid 1px #C6C4C6',
            borderRadius: '5px',
            padding: '15px',
            fontSize: '17px',
            color:'#232123'
        },
        form: {
            width: '100%', // Fix IE 11 issue.
        },
    });

    const classes = useStyles()


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Typography component="h3" variant="h3" style={{padding:'40px 0',textAlign:'center'}}>
                        {edit ? 'Edit Post' : 'Post Info' }
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                style={!edit ? {pointerEvents:'none'} : {pointerEvents:'auto'}}
                                variant="outlined"
                                fullWidth
                                id="userId"
                                label="UserId"
                                name="userId"
                                value={userId}
                                onChange={(e)=>{setUserId(e.target.value)}}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                value={title}
                                onChange={(e)=>{setTitle(e.target.value)}}
                                style={!edit ? {pointerEvents:'none'} : {pointerEvents:'auto'}}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12}>
                            <TextareaAutosize className={classes.textArea}
                                variant="outlined"
                                name="text"
                                label="Text"
                                type="text"
                                id="text"
                                value={body}
                                onChange={(e)=>{setBody(e.target.value)}}
                                style={!edit ? {pointerEvents:'none'} : {pointerEvents:'auto'}}
                            />
                            </Grid>
                        </Grid>
                        <Button className={classes.button} type="submit">{edit ? 'Put Post' : 'Edit Post'}</Button>
                        <Grid container justify="flex-end">
                        </Grid>
                        </form>
                    </div>
                </Container>
        </Modal>
    )
}

export default ModalContainer
