import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { 
  Button,
  Grid,
  Paper,
  Typography,
  Checkbox,
} from '@mui/material';
import { DataGridPro, useGridApiContext } from '@mui/x-data-grid-pro';
import Icon from '@mdi/react';
import { mdiFish, mdiDramaMasks  } from '@mdi/js';
import InputFile from '../InputFile';
import Alert from '../Alert';
import { Api } from '../../helpers/axios';
import translator from '../../translator/translator';

const Permissions = () => {

  const i18n = translator();
  const locale = i18n.locale;
  const api = new Api();

  const [permissions, setPermissions] = useState(null);
  const [gridRows, setGridRows] = useState(null);
  const [alert, setAlert] = useState({
    message: null,
    type: null,
    open: false,
  });

  useEffect(() => {

    const permissions = api.getPermissions()
      .then(res => {
        setPermissions(res.data.permissions);
      })
      .catch(err => {
        handleError(err);   
      });
  },[]);

  const gridColumns = [
    // { field: 'id', headerName: 'Id', width: 150 },
    { field: 'role', headerName: 'Role', width: 100 },
    { field: 'endPoint', headerName: 'Endpoint', width: 100 },
    { field: 'createOwn', headerName: 'Create own', width: 100, editable: true, renderCell: (params) => <CellCheckBox {...params} /> },
    { field: 'createAny', headerName: 'Create any', width: 100, editable: true, renderCell: (params) => <CellCheckBox {...params} /> },
    { field: 'readOwn', headerName: 'Read own', width: 100, editable: true, renderCell: (params) => <CellCheckBox {...params} /> },
    { field: 'readAny', headerName: 'Read any', width: 100, editable: true, renderCell: (params) => <CellCheckBox {...params} /> },
    { field: 'updateOwn', headerName: 'Update own', width: 100, editable: true, renderCell: (params) => <CellCheckBox {...params} /> },
    { field: 'updateAny', headerName: 'Update any', width: 100, editable: true, renderCell: (params) => <CellCheckBox {...params} /> },
    { field: 'deleteOwn', headerName: 'Delete own', width: 100, editable: true, renderCell: (params) => <CellCheckBox {...params} /> },
    { field: 'deleteAny', headerName: 'Delete any', width: 100, editable: true, renderCell: (params) => <CellCheckBox {...params} /> },
    // { field: 'exceptions', headerName: 'Exceptions', width: 150 },
  ];

  useEffect(async() => {
    let rows = [];

    if(permissions){
      for await (let permission of permissions) {
        rows.push({
          id: permission._id,
          role: permission.role.name[locale],
          endPoint: permission.endPoint.name[locale],
          createOwn: permission.grants.createOwn, 
          createAny: permission.grants.createAny,
          readOwn: permission.grants.readOwn,
          readAny: permission.grants.readAny,
          updateOwn: permission.grants.updateOwn,
          updateAny: permission.grants.updateAny,
          deleteOwn: permission.grants.deleteOwn,
          deleteAny: permission.grants.deleteAny,
          // exceptions: permission.grants.exceptions,
        });
      }
      setGridRows(rows);
    }
  }, [permissions]);

  const CellCheckBox = (props) => {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleValueChange = async (value) => {
      const params = {
        permissionId: id,
        grant: field,
        value: value,
      };

      console.log(params);

      await apiRef.current.startCellEditMode({ id, field });

      const permissions = api.updatePermission(params)
        .then(res => {
          apiRef.current.setEditCellValue({ id, field, value });
        })
        .catch(err => {
          handleError(err);
        })
        .finally(() => {
          apiRef.current.stopCellEditMode({ id, field });
        });
    };

    return (
      <Checkbox
        checked={value}
        onChange={() => handleValueChange(!value)}
      />
    );
  };

  function handleError(err) {
    setAlert(prevAlert => ({
      ...prevAlert,
      message: err.response.data ? err.response.data.message : i18n.t('networkError'),
      type: 'error',
      open: true,
    }));   
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            { gridRows && gridColumns &&
              <div style={{ width: '100%' }}>
                <DataGridPro autoHeight rows={gridRows} columns={gridColumns} experimentalFeatures={{ newEditingApi: true }} />
              </div>
            }
          </Paper>

        </Grid>
        
      </Grid>
      <Alert
        message={alert.message}
        type={alert.type}
        isOpen={alert.open}
        onClose={() => setAlert(prevAlert => ({
          ...prevAlert,
          open: false,
        }))}
      />
    </>
  );
};

export default Permissions;