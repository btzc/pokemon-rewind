import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'semantic-ui-react';

const BackupOverview = ({ _id, name, cards, date }) => (
  <Card>
    <Card.Content header={name} as={Link} to={`/${_id}`} />
    <Card.Content meta={`Contains ${cards.length} items`} />
    <Card.Content description={new Date(date).toString()} />
  </Card>
);

export default BackupOverview;
