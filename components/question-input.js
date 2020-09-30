import { Form, TextArea } from 'semantic-ui-react'

const textAreaRows = 3

export default function QuestionInput() {
    return (
        <Form>
            <TextArea rows={textAreaRows} />
        </Form>
    )
}