import Weather from "./Weather";

const Country = ({ country }) => {
  if (country.capital) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h4>languages:</h4>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="Country flag"></img>
        <Weather capital={country.capital}/>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>area {country.area}</div>
        <h4>languages:</h4>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="Country flag"></img>
      </div>
    );
  }
  
};

export default Country;
