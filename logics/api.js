const requestUpdateQuiz = async (quiz) => {
    const body = { quiz: quiz }
    const res = await fetch(`/api/quizzes/${quiz.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    const newQuiz = await res.json()
    return newQuiz
}


export { requestUpdateQuiz }