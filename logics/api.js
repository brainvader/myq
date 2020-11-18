import axios from 'axios'

export const requestCreateQuiz = async (body) => {
    const res = await axios.post('/api/quizzes', body)
    return res
}

export const requestUpdateQuiz = async (uid, body) => {
    const res = await axios.put(`/api/quizzes/${uid}`, body)
    // const res = await fetch(`/api/quizzes/${quiz.uid}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body)
    // })
    return res
}

export const requestDeleteQuizzes = async (body) => {
    const res = await axios.delete('/api/quizzes', { data: body })
    return res
}

export const requestDeleteCell = async (uid, body) => {
    const res = await axios.delete(`/api/cells/${uid}`, { data: body })
    // const res = await fetch(`/api/cells/${cell.uid}`, {
    //     method: 'DELETE',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body)
    // })
    return res
}

export const requestUpdateCellType = async (uid, body) => {
    // TODO: Update /api/cells/[cellUid]/type
    const res = await axios.put(`/api/cells/${uid}`, body)
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

export const requestUpdateTitle = async (uid, body) => {
    const res = await axios.put(`/api/quizzes/${uid}/title`, body)
    return res
}

export const requestAttachTag = async (uid, body) => {
    const res = await axios.put(`/api/quizzes/${uid}/tags`, body)
    // const res = await fetch(`/api/quizzes/${uid}/tags`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body)
    // })
    return res
}

export const OK = (response) => response.statusText === 'OK'