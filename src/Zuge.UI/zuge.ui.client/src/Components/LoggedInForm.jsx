import './../Styles/LoggedInForm.css';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';

LoggedInForm.propTypes = {
    setSignedIn: PropTypes.func,
    DarkMode: PropTypes.bool,
};

function LoggedInForm({ setSignedIn, DarkMode }) {

    const profileButtonStyle = {
        backgroundColor: '#eeeeee',
        color: '#262626',
        border: '1px solid #262626',
        marginBottom: '20px',
    };

    const profileButtonStyleDark = {
        backgroundColor: '#262626',
        color: '#eeeeee',
        border: '1px solid #eeeeee',
        marginBottom: '20px',
    };
      
    const logoutButtonStyle = {
        backgroundColor: '#eeeeee',
        color: '#262626',
        border: '1px solid #262626',
        marginTop: '20px',
        marginBottom: '20px',
    };

    const logoutButtonStyleDark = {
        backgroundColor: '#262626',
        color: '#eeeeee',
        border: '1px solid #eeeeee',
        marginTop: '20px',
        marginBottom: '20px',
    };
      
    const formContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
    };

    const handleLogOut = () => {
        setSignedIn(false);
    }
      

  return (
    <>
      <Container style={formContainerStyle}>
      <Button style={DarkMode? profileButtonStyleDark : profileButtonStyle} variant="contained">
        Profiili
      </Button>
      <Button onClick={handleLogOut} style={DarkMode? logoutButtonStyleDark : logoutButtonStyle} variant="contained">
        Kirjaudu ulos
      </Button>
    </Container>
    </>
  )
}

export default LoggedInForm;