import { Button } from 'semantic-ui-react'

const addCellBtn = {
    position: 'absolute',
    zIndex: 1,
}

const addBeforeBtn = {
    ...addCellBtn,
    transform: `translate(-50%, -50%)`
}

const addAfterBtn = {
    ...addCellBtn,
    transform: `translate(-50%, 0%)`
}


export function AddBeforeButton({ onClick }) {
    return <Button
        style={addBeforeBtn}
        size='mini'
        circular icon='plus'
        onClick={onClick} />
}

export function AddAfterButton() {
    return <Button
        style={addAfterBtn}
        size='mini'
        circular icon='plus' />
}