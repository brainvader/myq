import * as fs from 'fs-extra'

import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

import { fileNameFromQuiz } from '../../../../lib/utils'

const handler = nextConnect();

handler.use(middleware);

const getQuizzQuery = (uid) => {
    return `
    {
        quiz(func: uid(${uid})) {
            uid
            title
            user
            date
            question {
                uid
                order
                type
                content
            }
            answer {
                uid
                order
                type
                content
            }
            tags {
                uid
                tag_name
            }
        }
    }`
}

const getQuiz = async (req, res) => {
    const { uid } = req.query
    const result = await req.dbClient.newTxn().query(getQuizzQuery(uid))
    const [quiz] = result.data.quiz
    res.json(quiz)
}

// TODO: fs can't module not found error
async function saveFile(quiz) {
    const file = fileNameFromQuiz(quiz)
    const output = JSON.stringify(quiz, null, 4)
    try {
        await fs.outputFile(`content/quizzes/${file}`, output)
    } catch (error) {
        throw error
    }
}

const saveQuiz = async (req, res) => {
    const { quiz } = req.body
    const txn = req.dbClient.newTxn();

    try {
        const result = await txn.mutate({ setJson: quiz })
        await txn.commit();

        await saveFile(quiz)

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(quiz)
    } catch (e) {
        throw e
    } finally {
        await txn.discard();
    }
}

// TODO: Delete a quiz with its uid

handler.get(getQuiz)
handler.put(saveQuiz)

export default handler;