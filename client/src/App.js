import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { Container } from 'semantic-ui-react';

import Home from './pages/home/home.page';
import Backup from './pages/backup/backup.page';


function App() {
  return (
    <Container>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/:collectionId'>
          <Backup />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
