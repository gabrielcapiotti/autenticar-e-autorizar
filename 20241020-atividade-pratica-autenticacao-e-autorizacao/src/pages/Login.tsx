import { Button, Container, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { postStudent } from '../store/models/StudentSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginDispatch = useAppDispatch();
  const selector = useAppSelector(state => state.studentLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if (selector.token) {
      navigate('/');
    }
  }, [selector]);

  function handleLogin() {
    loginDispatch(postStudent({ email, password }));
  }

  return (
    <Container>
      <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center" width="100%">
        <Grid size={12} display="flex" justifyContent="center">
          <Typography variant="h4" fontWeight={600}>
            Login
          </Typography>
        </Grid>
        <Grid size={12} display="flex" justifyContent="center">
          <TextField
            id="email"
            label="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            variant="outlined"
          />
        </Grid>
        <Grid size={12} display="flex" justifyContent="center">
          <TextField
            id="password"
            label="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            variant="outlined"
          />
        </Grid>
        <Grid size={12} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
