import Country from './Country';

const Countries = ({ filter, countries, setFilter }) => {
  const showCountry = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{' '}
            <button value={country.name.common} onClick={showCountry}>
              show
            </button>
          </div>
        ))}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else {
    return <div></div>;
  }
};

export default Countries;
