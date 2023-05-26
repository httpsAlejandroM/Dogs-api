import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import Pagination from "../../Components/Paginado/Paginado";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import { filterBySource, filterByTemperament, orderByWeight, searchDogByName, orderAlpha } from "../../redux/actions";
import style from "./Home.module.css"

const Home = () => {

  const dispatch = useDispatch()
  const filteredDogs = useSelector(state=> state.dogs) 
  const allDogs = useSelector(state=> state.allDogs)

  const [dogsData, setDogsData] = useState(allDogs) 

  const [currentPage, setCurrentPage] = useState(1)
  const [dogsPerPage] = useState(8)
  const lastDogIndex = currentPage * dogsPerPage;
  const firstDogIndex = lastDogIndex - dogsPerPage;
  
  const [currentCards, setCurrentCards ]= useState(dogsData.slice(firstDogIndex, lastDogIndex))

  useEffect(() => {
    setDogsData(filteredDogs)
    setCurrentCards(dogsData.slice(firstDogIndex, lastDogIndex));
  }, [dogsData, currentPage, filteredDogs, firstDogIndex, lastDogIndex]);
  
  const filterBySourceHandler = (event) => {
    dispatch(filterBySource(event.target.value));
    setDogsData(filteredDogs)
    setCurrentPage(1);
}

const filteredByTemperamentHandler = (event) => {
  dispatch(filterByTemperament(event.target.value))
  setDogsData(filteredDogs)
  setCurrentPage(1)
}

const orderedByWeightHandler = (event) => {
  dispatch(orderByWeight(event.target.value))
  setDogsData(filteredDogs)
  setCurrentPage(1)
}

const orderedAlphaHandler = (event) => {
  dispatch(orderAlpha(event.target.value))
  setDogsData(filteredDogs)
  setCurrentPage(1)
}


const searchHandler = (event) => {
  dispatch(searchDogByName(event.target.value))
  setDogsData(filteredDogs)
  setCurrentPage(1)
}

    return (
        <div className={style.container}>
        <NavBar filterBySourceHandler={filterBySourceHandler}
        filteredByTemperamentHandler={filteredByTemperamentHandler}
        orderedByWeightHandler={orderedByWeightHandler}
        searchHandler={searchHandler}
        orderedAlphaHandler={orderedAlphaHandler}
        />
        <div className={style.cards}>
        <CardsContainer dogsData={currentCards}/>
        </div>
        <div className={style.Pagination}>
        <Pagination totalDogs={dogsData.length} 
        dogsPerPage={dogsPerPage} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}/>
        </div>
        </div>
    )
    
}

export default Home;