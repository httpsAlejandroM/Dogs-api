import { Link } from "react-router-dom";
import style from "./Landing.module.css"

const Landing = () => {
    return (
        <div className={style.container}>
        <h1 className={style.title}>Welcome</h1>
        <Link to="/home">
        <button className={style.button}>Enter</button>
        </Link>
        </div>
    )
    
}

export default Landing;