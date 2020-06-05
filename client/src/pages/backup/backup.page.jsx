import React, { useState, useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';
import { 
  Link
} from 'react-router-dom';
import axios from 'axios';

import DeleteModal from '../../components/delete-modal/delete-modal.component';

import { 
  Container, 
  Header,
  Grid,
  Divider,
  Image,
  Button
} from 'semantic-ui-react';

const Backup = () => {
  const { backupId } = useParams();
  const [backup, setBackup] = useState({_id: '', name: '', cards: [], date: new Date()});

  const getBackupData = async () => {
    const resp = await axios.get(`http://localhost:4000/api/backup/${backupId}`);

    setBackup(resp.data);
  }

  const handleClick = async () => {
    const resp = await axios.delete(`http://localhost:4000/api/backup/${backupId}`);

    if (resp.data.ok === 1 && resp.data.deletedCount === 1) {
      window.location.href = 'http://localhost:3000/';
    }
  }

  useEffect(() => {
    getBackupData();
  }, []);

  return (
    <Container>
      <Header as='h1'>{ backup.name }</Header>
      <Divider />
      <Button as={Link} to={`/${backupId}/search`} primary>Advanced Search</Button>
      <DeleteModal 
        handleClick={handleClick}
      />
      <Divider />
      {
        backup.cards ?
        <Grid>
          <Grid.Row columns={3}>
          {
            backup.cards.map(({_id, imageUrl}) => {
              return (
                <Grid.Column key={_id}>
                  <Image src={imageUrl} />
                </Grid.Column>
              )
            })
          } 
          </Grid.Row>
        </Grid> :
        <p>There's no data! Or it's invisible. Spooky.</p>
      }
    </Container>
  );
}
export default Backup;
