import React, {useRef} from 'react';
import './TextArea.css';

interface TextAreaProps {
    defaultValue?: string;
    placeholder: string;
    setDefaultValue?: (value: string) => void;
}

const TextArea = ({ defaultValue, setDefaultValue, placeholder }: TextAreaProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onChange = () => {
        const textArea = textAreaRef.current;

        if (!textArea || !setDefaultValue) {
            return;
        }

        setDefaultValue(textArea.value);
    }

    return (
        <form className='text-form'>
            <textarea ref={textAreaRef} className='text-area' placeholder={placeholder} defaultValue={defaultValue} onChange={onChange}/>
        </form>
    );
}

export default TextArea;