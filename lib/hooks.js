import useSwr from 'swr'
import fetcher from './fetcher';

export function useQuizzes(pageIndex) {
    const key = `/api/quizzes?page=${pageIndex}`
    const { data, mutate, error } = useSwr(key, fetcher)
    return {
        data: data,
        mutate: mutate,
        isLoading: !error && !data,
        isError: error
    }
}