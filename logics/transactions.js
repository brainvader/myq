const queryQuizzesFromTag = `
query tag($uid: string) {
    tag(func: uid($uid)) {
        ~tags {
            count(uid)
        }
    }
}`

export async function numOfTaggedQuizzes(txn, tag) {
    const vars = { $uid: tag.uid }
    const quizzesFromTag = await txn.queryWithVars(queryQuizzesFromTag, vars)
    const [{ [`~tags`]: [taggedQuiz] }] = quizzesFromTag.data.tag
    const count = parseInt(taggedQuiz.count)
    return count
}

