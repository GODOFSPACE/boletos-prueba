import { useState } from "react";

function Navigation() { 
  enum NavigationState {
    Home,
    Tickets,
    Location,
  }  
  const [navigationState, setnavigationState] = useState<NavigationState>(NavigationState.Home);
  return (
    <div className='flex w-full justify-center'>
      <div className='bg-[#D8E1E9] text-[#162346] font-bold p-2 flex justify-around w-[350px] rounded-2xl z-0'>
        <div 
          onClick={() => setnavigationState(NavigationState.Tickets)}
          className='flex flex-col justify-center items-center w-fit cursor-pointer'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-ticket z-20" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15 5l0 2"></path>
          <path d="M15 11l0 2"></path>
          <path d="M15 17l0 2"></path>
          <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"></path>
          </svg>
          <div className="z-20">Boletos</div>
          <div 
            className={
              `w-[24px] h-[24px] bg-[#D8E1E9] rounded-lg absolute z-10 transition-all duration-200 ease-in-out  
              ${navigationState === NavigationState.Tickets && 'scale-[3.5] border-2 border-current p-3'}`
            }>
          </div>
        </div>
        <div
          onClick={() => setnavigationState(NavigationState.Home)}
          className='flex flex-col justify-center items-center w-fit cursor-pointer'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home z-20" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
          </svg>
          <div className="z-20">Inicio</div>
          <div 
            className={
              `w-[24px] h-[24px] bg-[#D8E1E9] rounded-lg absolute z-10 transition-all duration-200 ease-in-out  
              ${navigationState === NavigationState.Home && 'scale-[3.5] border-2 border-current p-3 '}`
            }>
          </div>
        </div>
        <div 
          onClick={() => setnavigationState(NavigationState.Location)}
          className='flex flex-col justify-center items-center w-fit cursor-pointer'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin-filled z-20" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" stroke-width="0" fill="currentColor"></path>
          </svg>
          <div className="z-20">Ubicación</div>
          <div 
            className={
              `w-[24px] h-[24px] bg-[#D8E1E9] rounded-lg absolute z-10 transition-all duration-200 ease-in-out  
              ${navigationState === NavigationState.Location && 'scale-[3.5] border-2 border-current p-3'}`
            }>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;