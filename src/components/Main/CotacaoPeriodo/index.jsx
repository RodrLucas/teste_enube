import React, { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { format, addDays } from 'date-fns'
import api from '../../../services/api'
import { useForm } from "react-hook-form";
import Table from '../../Table'
import { toast } from 'react-toastify';
import './styles.css'

export default function CotacaoPeriod() {
    // Grupo de botões selecionáveis
    const [alignment, setAlignment] = useState(0);
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    }

    const [cotacoesPeriod, setCotacoesPeriod] = useState([])
    const [AddedDays, setAddedDays] = useState(Date.now())
    const { register, handleSubmit } = useForm();


    const OnSubmitPeriod = async cotacaoData => {
        // Criação das variáveis de datas
        let dataInicial = addDays(new Date(cotacaoData.dataInicial), 1)
        let dataFinal = addDays(new Date(dataInicial), alignment)


        let dataInicialFormatada = format(new Date(dataInicial), 'MM-dd-yyyy')
        let dataFinalFormatada = format(new Date(dataFinal), 'MM-dd-yyyy')
        let dataFinalInput = format(new Date(dataFinal), 'yyyy-MM-dd') //Input
        setAddedDays(dataFinalInput)

        // Variáveis para encontrar a data atual
        const time = Date.now()
        const today = new Date(time)

        //Validação das datas inseridas pelo usuário
        if (dataInicial <= today && dataFinal <= today) {
            toast.promise(
                api
                    .get(`CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${dataInicialFormatada}'&@dataFinalCotacao='${dataFinalFormatada}'&$top=100&$format=json`)
                    .then((response) => setCotacoesPeriod(response.data.value))
                    .catch((err) => {
                        toast.error("ops! ocorreu um erro" + err);
                    }),
                {
                    success: 'Cotações carregadas com sucesso',
                    error: 'Por favor, verifique as datas'
                }
            )
        } else {
            toast.error('Por favor, insira uma data váida de acordo com o período escolhido', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <>
            <div className='button-group'>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value={7} >7 Dias</ToggleButton>
                    <ToggleButton value={14}>14 Dias</ToggleButton>
                    <ToggleButton value={21}>21 Dias</ToggleButton>
                </ToggleButtonGroup>
            </div>

            {alignment === 0
                ?
                null
                :
                <form noValidate onSubmit={handleSubmit(OnSubmitPeriod)}>
                    <div className='container-inputs'>
                        <div className='container-calendar'>
                            <div className='container-calendar-inputs'>
                                <label className='label'>Data inicial:</label>
                                <input className='calendar' type='date' {...register("dataInicial")} />
                            </div>

                            <div className='container-calendar-inputs'>
                                <label className='label'>Data Final:</label>
                                <input value={AddedDays} disabled className='calendar' type='date' {...register("dataFinal")} />
                            </div>
                        </div>
                        <button className='button' type='submit'>Enviar</button>
                    </div>
                    <div>
                        <Table props={cotacoesPeriod} />
                    </div>
                </form>
            }
        </>
    )
}