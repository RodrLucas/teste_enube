export default function formatCurrency(currency) {
    const formatedCurrency = currency.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    return formatedCurrency
}