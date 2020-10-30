const requestUpdateQuiz = async (quiz) => {
    const body = { quiz: quiz }
    const res = await fetch(`/api/quizzes/${quiz.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    return res
}


export { requestUpdateQuiz }