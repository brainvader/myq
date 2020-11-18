import axios from 'axios'

export const quizFetcher = (url) => axios.get(url).then((res) => res.data)

export const tagFetcher = async (url, searchTerm) => {
    const path = searchTerm ? `${url}?search=${searchTerm}` : url
    const res = await fetch(path)
    return res.json()
}