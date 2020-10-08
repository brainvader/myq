import useSwr from 'swr'
import fetcher from './fetcher';

export function useQuizzes() {
    const { data, error } = useSwr(`/api/quizzes`, fetcher)
    return {
        quizzes: data,
        isLoading: !error && !data,
        isError: error
    }
}