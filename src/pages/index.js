import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Card, CardContent, TextField, CardActions, Button } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#80cbc4', // A pastel teal
    },
    secondary: {
      main: '#f48fb1', // A pastel pink
    },
    background: {
      default: '#f7f5f2', // A soft off-white background
    },
  },
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 700,
      color: '#333333', // Dark color for headers
    },
    button: {
      textTransform: 'none', // Buttons with normal capitalization
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Rounded buttons for a friendly look
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#80cbc4', // Label color when the text field is focused
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#80cbc4', // Underline color when focused
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#e6e6e6', // Default border color
            },
            '&:hover fieldset': {
              borderColor: '#80cbc4', // Border color when hovered
            },
            '&.Mui-focused fieldset': {
              borderColor: '#80cbc4', // Border color when focused
            },
          },
        },
      },
    },
  },
});


const Home = () => {
  const [data, setData] = useState(null);
  const [newUser, setNewUser] = useState({ name: '' });
  const [updatedNames, setUpdatedNames] = useState({});
  // Below function performs the POST operation when called
  const addUser = () => {
    fetch('http://127.0.0.1:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          // Here we call fetchdata to retrieve the updated data!

          fetchData();
        } else {
          console.log('Error updating users');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Below function performs the GET operation when called 
  const fetchData = () => {
    fetch('http://127.0.0.1:5000/api/users', {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching data');
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const updateUser = (userId) => {
    fetch(`http://127.0.0.1:5000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedNames[userId] }), // Use the updatedName for the specific user
    })
      .then((response) => {
        console.log(updatedNames[userId]);
        if (response.ok) {
          fetchData(); // Fetch data again to reflect the changes
        } else {
          console.log('Error updating the user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteUser = (userId) => {
    fetch(`http://127.0.0.1:5000/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchData(); // Fetch data again to reflect the changes
        } else {
          console.log('Error deleting the user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
          User Management
        </Typography>
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Add User
            </Typography>
            <TextField
              fullWidth
              label="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={addUser}>
              Add User
            </Button>
          </CardActions>
        </Card>
        {/* ... */}
        {data ? (
          Object.entries(data.users).map(([userId, user]) => (
            <Card key={userId} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">
                  id: {userId} Name: {user.name}
                </Typography>
                <TextField
                  fullWidth
                  label="Name"
                  value={updatedNames[userId] || ''}
                  onChange={(e) =>
                    setUpdatedNames({
                      ...updatedNames,
                      [userId]: e.target.value,
                    })
                  }
                />
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" onClick={() => updateUser(userId)}>
                  Update
                </Button>
                <Button variant="contained" color="secondary" onClick={() => deleteUser(userId)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Container>
    </ThemeProvider>
  );
};
export default Home;