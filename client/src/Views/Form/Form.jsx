import { useEffect, useState } from "react";
import style from "./Form.module.css"
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector(state => state.allTemperaments)

    const [form, setForm] = useState({
        image: "",
        name:"",
        min_weight:"",
        max_weight:"",
        min_height:"",
        max_height: "",
        life_span:"",
        temperaments: "",
    })

    const [errors, setErrors] = useState({
        image: "",
        name:"",
        min_weight:"",
        max_weight:"",
        min_height:"",
        max_height: "",
        life_span:"",
        temperaments: []
    })

    const errorsHandler = (form) =>{  
        let errores = {}
        if(form.image === "")  errores.image = "" 
        if (form.image.length > 0 && !/(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\S*)?/.test(form.image)) {
            errores.image = "The link must be an image"  
        }


        if(form.name === "")  errores.name = "" 
         if(form.name && form.name.length < 3) errores.name = "The name must have at least 3 characters" 
         if(form.name.length > 0  && !isNaN(form.name)) errores.name = "The name cannot be a number"

         if(form.max_weight && form.min_weight > form.max_weight) errores.min_weight = "Min weight must be less than Max weight"
     
         if(form.max_height && form.min_height > form.max_height) errores.min_height = "Min height must be less than Max height"
        
         if(form.life_span > 50) errores.life_span = "Life span cannot be greater than 50"

    return errores
 }

 const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({...form, [property]:value})    
    
    setErrors(errorsHandler({...form, [property]:value}))
}


    useEffect(()=>{
        dispatch(getTemperaments())
     },[dispatch])

    


    const selectHandler = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setForm((prevForm) => ({
          ...prevForm,
          temperaments: selectedOptions
        }));
      };

    const submitHandler = (e) => {
        e.preventDefault();
        if(!form.name || !form.image || !form.min_height || !form.max_height || !form.min_weight || !form.max_weight || !form.life_span || !form.temperaments){
            alert("Missing data")
        }
        else{
         const result = {
            name:form.name,
            image:form.image,
            height:`${form.min_height}cm - ${form.max_height}cm`,
            weight:`${form.min_weight}kg - ${form.max_weight}kg`,
            life_span:`${form.life_span} years`,
            temperamentId:form.temperaments
        }
        dispatch(postDog(result));
        
        
        alert("Dog successfully created!");
        
        setForm({
            image: "",
            name:"",
            min_weight:"",
            max_weight:"",
            min_height:"",
            max_height: "",
            life_span:"",
            temperamentId: "",
        })
        
        history.push("/home")
    }
    }

    
   


    return (
        <div className={style.bodyForm}>
            <div>
                <h1>Create your dog!</h1>
            </div>
      <form className={style.form}  onSubmit={submitHandler}>
        <div className={style.containInputs}>
      <div className={style.formControl}>
            <label className={style.label}>Image: </label>
            <input className={style.input} type="text" value={form.image} onChange={changeHandler} name="image"/>
            {errors.image && <span>{errors.image}</span>}
        
            <label className={style.label}>Name: </label>
            <input className={style.input} type="text" value={form.name} onChange={changeHandler} name="name"/>
            {errors.name && <span>{errors.name}</span>}
        </div>

        <div className={style.formControl}>
            <label className={style.label}>Min weigth: </label>
            <input className={style.input} type="number" value={form.min_weight} onChange={changeHandler} name="min_weight"/>
            {errors.min_weight && <span>{errors.min_weight}</span>}
            <label className={style.label}>Max weigth: </label>
            <input className={style.input} type="number" value={form.max_weight} onChange={changeHandler} name="max_weight"/>
        </div>
        <div className={style.formControl}>
            <label className={style.label}>Min height: </label>
            <input className={style.input} type="number" value={form.min_height} onChange={changeHandler} name="min_height"/>
            {errors.min_height && <span>{errors.min_height}</span>}
            <label className={style.label}>Max height: </label>
            <input className={style.input} type="number" value={form.max_height} onChange={changeHandler} name="max_height"/>
        </div>
        <div className={style.qloq}>
            <label className={style.label}>Life span: </label>
            <input className={style.input} type="number" value={form.life_span} onChange={changeHandler} name="life_span"/>
            {errors.life_span && <span>{errors.life_span}</span>}
        <select multiple={true} className={style.select}onChange={selectHandler} >
            {
                temperaments.map(t => {
                    return <option key={t.id} value={t.id}>{t.name}</option>
                })
            }
        </select>
            </div>
            <div> 
        <button className={style.buttonCreate}  type="submit">Create</button>
        </div>
        </div>
      </form>
      <div>
      <Link to="/home">
                <button className={style.button}>Go back</button>
            </Link>
            
      </div>
      </div>
    )
    
}


export default Form;