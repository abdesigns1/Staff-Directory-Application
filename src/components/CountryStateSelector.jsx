import React, { useState, useEffect } from "react";
import useCountries from "../hooks/useCountries";

const CountryStateSelector = ({ onSelect, selectedCountry, selectedState }) => {
  const { countries, loading, error } = useCountries();
  const [states, setStates] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);

  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        setStatesLoading(true);
        try {
          const response = await fetch(
            "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch states");
          }
          const data = await response.json();

          // Extract states for the selected country
          const countryStates = [
            ...new Set(
              data
                .filter((item) => item.country === selectedCountry)
                .map((item) => item.subcountry || item.name)
            ),
          ].sort();

          setStates(countryStates);
          setStatesLoading(false);
        } catch (error) {
          console.error("Error fetching states:", error);
          setStatesLoading(false);
        }
      };

      fetchStates();
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    onSelect(country, "");
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    onSelect(selectedCountry, state);
  };

  if (loading) {
    return <div className="text-gray-500">Loading countries...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="country"
        >
          Country
        </label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="state"
        >
          State
        </label>
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          disabled={!selectedCountry || statesLoading}
        >
          <option value="">Select State</option>
          {statesLoading ? (
            <option value="">Loading states...</option>
          ) : (
            states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
};

export default CountryStateSelector;
