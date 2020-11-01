import { useContext } from 'react'
import { mutate } from 'swr'

import { Form, TextArea } from 'semantic-ui-react'

import EditorContext from '../components/editor/context'
import CellFormContext from '../components/cell-form/context'

const textAreaRows = 3

export default function CellInput({ cell }) {
    const { uid } = useContext(EditorContext)
    const { formType } = useContext(CellFormContext)

    const inputHandler = (event, data) => {
        const content = data.value

        // update cached quiz without revalidation
        mutate(`/api/quizzes/${uid}`, async current => {
            const currentCells = (current[formType] || [])
            const updatedCells = currentCells.map(currentCell => {
                // find editing cell
                return currentCell.uid === cell.uid
                    // update cell content 
                    ? { ...currentCell, content: content }
                    : currentCell
            })
            const newQuiz = { ...current, [formType]: [...updatedCells] }
            console.log(newQuiz)
            return newQuiz
        }, false)
    }

    return (
        <Form>
            <TextArea
                value={cell.content}
                rows={textAreaRows}
                onInput={inputHandler} />
        </Form>
    )
}