import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UseFetch(word: any) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [word]); // the dependency is the url, so we need to include it in the useEffect dependencies section i think

  return { data, loading, error };
}
