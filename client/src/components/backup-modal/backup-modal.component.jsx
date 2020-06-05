import React, { useState } from 'react';
import { 
  Button, 
  Form,
  Modal,
  Message
} from 'semantic-ui-react'

const BackupModal = ({ handleSubmit, handleChange, value }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);

  const checkForErrors = () => {
    const errors = [];

    if (value === '') {
      const error = {
        header: 'Invalid Name',
        content: 'You must supply a name for the backup you\'re creating.'
      }

      errors.push(error);
    }

    return errors;
  }

  const handleSubmitClick = (e) => {
    setErrors([]);
    const errors = checkForErrors();

    if (errors.length === 0) {
      setOpen(false);
      handleSubmit(e);
    } else {
      setErrors(errors);
    }
  }

  return (
    <Modal 
      as={Form}
      open={open}
      trigger={<Button onClick={() => setOpen(true)} primary>Create Backup</Button>}
      onSubmit={(e) => handleSubmitClick(e)}
    >
      <Modal.Header>Create a New Backup</Modal.Header>
      <Modal.Content>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder='Backup Name'
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
          {
            errors ? 
            errors.map(({header, content}, i) => {
              return (
                <Message negative key={i}>
                  <Message.Header>{header}</Message.Header>
                  <p>{content}</p>
                </Message>
              )
            }) :
            ''
          }
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        <Button type="submit" primary>Create Backup</Button>
        <Button color="red" onClick={() => setOpen(false)}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default BackupModal;
