import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Define the props interface for ModelAlert
interface ModelAlertProps {	
  loading: boolean; // Indicates if the model is loading
  severity: string | undefined; // Severity of the alert message
}

// Define the ModelAlert functional component
const ModelAlert: React.FC<ModelAlertProps> = ({ loading, severity }) => {

  return (
    <Stack sx={{ width: '100%', paddingTop: '20px' }} spacing={2}>
      {severity ? (
        loading ? (
          <Alert severity="info" sx={{ border: '1px solid #282c34' }}>
            El model està corrent, espera uns segons...
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

export default ModelAlert; // Export the ModelAlert component
