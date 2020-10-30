import { useContext } from 'react'

import { Form, TextArea } from 'semantic-ui-react'

import EditorContext from '../components/editor/context'
import CellMenu from './cell-menu'

const textAreaRows = 3

export default function CellInput({ cell }) {
    const { uid } = useContext(EditorContext)

    const inputHandler = (event, data) => {
        updateTitle(quiz.uid, data.value)
    }

    return (
        <Form>
            <TextArea
                value={cell.content}
                rows={textAreaRows} />
        </Form>
    )
}