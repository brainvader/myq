import axios from 'axios'

export const requestCreateQuiz = async (body) => {
    const res = await axios.post('/api/quizzes', body)
    return res
}

export const requestUpdateQuiz = async (quiz) => {
    const body = { quiz: quiz }
    const res = await fetch(`/api/quizzes/${quiz.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    return res
}

export const requestDeleteQuizzes = async (body) => {
    const res = await axios.delete('/api/quizzes', { data: body })
    return res
}

export const requestDeleteCell = async (cell, body) => {
    const res = await axios.delete(`/api/cells/${cell.uid}`, { data: body })
    // const res = await fetch(`/api/cells/${cell.uid}`, {
    //     method: 'DELETE',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body)
    // })
    return res
}

export const requestUpdateCellType = async (cell, body) => {
    // TODO: Update /api/cells/[cellUid]/type
    const res = await axios.put(`/api/cells/${cell.uid}`, body)
    // const res = await fetch(`/api/cells/${cell.uid}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body)
    // })
    return res
}

export const requestSwapCells = async (body) => {
    const res = await axios.put(`/api/cells/orders`, body)
    // const res = await fetch(`/api/cells/orders`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body)
    // })
    return res
}
