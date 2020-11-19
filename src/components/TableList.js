import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import ModalContainer from './ModalContainer'


const TableList = ({data}) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [postInfo,setPostInfo] = useState([])

    const [open, setOpen] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpen = (post) => {
        setPostInfo(post)
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { id: 'userId', label: 'User Id', minWidth: 50 },
        { id: 'title', label: 'Title', minWidth: 100 },
        { id: 'body', label: 'Text', minWidth: 170 }
    ];

    
    const rows = data.map((row)=>{
        const {id, userId, title, body} = row
        return {id, userId, title, body }
    })

    const useStyles = makeStyles({
        root: {
          width: '80%',
          margin: 'auto'
        },
        container: {
          maxHeight: 550,
        }
    });
    
    const classes = useStyles()

    return (
    <>
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const post = [row.id,row.userId,row.title,row.body]
                    return (
                        <TableRow style={{cursor:'pointer'}} hover key={row.id} onClick={()=>handleOpen(post)}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        <ModalContainer 
            open={open}
            handleClose={()=>handleClose()}
            postInfo={postInfo}
        />  
    </>
    )
}

export default TableList
