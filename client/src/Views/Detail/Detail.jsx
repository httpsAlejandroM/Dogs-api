import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Detail.module.css"

const Detail = () => {
    const dogs = useSelector((state) => state.detail);

    if (!dogs || dogs.length === 0) {
        return (
            <div className={styles.bodyDetail}>
        <div className={styles.container}>
        <h1 className={styles.h1}>Loading...</h1>
       
        <Link to="/home">
                <button className={styles.button}>Go back</button>
            </Link>
            </div>
            </div>)   
    }

    return (
        <div className={styles.bodyDetail}>
        <div className={styles.container}>
          <div>  <h1 className={styles.h1}>{Array.isArray(dogs) ? dogs[0].name : dogs.name}</h1></div>
            <img className={styles.img} src={Array.isArray(dogs) ? dogs[0].image : dogs.image} alt={Array.isArray(dogs) ? dogs[0].name : dogs.name} />
            <h3>Height: {Array.isArray(dogs) ? dogs[0].height : dogs.height} </h3>
            <h3>Weight: {Array.isArray(dogs) ? dogs[0].weight : dogs.weight}</h3>
            <h3>Temperaments: {Array.isArray(dogs) ? dogs[0].temperaments : dogs?.temperaments?.map(t => t.name).join(", ")}</h3>
            <h3>Life span: {Array.isArray(dogs) ? dogs[0].life_span : dogs.life_span}</h3>
            <Link to="/home">
                <button className={styles.button}>Go back</button>
            </Link>
        </div>
        </div>
    );
};

export default Detail;