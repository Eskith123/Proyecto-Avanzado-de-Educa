type Props = {
    numero: number;
    nombre: string;
    vida: number;
    tipo: string;
    ataque?:number;
    defensa:number;
    descripcion:string;
    imagen:string;

};

function CardDetail({
    ataque,
    defensa,
    vida,
    descripcion,
    imagen,
    nombre,
    numero,
    tipo,

}: Props){
    return(
        <div>
            <h3>
                {nombre} (#{numero})
            </h3>
            <img src={imagen} alt={nombre} />
            <p>Tipo: {tipo}</p>
            <p>Ataque: {ataque}</p>
            <p>Defensa: {defensa}</p>
            <p>{descripcion}</p>
            <p>vida: {vida}</p>
        </div>
    );
}

export default CardDetail








