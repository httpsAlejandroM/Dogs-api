import style from "./Card.module.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions";


const Card = ({id, name, image, height, weight, temperaments, life_span}) => {

    const dispatch = useDispatch();


    return (
        <div className={style.card}>
            <Link to="/detail"
            onClick={(e)=>dispatch(getDetail(id))}>
            <h3 className={style.name}>{name}</h3>
            <img src={image} alt="" width="200px" height="250px" />
            <p className={style.temperaments}>Temperaments: {temperaments}</p>
            <p className={style.weight}>Weight: {weight}</p>
            </Link>
        </div>
    )
}

export default Card;