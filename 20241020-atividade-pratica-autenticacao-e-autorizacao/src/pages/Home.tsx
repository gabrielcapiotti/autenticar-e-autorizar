import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Container, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';
import { getAvaliations, postAvaliations, updateAvaliations } from '../store/models/AvaliationSlice';
import ModalDefault from '../components/ModalDefault';

function Home() {
  const selector = useAppSelector(state => state.studentLogin);
  const selectiorAvaliations = useAppSelector(state => state.avaliation.avaliations);
  const selectiorSuccess = useAppSelector(state => state.avaliation);
  const navigate = useNavigate();
  const [module, setModule] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [avaliation, setAvaliation] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const avaliationsDispatch = useAppDispatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAvaliations(selector.token));
  }, []);

  useEffect(() => {
    if (!selector.token) {
      navigate('/sign-in');
    }
  }, [selector]);

  function handleClick() {
    avaliationsDispatch(postAvaliations({ module, grade, email, token: selector.token }));

    if (selectiorSuccess.success === false) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
  }

  function handleUpdate() {
    dispatch(updateAvaliations({ module, grade, email, token: selector.token, id: avaliation.id }));

    if (selectiorSuccess.success === false) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
  }

  function handleOpen(item) {
    setOpen(true);
    setAvaliation(item);
  }

  return (
    <Container>
      <ModalDefault open={open} setOpen={setOpen} title="Atualizar avaliação" action={handleUpdate}>
        <Grid container spacing={2}>
          <Grid size={12} display="flex" justifyContent="center">
            <TextField
              id="module"
              label="Module"
              onChange={e => setModule(e.target.value)}
              value={module}
              variant="outlined"
            />
          </Grid>
          <Grid size={12} display="flex" justifyContent="center">
            <TextField
              id="grade"
              label="Grade"
              onChange={e => setGrade(e.target.value)}
              value={grade}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </ModalDefault>
      <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center" width="100%">
        <Grid size={12} display="flex" justifyContent="center">
          <Typography variant="h3">Criação de Avaliações</Typography>
        </Grid>
        <Grid size={12} display="flex" justifyContent="center">
          <TextField
            id="module"
            label="Module"
            onChange={e => setModule(e.target.value)}
            value={module}
            variant="outlined"
          />
        </Grid>
        <Grid size={12} display="flex" justifyContent="center">
          <TextField
            id="grade"
            label="Grade"
            onChange={e => setGrade(e.target.value)}
            value={grade}
            variant="outlined"
          />
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
          <Button variant="contained" color="primary" onClick={handleClick}>
            Criar
          </Button>
        </Grid>
        <Grid size={12} display="flex" justifyContent="center">
          {selectiorAvaliations?.data?.map(item => (
            <>
              <Box>
                <Typography>Modulo: {item.module}</Typography>
                <Typography>Grade: {item.grade}</Typography>
                <Typography>Email: {item.student.email}</Typography>
              </Box>
              <Button onClick={() => handleOpen(item)}>Editar</Button>
            </>
          ))}
        </Grid>
      </Grid>
      {success ? (
        <Alert severity="success">Avaliação atualizado com sucesso.</Alert>
      ) : (
        <Alert severity="error">Não foi possivel atualizar a Avaliação, sem autorização.</Alert>
      )}
    </Container>
  );
}

export default Home;
