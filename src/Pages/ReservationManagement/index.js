import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DescriptionAlerts from '../../Components/AlertMsg/Alert';

const ReservationManagement = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedReservation, setSelectedReservation] = useState({});
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch reservations data from the API when the component mounts
    axios.get('/reservation')
      .then((res) => {
        setReservations(res.data);
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 401) {
          navigate('/');
        }
      });
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const editButtonClicked = (reservation) => {
    setSelectedReservation(reservation);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewStatus('');
    setSelectedReservation({});
  };

  const handleOpenDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteDialogOpen(false);
    setDeleteId('');
  };

  const deleteButtonClicked = (id) => {
    setDeleteId(id);
  };

  useEffect(() => {
    if (deleteId) {
      handleOpenDelete();
    }
  }, [deleteId]);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdate = () => {
    axios.put(`/reservation/${selectedReservation.id}`, {
      ...selectedReservation,
      status: newStatus,
    })
      .then((response) => {
        console.log(response);
        setNewStatus('');
        setSelectedReservation({});
        handleClose();
        setSeverity('success');
        setAlertMessage('Reservation status has been updated successfully');
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 401) {
          navigate('/');
        }
      });
  };

  const handleDelete = () => {
    axios.delete(`/reservation/${deleteId}`)
      .then((response) => {
        setDeleteId('');
        handleCloseDelete();
        setSeverity('success');
        setAlertMessage('Reservation deleted successfully');
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.error(err);
        setSeverity('error');
        setAlertMessage(err.response.data.message);
        setOpenSnackbar(true);
        if (err.response.status === 401) {
          navigate('/');
        }
      });
  };

  return (
    <Box>
      <DescriptionAlerts openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} severity={severity} alertMessage={alertMessage} />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '30px', mb: '30px', ml: '30px', mr: '30px' }}>
        <TableContainer component={Paper} align='center'>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="left">UserId</TableCell>
                <TableCell align="left">TrainID</TableCell>
                <TableCell align="left">reservationDate</TableCell>
                <TableCell align="left">Reservation Status</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell component="th" scope="row">{reservation.userID}</TableCell>
                  <TableCell>{reservation.trainID}</TableCell>
                  <TableCell>{reservation.reservationDate}</TableCell>
                  <TableCell>{reservation.status}</TableCell>
                  <TableCell>{reservation.status}</TableCell>
                  <TableCell>
                    <Button
                      sx={{ color: 'black', textTransform: 'capitalize' }}
                      onClick={() => editButtonClicked(reservation)}
                    >
                      {reservation.status ? 'Active' : 'Inactive'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{ color: 'black', textTransform: 'capitalize' }}
                      onClick={() => handleUpdate()}
                    >
                      <ChangeCircleIcon />
                    </Button>
                    <Button
                      sx={{
                        borderRadius: '5px',
                        width: '40px',
                        height: '30px',
                      }}
                      onClick={() => deleteButtonClicked(reservation.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Reservation Status</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup
              onChange={handleStatusChange}
              value={newStatus}
            >
              <FormControlLabel value='active' control={<Radio />} label='Active' />
              <FormControlLabel value='inactive' control={<Radio />} label='Inactive' />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update Status</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleCloseDelete}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this reservation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ReservationManagement;
