import { Form, TextArea } from 'semantic-ui-react'

const textAreaRows = 3

export default function CellInput() {
    return (
        <Form>
            <TextArea rows={textAreaRows} />
        </Form>
    )
}