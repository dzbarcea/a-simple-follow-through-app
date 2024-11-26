import React, {useRef} from 'react';
import './TextArea.css';

interface TextAreaProps {
    placeholder: string;
    setIsSectionComplete: (value: boolean) => void;
}

const TextArea = ({ placeholder, setIsSectionComplete }: TextAreaProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onChange = () => {
        const textArea = textAreaRef.current;

        if (!textArea) {
            return;
        }

        if (!textArea.value || textArea.value == '') {
            setIsSectionComplete(false);
        } else {
            setIsSectionComplete(true);
        }
    }

    return (
        <form className='text-form'>
            <textarea ref={textAreaRef} className='text-area' placeholder={placeholder} onChange={onChange}/>
        </form>
    );
}

export default TextArea;