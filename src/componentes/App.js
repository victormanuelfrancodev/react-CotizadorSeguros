import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import {obtenerDiferenciaAnio,calcularMarca,obtenerPlan} from '../helper';
import Resumen from './Resumen';
import Resultado from './Resultado'

class App extends Component {

state ={
  resultado: '',
  datos:{}
}

  cotizarSeguro = (datos) => {
    console.log(datos);
    const {marca, plan, year} = datos;

    // Agregar una base de 2000;
    let resultado = 2000;

    // obtener la diferencia de años
    const diferencia = obtenerDiferenciaAnio(year);

    // por cada año restar el 3%
    resultado -= ((diferencia * 3) * resultado) / 100;

    //Americano 15% Asiatico 5% y europeo 30% aumento
    resultado = calcularMarca(marca) * resultado;
    let incrementoPlan = obtenerPlan(plan);
     resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

     // datos para resumen
     const datosAuto = {
       marca: marca,
       plan: plan,
       year: year
     }

    this.setState({
      resultado: resultado,
      datos: datosAuto
    })

  }
  render() {
    return (
      <div className="contenedor">
         <Header
          titulo = 'cotizador de seguros'
          />

         <div className= "contenedor-formulario">
            <Formulario
              cotizarSeguro = {this.cotizarSeguro}
            />
            <Resumen
              datos = {this.state.datos}
              resultado = {this.state.resultado}
            />
            <Resultado
              resultado = {this.state.resultado}
            />
         </div>
      </div>
    );
  }
}

export default App;
