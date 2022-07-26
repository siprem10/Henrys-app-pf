import React, {useState, useEffect} from "react";
import {connect, useDispatch, useSelector} from 'react-redux'
import { getIngredients } from "../../Redux/actions/actions";


const mapStateToProps = function(state){
    return {ingredients: state.ingredients}
}
const modificarIngredientes = function(id, ingredientes, cb, precio, setPrecio){
    cb(ingredientes = ingredientes.filter((i) => i.id !== id))
    let sumaTotal = 0
    for(const ele of ingredientes){
        let {cantidad} = ele
        sumaTotal += (ele.price * cantidad) 
    }
    setPrecio(precio = sumaTotal.toFixed(2))
}

const añadirIngredientes = function(e, ingredientes, cb, igrGlobal, precio, setPrecio){
    const ingredienteSelect = igrGlobal.find((i) => i.name === e.target.value)
    let prueba = []
    for(const ele of ingredientes){
        if(ele.name === ingredienteSelect.name){
            prueba.push(ele)
        }
    }
    
    
    if(prueba.length > 0){
        prueba = []
    }else{
        ingredienteSelect.cantidad = 1
        cb(ingredientes = [...ingredientes, ingredienteSelect])
        const copiaIngredientes = [...ingredientes]
        precioPrimeraVez(precio, setPrecio, copiaIngredientes)
    }
}
const precioPrimeraVez = function(precio, setPrecio, ingredientes){
    let sumaTotal = 0
    for(const ele of ingredientes){
        let {cantidad} = ele
        sumaTotal += (ele.price * cantidad) 
    }
    setPrecio(precio = sumaTotal.toFixed(2))
}

const cambiarCantidad = function(e, id, ingredientes, cb, precio, setPrecio){
    const ingredienteSelect = ingredientes.find((i) => i.id === id)
    const index = ingredientes.indexOf(ingredienteSelect)
    if(e.target.name === 'mas' && ingredienteSelect.cantidad < 10){
        ingredienteSelect.cantidad += 1
    }
    else if(e.target.name === 'menos' && ingredienteSelect.cantidad > 1){
        ingredienteSelect.cantidad -= 1
    }
    let copiaIngredientes = [...ingredientes]
    copiaIngredientes[index] = ingredienteSelect
    
    cb(ingredientes = [...copiaIngredientes])
    let sumaTotal = 0
    for(const ele of ingredientes){
        let {cantidad} = ele
        sumaTotal += (ele.price * cantidad) 
    }
    if(ingredienteSelect.cantidad > 0){
        setPrecio(precio = sumaTotal.toFixed(2))
    }
    
}
const crearBurguer = function(precio, ingredientes, setIngredientsAdd){

    setIngredientsAdd(ingredientes = [])
    alert(`su hamburguesa tiene un precio de: ${  precio}`)
}   

function AddBurger(estado){
    const {ingredients} = estado
    const [ingredientsAdd, setIngredientsAdd] = useState([])
    const [precio, setPrecio] = useState(0.0)
    const dispatch = useDispatch()
    useEffect(() => {
     dispatch(getIngredients())
    })

    return(
        <div>
            <h1>Arma tu Hamburguesa</h1>

            <select name="ingredientes" onChange={(e) => añadirIngredientes(e, ingredientsAdd, setIngredientsAdd, ingredients, precio, setPrecio)}>
            <option key={1000} disabled="">Escoge tus ingredientes</option>
            {ingredients.map((i) => (
                    <option key={i.id} value={i.name}>{i.name}</option>
                ))}
            </select>
            
            <div>
                <ul>
                    {ingredientsAdd.map((i) => (
                        <div key={i.id}>
                            <li key={i.id}>{i.name}</li>
                            <button key={i.id} onClick={() => modificarIngredientes(i.id, ingredientsAdd, setIngredientsAdd, precio, setPrecio)}>X</button>
                            <span>Cantidad</span>
                            <span> {i.cantidad}</span>
                            <button name='mas'onClick={(e) => cambiarCantidad(e, i.id, ingredientsAdd, setIngredientsAdd, precio, setPrecio)}>+</button>
                            <button name='menos' onClick={(e) => cambiarCantidad(e, i.id, ingredientsAdd, setIngredientsAdd, precio, setPrecio)}>-</button>
                        </div>
                        ))}
                </ul>
            </div>
            <h4>Precio Neto ${precio}</h4>
            <button onClick={() => crearBurguer(precio, ingredientsAdd, setIngredientsAdd)}>Crear Hamburguesa</button>

        </div>
    )
}

export default connect(mapStateToProps)(AddBurger)