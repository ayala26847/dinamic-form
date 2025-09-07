import { useState, useEffect, useCallback, useRef } from 'react';

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
  
  const isMountedRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const executeAsync = useCallback(async (retries = retryCount) => {
    if (!isMountedRef.current) return;
    
    try {
      if (isMountedRef.current) {
        setIsLoading(true);
        setError(null);
      }
      
      const result = await asyncFunction();
      
      if (isMountedRef.current) {
        setData(result);
      }
    } catch (err) {
      if (!isMountedRef.current) return;
      
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      
      if (retries > 0) {
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            executeAsync(retries - 1);
          }
        }, retryDelay);
        return;
      }
      
      if (isMountedRef.current) {
        setError(errorMessage);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [asyncFunction, retryCount, retryDelay]);

  const refetch = useCallback(async () => {
    if (isMountedRef.current) {
      await executeAsync();
    }
  }, [executeAsync]);

  useEffect(() => {
    if (executeOnMount) {
      executeAsync();
    }

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [executeOnMount, executeAsync]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}