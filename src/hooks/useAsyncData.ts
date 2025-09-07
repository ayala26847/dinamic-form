import { useState, useEffect, useCallback } from 'react';

export interface AsyncDataState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseAsyncDataOptions {
  executeOnMount?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

export function useAsyncData<T>(
  asyncFunction: () => Promise<T>,
  options: UseAsyncDataOptions = {}
): AsyncDataState<T> {
  const { executeOnMount = true, retryCount = 0, retryDelay = 1000 } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(executeOnMount);
  const [error, setError] = useState<string | null>(null);

  const executeAsync = useCallback(async (retries = retryCount) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      
      if (retries > 0) {
        setTimeout(() => {
          executeAsync(retries - 1);
        }, retryDelay);
        return;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [asyncFunction, retryCount, retryDelay]);

  const refetch = useCallback(async () => {
    await executeAsync();
  }, [executeAsync]);

  useEffect(() => {
    if (executeOnMount) {
      executeAsync();
    }
  }, [executeOnMount, executeAsync]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}