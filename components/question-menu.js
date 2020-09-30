import { Button } from 'semantic-ui-react'
import { useState } from 'react'

const cellMenu = {
    marginTop: `0.5em`,
    marginBottom: `1em`
}

const defaultState = {
    activeItem: ""
}

export default function QuestionMenu() {
    const [state, setState] = useState(defaultState)

    const { activeItem } = state

    const handleButtonClick = (event, data) => console.log(`${JSON.stringify(data)}`)

    return (
        <div style={cellMenu}>
            <Button.Group>
                <Button
                    icon='code'
                    onClick={handleButtonClick} />
                <Button
                    icon='dollar sign'
                    onClick={handleButtonClick} />
            </Button.Group>
            {'    '}
            <Button.Group>
                <Button
                    icon='minus'
                    onClick={handleButtonClick} />
                <Button
                    icon='caret up'
                    onClick={handleButtonClick} />
                <Button
                    icon='caret down'
                    onClick={handleButtonClick} />
            </Button.Group>
        </div>
    )
}