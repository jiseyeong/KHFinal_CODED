import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const ConfirmDialog = (props) => {
  const setAlertCheck = props.setAlertCheck;
  const navi = useNavigate();
  const test = () => {
    setAlertCheck(false);
  };
  const test2 = () => {
    navi('/login');
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>MEMBER-ONLY SERVICE!</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={test}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>로그인 후 이용해주세요</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            setAlertCheck(false);
          }}
        >
          cancel
        </Button>
        <Button color="secondary" variant="contained" onClick={test2}>
          login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
