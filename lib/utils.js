export function fileNameFromQuiz(quiz) {
    const [yyyymmdd, _] = quiz.date.split(`T`)
    const file = yyyymmdd.split('-').join('/').concat(`/${quiz.uid}.json`)
    return file
}

const getTimeStamp = () => {
    const date = new Date();
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const timeStamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    return timeStamp
    // const timeStamp = new Date(now).toISOString()
    // return Promise.resolve(timeStamp)
}

export { getTimeStamp }