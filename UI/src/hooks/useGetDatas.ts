
import { useState, useEffect } from "react";
import axiosInstance from "../AxiosInstence";

export const useGetDatas = <T,>(id: string, endpoint: string) => {
  const [data, setData] = useState<T | null>(null); // Generic type T
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/user/getUser/${id}`);
        console.log('response :', response);
        const result: T = await response.data; // Use generic type T
        console.log('result :', result);
        setData(result);
        setIsSuccess(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, endpoint]);

  return { data, loading, error, isSuccess };
};
