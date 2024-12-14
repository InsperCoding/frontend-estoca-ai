import { HomeSimpleDoor, Closet, ListSelect, User } from 'iconoir-react';
import Add from './add';
import Item from './item';
import Background from './background';

export default function Footer() {
    return (
        <div>
            <Background></Background>
            <footer className='w-full flex flex-row items-center justify-center bg-white fixed bottom-0 pl-8 pr-8 pb-7 pt-4'>
                <div className='w-dvw flex flex-row items-center justify-between'>
                    <Item href="/aplicacao/casas" label="Casas" Icon={HomeSimpleDoor} />
                    <Item href="/aplicacao/despensa" label="Despensa" Icon={Closet} />
                    <Add></Add>
                    <div></div>
                    <Item href="/aplicacao/lista" label="Lista" Icon={ListSelect} />
                    <Item href="/aplicacao/perfil" label="Perfil" Icon={User} />
                </div>
            </footer>
      </div>
    );
  }
  