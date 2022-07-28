import React, { useState } from "react";
import './styles.css'
import CotacaoDia from './CotacaoDia'
import CotacaoPeriod from "./CotacaoPeriodo";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Main() {
    const [cot, setCot] = useState(''); //Cot -> Cotação

    const handleChange = (event) => {
        setCot(event.target.value);
    };   

    return (
        <main>
            <FormControl fullWidth className='formControl'>
                <InputLabel id="demo-simple-select-label">Cots</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cot}
                    label="Cotação"
                    onChange={handleChange}
                >
                    <MenuItem value={'Cotação por Data'}>Cotação por Data</MenuItem>
                    <MenuItem value={'Cotação por Período'}>Cotação por Período</MenuItem>
                </Select>
            </FormControl>
            {console.log('Aviso')}
            {cot === '' ? null : cot === 'Cotação por Data' ? <CotacaoDia /> : <CotacaoPeriod />}
        </main>
    )
}