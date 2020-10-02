import { Input } from 'semantic-ui-react'

const style = {
    width: '100%'
}

export default function TitleInput() {
    return (
        <Input
            style={style}
            icon="question"
            placeholder='Title' />
    )
}