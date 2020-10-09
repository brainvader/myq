import useSwr from 'swr'
import fetcher from './fetcher';

export function useQuizzes() {
    const { data, mutate, error } = useSwr(`/api/quizzes`, fetcher)
    return {
        quizzes: data,
        reload: mutate,
        isLoading: !error && !data,
        isError: error
    }
}