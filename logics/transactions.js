// query quizzes refereced from given tag
const queryQuizzesFromTag = `
query tag($uid: string) {
    tag(func: uid($uid)) {
        ~tags {
            count(uid)
        }
    }
}`

export async function numOfTaggedQuizzes(txn, uid) {
    console.log(uid)
    const vars = { $uid: uid }
    const quizzesFromTag = await txn.queryWithVars(queryQuizzesFromTag, vars)
    console.log(quizzesFromTag.data)
    const { tag } = quizzesFromTag.data
    if (tag.length === 0) return 0

    const [{ [`~tags`]: [taggedQuiz] }] = tag
    const count = parseInt(taggedQuiz.count)
    return count
}

