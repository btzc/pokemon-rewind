import React, { useState } from 'react';
import { 
  Button,
  Modal 
} from 'semantic-ui-react'

const DeleteModal = ({handleClick}) => {
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(false);
    handleClick();
  }

  return (
    <Modal open={open} trigger={<Button onClick={() => setOpen(true)} color='red'>Delete Backup</Button>}>
      <Modal.Header>Delete this Backup</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          This is the danger zone. Once you do this you can't go back. With great power, comes great responsibility.
          If you choose to delete the backup, it will be gone forever. Are you sure you'd like to do this?
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => handleDeleteClick()}>Stop Lecturing Me Old Man</Button>
        <Button onClick={() => setOpen(false)}>Lemme Think On It</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default DeleteModal;
