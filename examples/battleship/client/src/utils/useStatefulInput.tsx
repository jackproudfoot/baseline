import { useState } from "react"

import { FormFeedback, FormGroup, Input, Label } from "reactstrap"

export const useStatefulInput = (name: string, label: string, type: string = 'text') => {
    const [value, setValue] = useState('')

    const input = (
        <FormGroup floating>
            <Input
                id={name}
                name={name}
                placeholder={label}
                type={type as any}
                value={value}
                onChange={e => setValue(e.target.value)}
                invalid={value === ''}
            />
            <FormFeedback>
                {label} cannot be empty.
            </FormFeedback>
            <Label for={name}>
                {label}
            </Label>
        </FormGroup>
    )

    return [value, input]
}