export function formatPrice(numero: number | bigint) {
    const formatoNumero = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formatoNumero.format(numero);
}