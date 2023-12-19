import * as React from 'react';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Icon from '@mdi/react';
import {
  mdiViewDashboardOutline,
  mdiFileUploadOutline,
  mdiShieldAccountVariantOutline,
  mdiTextBoxMultipleOutline,
} from '@mdi/js';
import Divider from '@mui/material/Divider';
import translator from '../../translator/translator';

  const mainListItems = (
    <>
      <ListItemButton component={Link} to="/dashboard">
        <ListItemIcon>
          <Icon
            path={mdiViewDashboardOutline}
            title="Dashboard"
            size={1}
          />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
       <ListItemButton component={Link} to="/dashboard/permissions">
        <ListItemIcon>
          <Icon
            path={mdiShieldAccountVariantOutline}
            title="Permissions"
            size={1}
          />
        </ListItemIcon>
        <ListItemText primary="Permissions" />
      </ListItemButton>
      <ListItemButton component={Link} to="/dashboard/file-upload">
        <ListItemIcon>
          <Icon
            path={mdiFileUploadOutline}
            title="File upload"
            size={1}
          />
        </ListItemIcon>
        <ListItemText primary="File upload" />
      </ListItemButton>
      <ListItemButton component={Link} to="/dashboard/reports">
        <ListItemIcon>
          <Icon
            path={mdiTextBoxMultipleOutline}
            title="Reports"
            size={1}
          />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </>
  );

  const secondaryListItems = (
    <>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItemButton>
    </>
  );

export default function NavBar() {

  return(
    <List component="nav">
      {mainListItems}
      <Divider sx={{ my: 1 }} />
      {/* {secondaryListItems} */}
    </List>
  );
}