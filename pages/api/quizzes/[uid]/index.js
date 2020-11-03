import * as fs from 'fs-extra';

import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

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

const saveQuiz = async (req, res) => {
    const { quiz } = req.body
    const txn = req.dbClient.newTxn();

    try {
        const result = await txn.mutate({ setJson: quiz })
        await txn.commit();

        const [yyyymmdd, _] = quiz.date.split(`T`)
        const file = yyyymmdd.split('-').join('/').concat(`/${quiz.uid}.json`)
        console.log(`file  ${file}`)

        const output = JSON.stringify(quiz, null, 4)
        await fs.outputFile(`content/quizzes/${file}`, output)

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(quiz)
    } catch (e) {
        throw e
    } finally {
        await txn.discard();
    }
}

handler.get(getQuiz)
handler.put(saveQuiz)

export default handler;