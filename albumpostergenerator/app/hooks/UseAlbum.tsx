import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UseFetch(album: any) {
  const qs = require("qs");
  require("dotenv").config();

  const client_id = "54ebd15f581e4b1ab1b29ccc46d2e1af"; // Your client id
  const client_secret = "75b773d47c124922ab5dbaf6a9fb7dec"; // Your secret
  const auth_token = Buffer.from(
    `${client_id}:${client_secret}`,
    "utf-8"
  ).toString("base64");

  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [accessToken, setAccessToken] = useState(null);
  const token_url = 'https://accounts.spotify.com/api/token';
  const credentials = qs.stringify({'grant_type':'client_credentials'});

  useEffect(() => {
    
    setLoading(true);

    axios.post(token_url, credentials, {
      headers: { 
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded' 
      }
    }).then((response) => {
      console.log(response.data.access_token);
      setAccessToken(response.data.access_token);
    }).then(() => {
      axios
      .get(`https://api.spotify.com/v1/albums/${album}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    }
    )
    
  }, [album]); // the dependency is the url, so we need to include it in the useEffect dependencies section i think

  return { data, loading, error };
  
}  