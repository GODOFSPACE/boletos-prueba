import { nameInput, numberInput } from '../context/formData';
import Input from './Input';

export default function Formulario () {

  return (
    <div className='flex flex-col gap-8'>
      <Input
        label="Nombre completo"
        placeholder="Nombre del representante"
        type='text'
        inputData={nameInput}
      />
      <Input
        label="Numero de acompañantes"
        placeholder="Numero de acompañantes incluyendote a ti"
        type='number'
        inputData={numberInput}
      />
      <button 
        className='bg-[#3772FF] font-bold p-4 rounded-xl'

      >
        Confirmar asistencia
      </button>
    </div>
  )  
}
