import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalDefaultProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  action: () => void;
}

export default function ModalDefault({ title, children, open, setOpen, action }: ModalDefaultProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>fechar</Button>
          <Button onClick={action} autoFocus>
            concordar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
