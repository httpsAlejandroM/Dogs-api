import Card from "../Card/Card";
import style from "./CardsContainer.module.css"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDogs } from "../../redux/actions";

const CardsContainer = ({dogsData}) => {
     const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDogs()) 
     },[dispatch])
 
   
    return (
        <div className={style.container}>
            {dogsData.map(dog => {
                return <Card
                key={dog.id}
                id={dog.id}
                image={dog.image}
                name={dog.name}
                height={dog.height}
                life_span={dog.life_span}
                temperaments={typeof dog.temperaments === "string" ? dog.temperaments : dog.temperaments.map(t=> t.name).join(", ")}
                weight={dog.weight}
                />
            })}
            

        </div>
    )
}

export default CardsContainer;