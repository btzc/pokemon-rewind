import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { 
  Container, 
  Header,
  Grid,
  Divider
} from 'semantic-ui-react';

import BackupOverview from '../../components/backup-overview/backup-overview.component';
import BackupModal from '../../components/backup-modal/backup-modal.component';

const Home = () => {
  const [backup, setBackup] = useState([]);
  const [backupName, setBackupName] = useState('');

  useEffect(() => {
    getBackups();
  }, []);

  const getBackups = async () => {
    try {
      const resp = await axios.get('http://localhost:4000/api/backups');

      if (!resp.data.err) {
        setBackupName('');
        setBackup(resp.data);
      } else {
        throw new Error(resp.data.err);
      }
    } catch (err) {
      console.log(err);
    }

  }

  const createNewBackup = async () => {
    try {
      const resp = await axios.post('http://localhost:4000/api/backups/create', {
        name: backupName
      });

      if (!resp.data.err) {
        const newBackup = resp.data;
        setBackupName('');
        setBackup(backup.concat(newBackup));
      } else {
        throw new Error(resp.data.err);
      }
    } catch(err) {
      console.log(err);
    }

  }

  const handleSubmit = (event) => {
    createNewBackup();
  }

  const handleChange = (value) => {
    setBackupName(value);
  }
  
  return (
    <Container>
      <Header as='h1'>Home</Header>
      <BackupModal
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        value={backupName}
      />
      <Divider />
      {
        backup.length > 0 ? 
        <Grid>
          <Grid.Row columns={3}>
            {
              backup.map(({date, name, _id, cards}) =>
                <React.Fragment key={_id}>
                  <Grid.Column>
                    <BackupOverview 
                      date={date}
                      cards={cards}
                      _id={_id}
                      name={name}
                    />
                  </Grid.Column>
                </React.Fragment>
              )
            }
          </Grid.Row>
        </Grid> :
        <p>Uhoh! No backups were found. Please create a backup!</p>

      }
    </Container>
  );
}

export default Home;
