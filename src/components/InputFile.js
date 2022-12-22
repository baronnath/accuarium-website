import React, { useRef } from 'react';
import { Button, Typography } from '@mui/material';
import Icon from '@mdi/react';
import { mdiFileUploadOutline } from '@mdi/js';
import translator from '../translator/translator';



const InputFile = ({ file, setFile }) => {
  const i18n = translator();

  const hiddenFileInput = useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
  };

  return (
    <>
      { file &&
        <>
          <Icon
            path={mdiFileUploadOutline}
            title={i18n.t('inputFile.select')}
            size={2}
            style={{ marginTop: 15 }}
          />
          <Typography style={{ marginTop: 5 }}>
            {file.name}
          </Typography>
        </>
      }
      <Button
        variant="outlined"
        onClick={handleClick}
        style={{ width: '100%', marginTop: 15 }}
      >
        {i18n.t('inputFile.select')}
      </Button>
      
      <input type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display:'none'}} 
      /> 
    </>
  );
};
export default InputFile;