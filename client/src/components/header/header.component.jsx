import React from 'react';
import {
  Link
} from 'react-router-dom';

import { 
  List
} from 'semantic-ui-react';

const Header = () => (
  <List bulleted horizontal size='massive'>
    <List.Item as={Link} to='/'>Pokemon Rewind</List.Item>
  </List>
);

export default Header;
