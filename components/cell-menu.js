import { Button } from 'semantic-ui-react'

const cellMenu = {
    marginTop: `0.5em`,
    marginBottom: `1em`
}

export default function CellMenu() {
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
                <Button
                    icon='linkify'
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