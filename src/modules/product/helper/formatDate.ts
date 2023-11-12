export function formatoFecha(fechaISO: string) {
    // Paso 1: Parsear la fecha en formato ISO 8601
    const fecha = new Date(fechaISO);

    // Paso 2: Extraer los componentes de la fecha en formato UTC
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1; // Los meses van de 0 a 11, por lo que sumamos 1
    const año = fecha.getUTCFullYear();

    // Paso 3: Formatear los componentes en 'dd/mm/aaaa'
    const diaStr = dia < 10 ? `0${dia}` : dia.toString();
    const mesStr = mes < 10 ? `0${mes}` : mes.toString();
    const añoStr = año.toString();

    // Paso 4: Devolver el resultado
    return `${diaStr}/${mesStr}/${añoStr}`;
}