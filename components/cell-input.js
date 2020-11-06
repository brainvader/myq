import { useContext, useState } from 'react'
import { mutate } from 'swr'

import { Form, TextArea } from 'semantic-ui-react'

import EditorContext from '../components/editor/context'
import CellFormContext from '../components/cell-form/context'

const textAreaRows = 3

export default function CellInput({ cell }) {
    const { uid } = useContext(EditorContext)
    const { formType } = useContext(CellFormContext)

    const [content, setContent] = useState(cell.content)

    const inputHandler = (event, data) => {
        const content = data.value
        setContent(content)
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
            return newQuiz
        }, false)
    }

    return (
        <Form>
            <TextArea
                value={content}
                rows={textAreaRows}
                onInput={inputHandler} />
        </Form>
    )
}