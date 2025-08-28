import { useState, useEffect } from "react";

function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();

        // Extract unique countries
        const uniqueCountries = [
          ...new Set(data.map((item) => item.country)),
        ].sort();
        setCountries(uniqueCountries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
}

export default useCountries;
