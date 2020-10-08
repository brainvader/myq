import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const getTimeStamp = () => {
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const now = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    const timeStamp = new Date(now).toISOString()
    return timeStamp
}

const quizzes = [
    {
        title: 'MonQとは何でしょうか?',
        user: 'brainvader',
        version: '0.0.1',
        date: getTimeStamp(),
        answer: [
            {
                type: 'text',
                content: 'MonQとは何でしょうか?'
            }
        ],
        question: [
            {
                type: 'text',
                content: 'クイズベースの学習システムです.'
            }
        ],
        tags: [
            'monq'
        ]
    },
    {
        title: 'put on holdとは?',
        user: 'brainvader',
        version: '0.0.1',
        date: getTimeStamp(),
        answer: [
            {
                type: 'text',
                content: 'put on holdとは?'
            }
        ],
        question: [
            {
                type: 'text',
                content: '保留する'
            }
        ],
        tags: [
            'english'
        ]
    }
]

const getQuizzes = async (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(quizzes))
}

handler.get(getQuizzes)

export default handler;