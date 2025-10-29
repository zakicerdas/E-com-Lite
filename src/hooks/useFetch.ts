import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";


export function useFetch<T = any>(url: string, immediate: boolean = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<T>(url);
      setData(res.data);
    } catch (err) {
      const e = err as AxiosError;
      setError(
        e.response?.status
          ? `Error ${e.response.status}: ${e.response.statusText}`
          : e.message || "Gagal memuat data"
      );
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (immediate) fetchData();
  }, [fetchData, immediate]);

  return { data, loading, error, refetch: fetchData, setData };
}
