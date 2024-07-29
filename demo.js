import React, { useState, useEffect } from 'react';

const CountriesDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (response.ok) {
          const data = await response.json();
          // Extracting only necessary data (country name and alpha3Code) from the API response
          const countriesData = data.map(({ name, alpha3Code }) => ({
            name,
            code: alpha3Code,
          }));
          setCountries(countriesData);
        } else {
          throw new Error('Failed to fetch countries');
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
console.log("outer countries" , countries)
  return (
    <div>
      <label htmlFor="countrySelect">Select a country:</label>
      <select id="countrySelect" value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      {selectedCountry && <p>Selected Country Code: {selectedCountry}</p>}
    </div>
  );
};

export default CountriesDropdown;
