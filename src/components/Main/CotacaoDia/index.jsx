import React, { useState } from "react";
import { format, addDays } from 'date-fns'
import api from '../../../services/api'
import { useForm } from "react-hook-form";
import Table from '../../Table'
import { toast } from 'react-toastify';
import './styles.css'

export default function CotacaoDia() {
    const [cotacoesDia, setCotacoesDia] = useState([])
    const { register, handleSubmit } = useForm();

    const OnSubmitData = async cotacaoData => {
        let date = addDays(new Date(cotacaoData.date), 1)
        let dateFormat = format(new Date(date), 'MM-dd-yyyy')

        // Variáveis para encontrar a data atual
        const timeElapse = Date.now()
        const today = new Date(timeElapse)

        //Validação das datas inseridas pelo usuário
        if (date <= today) {
            toast.promise(
                api
                    .get(`CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dateFormat}'&$top=100&$format=json`)
                    .then((response) => setCotacoesDia(response.data.value))
                    .catch((err) => {
                        toast.error("ops! ocorreu um erro" + err);
                    }),
                {
                    success: 'Cotações carregadas com sucesso',
                    error: 'Por favor, verifique as datas'
                }
            )
        } else {
            toast.error('Por favor, insira uma data váida', {
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
            <form noValidate onSubmit={handleSubmit(OnSubmitData)}>
                <div className='container-inputs'>
                    <div className='container-calendar'>
                        <label className='label'>Data da cotação:</label>
                        <input className='calendar' type='date' {...register("date")} />
                    </div>
                    <button className='button' type='submit'>Enviar</button>
                </div>
                <div>
                    <Table props={cotacoesDia} />
                </div>
            </form>
        </>
    )
}