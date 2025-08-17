import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from '../routes';

function CardGroups({ campaigns }) {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description:(
        <Link route={`/campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>
        ),
      fluid: true
    };
  });

  return <Card.Group items={items} />;
}

export default CardGroups;
