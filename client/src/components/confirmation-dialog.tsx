import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

interface Props {
  open: boolean;
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmationDialog(props: Props) {
  return (
    <Dialog open={props.open} onClose={props.onCancel}>
      <DialogContent>
        <DialogContentText>
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>Отказ</Button>
        <Button onClick={props.onConfirm} autoFocus>
          Ок
        </Button>
      </DialogActions>
    </Dialog>
  );
}
