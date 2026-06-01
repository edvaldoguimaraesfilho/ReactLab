import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] =
    useState<T | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response =
          await fetch(url);

        if (!response.ok) {
          throw new Error(
            "Failed to load data"
          );
        }

        const json =
          await response.json();

        setData(json);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}