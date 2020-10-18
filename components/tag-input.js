import { Input } from 'semantic-ui-react'

const style = {
    width: '100%'
}

const label = {
    tag: true,
    content: 'Add Tag'
}

export default function TagInput({ tags }) {
    return (
        <Input
            style={style}
            icon='tags'
            iconPosition='left'
            label={label}
            labelPosition='right'
            placeholder='Enter tags'
            value={tags.join(',')}
        />
    )
}