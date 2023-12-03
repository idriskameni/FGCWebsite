import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface ModelAlertProps {	
  loading: boolean;
  severity: string | undefined;
}

const ModelAlert: React.FC<ModelAlertProps> = ({ loading, severity }) => {

  return (
    
    <Stack sx={{ width: '100%', paddingTop: '20px' }} spacing={2}>
    {severity ? (
      loading ? (
        <Alert severity="info" sx={{ border: '1px solid #282c34' }}>
          El model esta corrent, espera uns segons...
        </Alert>
      ) : (
        severity === 'error' ? (
          <Alert severity="error">
            Hi ha hagut un error en la predicció. Si us plau, intenta-ho més tard.
          </Alert>
        ) : (
          <Alert severity="success">
            La predicció s'ha executat correctament!
          </Alert>
        )
      )
    ) : null}
  </Stack>
  );

}

export default ModelAlert;