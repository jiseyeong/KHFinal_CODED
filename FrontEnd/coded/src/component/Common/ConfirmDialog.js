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
    const setAlertCheck  = props.setAlertCheck;
    const navi = useNavigate();
    const test = ()=>{
      setAlertCheck(false)
    }
    const test2 = () => {
      navi("/login");
    }

    return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <DialogTitle>로그인 확인</DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={test}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography>로그인 후에 이용이 가능합니다</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={()=>{setAlertCheck(false)}}>
            취소
          </Button>
          <Button color="secondary" variant="contained" onClick={test2}>
            로그인
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmDialog;