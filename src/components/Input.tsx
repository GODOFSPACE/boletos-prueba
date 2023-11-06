import { useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import type { WritableAtom } from 'nanostores';

interface InputProps {
  label: string;
  placeholder: string;
  inputData: WritableAtom<string>;
  errorData: WritableAtom<boolean>;
  type: 'text' | 'number';
}

export default function Input ({label, placeholder, inputData, type, errorData}: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [activeForm, setActiveForm] = useState<boolean>(false);
  const handleButtonClick = () => {    
    inputRef.current?.focus();
  };
  const $data = useStore(inputData); 
  const $error = useStore(errorData); 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if(newValue.trim()==='' || newValue===null){   
      errorData.set(true);
    } else {    
      errorData.set(false);
    }    
    inputData.set(newValue);
  };

  return (
    <div>
      <div className={`flex flex-col border-4 p-2 rounded-xl cursor-text text-start transition duration-500 ease-in-out ${$error?'border-[#FF5A5F]':activeForm ?'border-[#4d7cff]': 'border-[#acc6ff]'}`}
      onClick={() => handleButtonClick()}
      > 

        <div className="text-base">{label}</div> 
        <input
          type={type}
          ref={inputRef}
          className="appearance-none bg-transparent outline-none" 
          placeholder={placeholder} 
          onFocus={()=> setActiveForm(true)} 
          onBlur={()=>setActiveForm(false)}
          value={$data}
          onChange={handleInputChange}
        />  
      </div>
      {
        $error && <div className='text-start text-[#FF5A5F]'>Este campo es obligatorio</div>
      }  
    </div>
  )  
}
