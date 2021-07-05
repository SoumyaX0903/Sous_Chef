// this is our  form component  for authentication
import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const setfield =  ({ name, makeChange, label, half, autoFocus, type, handleShowPassword }) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={makeChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}//here when we are in the password field we can toggle the visibilty of the password using material ui api "visibility" and "visibility off" 
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        } : null}
      />
    </Grid>
);

export default setfield
