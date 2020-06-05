import React, { useState } from 'react';
import axios from 'axios';
import {
  useParams
} from 'react-router-dom';

import { 
  Container, 
  Header,
  Grid,
  Divider,
  Image,
  Button,
  Form
} from 'semantic-ui-react';

const Search = () => {
  const { backupId } = useParams();

  const [results, setResults] = useState([]);
  const [name, setName] = useState('');
  const [hp, setHp] = useState('');
  const [rarity, setRarity] = useState('');

  const handleSubmit = async (e) => {
    const queryList = [];
    if (name.length > 0) {
      queryList.push(`name=${name}`);
    }
    if (hp.length > 0) {
      queryList.push(`hp=${hp}`);
    }
    if (rarity.length > 0) {
      queryList.push(`rarity=${rarity}`);
    }

    const query = queryList.join('&');

    const resp = await axios.get(`http://localhost:4000/api/search/${backupId}?${query}`);

    setResults(resp.data);
  }

  return (
    <Container>
      <Header as='h1'>Search</Header>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Name'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Input
            fluid
            label='HP'
            placeholder='HP'
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
          <Form.Input
            fluid
            label='Rarity'
            placeholder='Rarity'
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
          />
        </Form.Group>
        <Form.Field color="blue" control={Button}>Submit</Form.Field>
      </Form>
      <Divider />
      <Grid>
        <Grid.Row columns={3}>
        {
          results.map(({_id, imageUrl}) => {
            return (
              <Grid.Column key={_id}>
                <Image src={imageUrl} />
              </Grid.Column>
            )
          })
        } 
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Search;
