// funcao para converter hora em minutos
export default function converteHourToMinutes(time: string){
    const  [hour, minutes]= time.split(':').map(Number)
    const  timeInMinutes = (hour * 60) + minutes;
    return timeInMinutes;
}