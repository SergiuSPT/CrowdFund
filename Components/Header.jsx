import React, {useState} from 'react';
import { MenuMenu, MenuItem, Menu } from 'semantic-ui-react';
import {Link} from '../routes.js';

export default function Header(){
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
      <Menu style={{marginTop: '10px' }}>
        <Link route="/">
          <a className='item'>CrowdFund</a>
        </Link>

        <MenuMenu position='right'>
          <Link route="/">
            <a className='item'>Campaigns</a>
          </Link>
          <Link route="/campaigns/new">
            <a className='item'>+</a>
          </Link>
        </MenuMenu>
      </Menu>
    )
  
}