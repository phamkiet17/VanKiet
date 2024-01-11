import { useEffect, useState } from "react";

const useQuery = (call, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchData = async (query) => {
    setLoading(true);
    
    try {
      const res = await call(query);
      // console.log('call', call)
      // console.log('res', res)
      setData(res.data?.data || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useQuery;
