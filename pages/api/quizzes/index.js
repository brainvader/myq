import * as fs from 'fs-extra'

import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

import { fileNameFromQuiz } from '../../../lib/utils'
import { numOfTaggedQuizzes } from '../../../logics/transactions'

const handler = nextConnect();

handler.use(middleware);

const quizzesQuery = `
{
    quizzes(func: has(title)) {
        uid
        title
        date
        question {
            uid
        }
        answer {
            uid
        }
        tags {
            uid
            tag_name
        }
    }
}`

const QUIZ_PER_PAGE = 10

const getVisibleRange = (index) => {
    const start = (index - 1) * QUIZ_PER_PAGE
    const end = start + QUIZ_PER_PAGE
    return [start, end]
}

const getQuizzes = async (req, res) => {
    const { page } = req.query
    const result = await req.dbClient.newTxn().query(quizzesQuery)
    const allQuizzes = result.data.quizzes
    const totalQuizzes = allQuizzes.length

    const totalPages = Math.ceil(totalQuizzes / QUIZ_PER_PAGE)

    // get only the quizzes that can be　displayed in a single page, i.e. pagination
    const [start, end] = getVisibleRange(page)
    const quizzes = allQuizzes.slice(start, end)

    const body = {
        totalQuizzes: totalQuizzes,
        totalPages: totalPages,
        quizzes: quizzes
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(body)
}

// create a blank quiz node
const addQuiz = async (req, res) => {
    const createdAt = req.body.createdAt
    const client = req.dbClient
    const txn = client.newTxn()

    const quiz = {
        "uid": "_:newQuiz", // blank node
        "title": "新規クイズ",
        "user": "brainvader",
        "date": `${createdAt}`,
        "question": [
            {
                "order": 0,
                "type": "text",
                "content": "我思う"
            }
        ],
        "answer": [
            {
                "order": 0,
                "type": "text",
                "content": "故に我あり"
            }
        ],
        "tags": []
    }

    try {
        const result = await txn.mutate({ setJson: quiz })
        await txn.commit();
        const uid = result.data.uids.newQuiz
        const newQuiz = {
            ...quiz,
            uid: uid
        }
        const file = fileNameFromQuiz(newQuiz)
        const output = JSON.stringify(newQuiz, null, 4)
        await fs.outputFile(`content/quizzes/${file}`, output)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({ uid: newQuiz.uid })
    } catch (error) {
        throw error
    } finally {
        await txn.discard()
    }
}

const getQuizzQuery = (uid) => {
    return `
    {
        quiz(func: uid(${uid})) {
            uid
            date
            question {
                uid
            }
            answer {
                uid
            }
            tags {
                uid
            }
        }
    }`
}

async function deleteFile(quiz) {
    const file = fileNameFromQuiz(quiz)

    try {
        await fs.remove(`content/quizzes/${file}`)
    } catch (err) {
        throw error
    }
}

const quizzesQueryWithUids = (uids) => (`{
    quizzes(func: uid(${uids}))  {
        uid
        date
        question {
            uid
        }
        answer {
            uid
        }
        tags {
            uid
        }
    }
}`)


// get all quizzes to delete
const getDeleteQuizzes = async (txn, uids) => {
    const deleteQuizUids = (uids || []).join(', ')
    const result = await txn.query(quizzesQueryWithUids(deleteQuizUids))
    return result.data.quizzes
}


const deleteQuizzes = async (req, res) => {
    const uids = req.body.uids

    const client = req.dbClient
    const txn = client.newTxn()

    try {
        // get quizzes to delete
        const deleteQuizzes = await getDeleteQuizzes(txn, uids)

        // keep what tags are attached to quizzes prior to detaching
        const attachedTagUids = new Set()

        // see https://dev.to/jamesliudotcc/how-to-use-async-await-with-map-and-promise-all-1gb5
        const deleted = await Promise.all(
            deleteQuizzes.map(async (quiz) => {
                const uid = quiz.uid

                const question = (quiz.question || []).map(q => ({
                    uid: q.uid,
                    order: null,
                    type: null,
                    content: null

                }))

                const answer = (quiz.answer || []).map(a => ({
                    uid: a.uid,
                    order: null,
                    type: null,
                    content: null
                }))

                const tags = (quiz.tags || []).map(tag => {
                    attachedTagUids.add(tag.uid)
                    return { uid: tag.uid }
                })

                const deleteJson = [
                    {
                        uid: uid,
                        title: null,
                        date: null,
                        user: null,
                        version: null,
                        question: question,
                        answer: answer,
                        tags: tags
                    },

                ]

                await txn.mutate({ deleteJson: deleteJson })

                // delete file
                await deleteFile(quiz)
                return quiz.uid
            })
        )

        // clean up all tags that are referenced from any quizzes
        const deleteTags = await Promise.all((Array.from(attachedTagUids) || [])
            .filter(async (uid) => {
                // count how many quizzes reference the tag
                const count = await numOfTaggedQuizzes(txn, uid)

                // count === 0: delete
                // count > 0  : keep
                const isDelete = count === 0 ? true : false
                return isDelete
            })
            .map(async (uid) => {
                return {
                    uid: uid,
                    tag_name: null
                }
            })
        )

        await txn.mutate({ deleteJson: deleteTags })

        await txn.commit()

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({ deleted: deleted })
    } catch (error) {
        throw error
    } finally {
        await txn.discard()
    }
}

handler.get(getQuizzes)
handler.post(addQuiz)
handler.delete(deleteQuizzes)

export default handler;