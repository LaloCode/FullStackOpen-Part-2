import { useState } from 'react';
import Countries from './components/Countries';

const App = ({ countries }) => {
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <>
      <div>find countries <input onChange={handleFilterChange}></input></div>
      <Countries filter={filter} countries={countries}/>
    </>
  );
}

export default App;
