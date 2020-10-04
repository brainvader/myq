import { Button } from 'semantic-ui-react'

export default function EditorMenu() {
    return (
        <div>
            <Button.Group>
                <Button icon='home' />
                <Button icon='save' />
            </Button.Group>
            { '　'}
            <Button.Group>
                <Button icon='play' />
                <Button icon='pause' />
            </Button.Group>
        </div>
    )
}