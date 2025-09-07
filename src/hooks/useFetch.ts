import { useEffect, useState } from "react";

export function useFetch<T>(fetchFn: () => Promise<T>, errorMessage: string = "Error fetching data") {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchFn()
      .then((res) => {
        if (isMounted) setData(res);
      })
      .catch(() => {
        if (isMounted) setError(errorMessage);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return { data, loading, error };
}
