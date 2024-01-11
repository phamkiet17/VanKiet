import React, { useState } from "react";

const useMutation = (call) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const execute = async (payload, options) => {
    const { onSuccess, onFail} = options || {}
    setLoading(true);
    try {
      const res = await call(payload );
        if (res.data) {
        //   console.log('res.data.data', res.data.data)
          setData(res.data?.data);
          onSuccess?.(res.data?.data);
      }
    } catch (error) {
        setError(error);
        onFail?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    data,
    loading,
    error,
  };
};

export default useMutation;
