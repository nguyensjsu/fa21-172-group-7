import React from 'react';
import './NavbarUserButton.css';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import ListItemIcon from '@mui/material/ListItemIcon';
import LoginIcon from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import ImageIcon from '@mui/icons-material/Image';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Settings from '@mui/icons-material/Settings';

export default function NavbarUserButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItems = () => {
    if (typeof window !== "undefined" && window.localStorage){
      const userType = localStorage.getItem('userType');
      const screenSize = window.innerWidth;

      const userRoutes = (
        <React.Fragment>
          <a href='/browse' className='href'>
            <MenuItem>
              <ListItemIcon>
                <VideogameAssetIcon fontSize="small" />
              </ListItemIcon>
              Browse
            </MenuItem>
          </a>
          <a href='/payments' className='href'>
            <MenuItem>
              <ListItemIcon>
                <PaymentIcon fontSize="small" />
              </ListItemIcon>
              Payments
            </MenuItem>
          </a>
        </React.Fragment>
      );

      const adminRoutes = (
        <React.Fragment>
          <a href='/inventory' className='href'>
            <MenuItem>
              <ListItemIcon>
                <InventoryIcon fontSize="small" />
              </ListItemIcon>
              Inventory
            </MenuItem>
          </a>
          <a href='/transactions' className='href'>
            <MenuItem>
              <ListItemIcon>
                <ReceiptIcon fontSize="small" />
              </ListItemIcon>
              Transactions
            </MenuItem>
          </a>
          <a href='/accounts' className='href'>
            <MenuItem>
              <ListItemIcon>
                <AdminPanelSettingsIcon fontSize="small" />
              </ListItemIcon>
              Accounts
            </MenuItem>
          </a>
        </React.Fragment>
      );

      const logout = (
        <a href='/logout' className='href'>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </a>
      );

      const login = (
        <a href='/login' className='href'>
          <MenuItem>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        </a>
      );

      const register = (
        <a href='/register' className='href'>
          <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Register
          </MenuItem>
        </a>
      );

      if (userType === 'user') {
        if (screenSize <= 1300) { // user and small screen
          return (
            <div>
              {userRoutes}
              <Divider />
              {logout}
            </div>);
        }
        else { // user and large screen
          return (
            <div>
              {logout}
            </div>);
        }
      } else if (userType === 'admin'){
        if (screenSize <= 1300) { // admin and small screen
          return (
            <div>
              {adminRoutes}
              <Divider />
              {logout}
            </div>);
        } else {
          return (
            <div>
              {logout}
            </div>);
        }
      } else {
        if (screenSize <= 1300) { // user and small screen
          return (
            <div>
              {userRoutes}
              <Divider />
              {register}
              {login}
            </div>);
        }
        else { // user and large screen
          return (
            <div>
              {register}
              {login}
            </div>);
        }
      }
    }
  }

  return (
    <React.Fragment>
      <Avatar
        className="profile-avatar"
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 10,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {renderMenuItems()}
      </Menu>
    </React.Fragment>
  );
}
