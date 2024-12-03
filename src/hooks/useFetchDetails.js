import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useFetchDetails = (endpoint) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

   
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(endpoint);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching data:", error);
            setLoading(false);
        }
    }; 

    useEffect(() => {
        fetchData(); 
    }, [endpoint]);

    return { data, loading };
};

export default useFetchDetails;
