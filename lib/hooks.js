import useSwr from 'swr'
import { quizFetcher, tagFetcher } from './fetcher';

export const useQuizzes = (pageIndex) => {
    const key = `/api/quizzes?page=${pageIndex}`
    const { data, mutate, error } = useSwr(key, quizFetcher)
    return {
        data: data,
        mutate: mutate,
        isLoading: !error && !data,
        isError: error
    }
}

export const useQuiz = (uid) => {
    const key = `/api/quizzes/${uid}`
    const { data, mutate, error } = useSwr(key, quizFetcher)

    return {
        data: data,
        mutate: mutate,
        isLoading: !error && !data,
        isError: error
    }
}

export const useTags = (searchTerm) => {
    // see [Multiple Arguments](https://swr.vercel.app/docs/arguments#multiple-arguments)
    const { data, _, error } = useSwr([`/api/tags`, searchTerm], tagFetcher)

    return {
        tags: data || [],
        isLoading: !error && !data,
        isError: error
    }
}
