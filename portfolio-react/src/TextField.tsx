import React, {useRef} from 'react';

interface Props{
    text: String,
    ok?: boolean,
    i?: number,
    fn?: (bob: string) => string
}

const TextField: React.FC<Props> = () => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <div>
            <input ref={inputRef} onChange={handleChange}/>
        </div>
    )
}

export default TextField;