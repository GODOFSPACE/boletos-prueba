import { useState } from 'react';
import { nameInput, numberInput, errorName, errorNumber } from '../context/formData';
import { useStore } from '@nanostores/react';
import Input from './Input';
import {QRCodeSVG} from 'qrcode.react'
import { v4 as uuidv4 } from 'uuid';
interface BoletoData {
  id: string;
  name: string;
  number: string;
}

export default function Formulario () {  
  const [generarQR, setGenerarQR] = useState<boolean>(false);
  const [registro, setRegistro] = useState<BoletoData>();
  const $dataNameInput = useStore(nameInput);
  const $dataNumberInput = useStore(numberInput);
  const $errorName = useStore(errorName);
  const $errorNumber = useStore(errorNumber);
  const onClick = () => {
    if($dataNameInput==='' || $dataNumberInput===''){
      errorName.set(true);
      errorNumber.set(true);
      return;
    }
    if($errorName || $errorNumber){
      return;
    }   
    setRegistro({
      id: uuidv4(),
      name: $dataNameInput,
      number: $dataNumberInput
    })
    setGenerarQR(true);
  }

  const $data = useStore(nameInput);

  return (
    <div className='flex flex-col gap-8'>
      <Input
        label="Nombre completo"
        placeholder="Nombre del representante"
        type='text'
        inputData={nameInput}
        errorData={errorName}
      />
      <Input
        label="Numero de acompañantes"
        placeholder="Numero de acompañantes incluyendote a ti"
        type='number'
        inputData={numberInput}
        errorData={errorNumber}
      />
      <button 
        className='bg-[#3772FF] font-bold p-4 rounded-xl'
        onClick={onClick}
      >
        Confirmar asistencia
      </button>
        {      
          generarQR &&
          <div className="flex w-fit justify-center border-4 border-[#3772FF] rounded-xl p-2 mx-auto">
            <QRCodeSVG value={JSON.stringify(registro)} size={150} bgColor="#EDF7F6" fgColor="#3772FF"/>
          </div>
        }
    </div>
  )  
}
