type Props = {
    numero: number;
    nombre: string;
    tipo: string;
    ataque?:number;
    defensa:number;
    descripcion:string;
    imagen:string;
    vida:number;
};

function CardDetail({
    ataque,
    defensa,
    descripcion,
    imagen,
    nombre,
    numero,
    tipo,
    vida

}: Props){
    return(
        <div className="bg-gray-900 p-72 m-80">
            <h3>
                {nombre} (#{numero})
            </h3>
            <img className="w-60 h-96 " src={imagen} alt={nombre} />
            <p>Tipo: {tipo}</p>
            <p>Ataque: {ataque}</p>
            <p>Defensa {defensa}</p>
            <p>{descripcion}</p>
            <p>vida:{vida}</p>
        </div>
    );
}

export default CardDetail;



