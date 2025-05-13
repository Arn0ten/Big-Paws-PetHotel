import {useState, useEffect} from 'react';
import {ActivityLog} from '@/types/preloadHistory';
import {preloadActivityHistory} from '@/lib/preloadHistory';

export function useActivityHistory() {
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Start with true
    const [error, setError] = useState<Error | null>(null);

    const fetchActivities = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await preloadActivityHistory();
            console.log('Activity History:', data);
            setActivities(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch activities'));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const refresh = () => {
        fetchActivities();
    };

    return {
        activities,
        isLoading,
        error,
        refresh
    };
}