import { Input } from 'semantic-ui-react'

export default function TagInput() {
    return (
        <Input
            style={{ width: '100%' }}
            icon='tags'
            iconPosition='left'
            label={{ tag: true, content: 'Add Tag' }}
            labelPosition='right'
            placeholder='Enter tags'
        />
    )
}