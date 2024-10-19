import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';

function ResponsiveAppBar() {
  return (
    <AppBar position="static" sx={{ bgcolor: '#0059ff', height: '100px' }}>
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h3">Harry Portter</Typography>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
