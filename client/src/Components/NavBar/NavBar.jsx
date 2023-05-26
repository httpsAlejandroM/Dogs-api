import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { getTemperaments } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


const NavBar = ({filteredByTemperamentHandler, filterBySourceHandler, orderedByWeightHandler, searchHandler, orderedAlphaHandler}) => {  

    const dispatch = useDispatch()
     const temperaments = useSelector((state) => state.allTemperaments)
     const [searchValue, setSearchValue] = useState("");
   
    useEffect(() => {
        dispatch(getTemperaments())
    },[dispatch])

    useEffect(() => {
        setSearchValue("")
    },[searchHandler])

       return(
        <div className={style.mainContainer}>
            <Link to="/form">Create dog</Link>
            <div>
                <input className={style.inputStyle} type="text" value={searchValue} placeholder="Search"
                onChange={(e) => setSearchValue(e.target.value)}
                />
                <button value={searchValue} onClick={(event) => searchHandler(event)}>Search</button>
                </div>
                <div>
                <button value="all" onClick={(event) => filterBySourceHandler(event)}>All dogs</button>
                <select onChange={(e) =>filteredByTemperamentHandler(e)}>
                {temperaments.map(t => {
                    return <option key={t.name} value={t.name} >{t.name}</option>
                })}
                </select>
            <select onChange={(event) => orderedAlphaHandler(event)}>
                <option value="az">A - Z</option>
                <option value="za">Z - A</option>
            </select>
            <select onChange={(event) => filterBySourceHandler(event)}>
                <option value="false">Dogs API</option>
                <option value="true">Dogs DB</option>
            </select>
            <select onChange={(event) => orderedByWeightHandler(event)}>
                <option value="lighter">Lighter</option>
                <option value="heavier">Heavier</option>
            </select>
            </div>
        </div>
    )
}

export default NavBar;