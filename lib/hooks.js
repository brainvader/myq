import useSwr from 'swr'
import fetcher from './fetcher';

export function useQuizzes(index) {
    const { data, mutate, error } = useSwr(`/api/quizzes?page=${index}`, fetcher)
    return {
        data: data,
        mutate: mutate,
        isLoading: !error && !data,
        isError: error
    }
}