import { Segment, Label } from 'semantic-ui-react'
import { Form, TextArea, Button } from 'semantic-ui-react'

import QuestionMenu from './question-menu'
import { AddBeforeButton, AddAfterButton } from './cell-button'

const textAreaRows = 3

const cell = {
    position: 'relative',
    paddingTop: '2em'
}

export default function QuestionInput() {
    return (

        <Segment.Group>

            <Segment>
                <Label attached='top left'>Question</Label>
            </Segment>

            <Segment style={cell} className='cell'>
                <div>
                    <AddBeforeButton />

                    <Form>
                        <TextArea rows={textAreaRows} />
                    </Form>

                    <QuestionMenu />

                    <AddAfterButton />
                </div>
            </Segment>


        </Segment.Group>
    )
}