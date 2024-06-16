import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, Container, AppBar, Toolbar, Typography, Link, CssBaseline } from '@mui/material';
import MarsImage from './components/MarsImage';
import WeatherDataTable from './components/WeatherDataTable';
import WeatherChart from './components/WeatherChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc',
        },
        secondary: {
            main: '#03dac6',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#a9b0b8',
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link href="/" color="inherit" underline="none">WeatherOnMarsApp</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container sx={{ mt: 3 }}>
                    <Routes>
                        <Route path="/" element={
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <MarsImage />
                                    </div>
                                    <div>
                                        <Typography variant="h4" gutterBottom>
                                            Witamy w aplikacji pogodowej!
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            Poni&#x17C;ej mo&#x17C;esz sprawdzi&#x107; historyczne dane dotycz&#x105;ce pogody na Marsie.
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <WeatherDataTable limit={5} />
                                </div>
                            </div>
                        } />
                        <Route path="/weather-data" element={
                            <div>
                                <WeatherChart />
                                <WeatherDataTable />
                            </div>
                        } />
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
}

export default App;
