'use client';

import {Filter} from 'iconoir-react';
import { useState } from 'react';

export default function HeaderLista() {
    const [filter, setFilter] = useState(false);

    return (
        <header className="pl-8 pr-8 pb-8 pt-8 flex flex-row w-screen items-center justify-between">
            <h1 className="text-3xl font-bold text-cinza1">Despensa</h1>
            <Filter onClick={() => setFilter(!filter)} className='text-base'></Filter>
        </header>
    );
}
  