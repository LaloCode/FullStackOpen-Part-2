import { useEffect, useState } from 'react';
import Countries from './components/Countries';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  return (
    <>
      <div>
        find countries <input onChange={handleFilterChange}></input>
      </div>
      <Countries filter={filter} countries={countries} setFilter={setFilter} />
    </>
  );
};

export default App;
