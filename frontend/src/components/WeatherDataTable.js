import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../api';
import { Table, Button, InputGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'; 
import WeatherChart from './WeatherChart';

const WeatherDataTable = ({ limit }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage] = useState(10);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchWeatherData();
            data.sort((a, b) => new Date(b.terrestrialDate) - new Date(a.terrestrialDate));
            setWeatherData(data);
            setFilteredData(data);
        };

        loadData();
    }, []);

    useEffect(() => {
        const filtered = weatherData.filter(data =>
            data.terrestrialDate.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(0);
    }, [searchTerm, weatherData]);

    const indexOfLastEntry = (currentPage + 1) * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);
    const toggleSearch = () => setShowSearch(!showSearch);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <InputGroup>
                    <OverlayTrigger
                        placement="left"
                        overlay={<Tooltip>Wyszukaj dat&#x119;</Tooltip>}
                    >
                        <Button variant="outline-secondary" onClick={toggleSearch}>
                            <Search />
                        </Button>
                    </OverlayTrigger>
                    {showSearch && (
                        <FormControl
                            autoFocus
                            placeholder="Szukaj daty..."
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    )}
                </InputGroup>
                <div className="pagination">
                    <Button onClick={prevPage} disabled={currentPage === 0}>Poprzednia</Button>
                    <Button onClick={nextPage} disabled={indexOfLastEntry >= filteredData.length}>Nast&#x119;pna</Button>
                </div>
            </div>

            <WeatherChart weatherData={currentEntries} />

            <Table striped bordered hover responsive className="mt-4">
                <thead className="thead-dark">
                    <tr>
                        <th>Data</th>
                        <th>Min. temperatura</th>
                        <th>Max. temperatura</th>
                        <th>Pr&#281;dko&#347;&#263; wiatru </th>
                        <th>Ci&#347;nienie</th>
                        <th>Warunki</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEntries.map(data => (
                        <tr key={data.id}>
                            <td>{data.terrestrialDate}</td>
                            <td>{data.minTemp}</td>
                            <td>{data.maxTemp}</td>
                            <td>{data.windSpeed}</td>
                            <td>{data.pressure}</td>
                            <td>{data.atmoOpacity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default WeatherDataTable;