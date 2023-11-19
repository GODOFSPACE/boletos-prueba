import { useRef, useState } from 'react';
import { nameInput, numberInput, errorName, errorNumber } from '../context/formData';
import { useStore } from '@nanostores/react';
import Input from './Input';
import QRCodeSVG from 'qrcode.react';
import generatePDF from 'react-to-pdf';
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
    const id = uuidv4();
    if($dataNameInput === '' || $dataNumberInput === ''){
      errorName.set(true);
      errorNumber.set(true);
      return;
    }
    if($errorName || $errorNumber){
      return;
    }   
    setRegistro({
      id: id,
      name: $dataNameInput,
      number: $dataNumberInput
    });
    fetch('https://api.myjson.online/v1/records', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-collection-access-token': '2888450c-d49b-4dc5-9145-95fbeb052224'
      }),
      body: new URLSearchParams({
        'jsonData': JSON.stringify(
          {
            id: id,
            name: $dataNameInput,
            number: $dataNumberInput
          }
        ),
        'collectionId': 'caa7c1ec-052e-4165-a37f-9322556c2d1e'
      }),
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    setGenerarQR(true);    
  }

  const $data = useStore(nameInput);

  const targetRef = useRef();

  return (    
    <div className='flex flex-col gap-8'>
      <div>
      ¡Nos encantaría contar con tu presencia!
      </div>
      {
        !generarQR &&
        <div className='flex flex-col gap-8'>        
        <div>Por favor, confirma tu asistencia completando el siguiente formulario:</div>
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
        </div>
      }
      
        {      
          generarQR &&
          <div>
            <div className="width-full flex justify-center" ref={targetRef}>
              <div className='flex flex-col justify-center items-center gap-2 p-4 w-fit border-8 border-[#3772FF] rounded-2xl'>
                <div className='w-fit'>
                  <div className='font-black text-[#3772FF]'>BOLETO DE ADMISIÓN</div>
                  <div className='p-2'>
                    <hr className='border-2 border-[#3772FF] '></hr>
                  </div>
                  <div>Salón 23 ahuizotl</div>
                </div>
                <div className='border-t-2 border-b-2 border-[#3772FF] flex items-center'>
                  <div className='px-2 font-bold'>3:00 PM</div>
                  <div className='border-l-2 border-[#3772FF] font-black border-r-2 px-2'>16 Diciembre</div>
                  <div className='px-2 font-bold'>2023</div>
                </div>
                <div>
                  <div>{$dataNameInput}:</div>
                  <div className="font-bold text-[#3772FF]">{`${$dataNumberInput} ${parseInt($dataNumberInput)>1?'Invitados':'Invitado'}`}</div>
                </div>                
                <div className="flex w-fit justify-center border-4 border-[#3772FF] rounded-xl p-2 mx-auto">
                  <QRCodeSVG value={JSON.stringify(registro)} size={150} bgColor="#EDF7F6" fgColor="#3772FF"/>
                </div>
              </div>
            </div>
            <button className="bg-[#3772FF] font-bold p-4 rounded-xl mt-2"
              onClick= {()=> generatePDF(targetRef, {filename: 'Boleto-Alma-Jesus.pdf'})}
            >
              Descargar boleto
            </button>
          </div>
        }
        <div className="font-bold">¡No olvides descargar y guardar tu boleto al finalizar! Será necesario para el ingreso.</div>
    </div>
  )  
}