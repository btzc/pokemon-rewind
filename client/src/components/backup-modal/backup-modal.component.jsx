import React from 'react';
import { 
  Button, 
  Form,
  Modal 
} from 'semantic-ui-react'

const BackupModal = ({ handleSubmit, handleChange, value }) => (
  <Modal 
    as={Form}
    trigger={<Button primary>Create Backup</Button>}
    onSubmit={(e) => handleSubmit(e)}
  >
    <Modal.Header>Create a New Backup</Modal.Header>
    <Modal.Content>
      <Form.Field>
        <label>Name</label>
        <input
          placeholder='Backup Name'
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required
        />
      </Form.Field>
    </Modal.Content>
    <Modal.Actions>
      <Button type="submit" primary>Create Backup</Button>
    </Modal.Actions>
  </Modal>
);

export default BackupModal;
