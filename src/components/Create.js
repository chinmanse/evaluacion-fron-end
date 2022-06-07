import React from 'react';

import {Link, useNavigate} from "react-router-dom"

class Create extends React.Component {
  
  host ="http://evaluacionbackend.combocompras.esy.es/api/productos";
  constructor(props) {
    super(props);
    this.state= {
      nombre: "",
      descripcion: "",
      ruta: "",
      coste: "",
      stock: ""
    }
  }
  state = {  }

  onChangeImage = (event) => {
    let images = event.target.files || event.dataTransfer.files;
    if(!images.length){
      return;
    }
    let image = images[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        ruta: e.target.result
      });
    };
    reader.readAsDataURL(image);
  }

  enviarDatos = (event) => {
    let myHeaders = new Headers();
    
    myHeaders.append("Content-Type", "application/json");
    var raw = "\n\n";

    
    event.preventDefault();
    const {
      nombre,
      descripcion,
      ruta,
      coste,
      stock } = this.state;
    console.log(nombre);
    console.log(descripcion);
    console.log(coste);
    console.log(stock);

    var datosEnviar = {
      nombre: nombre,
      descripcion: descripcion,
      coste: coste,
      ruta: ruta,
      stock: stock,
      estado: 1
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      body: JSON.stringify(datosEnviar)
    };
    console.log(this.state.ruta);

    

    fetch(this.host, requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        //this.props.history.push("/");
        this.props.navigate('/')
        //navigate("../", { replace: true });
      })
      .catch(console.log);
  }

  cambioValor = (event) =>  {
    const state = this.state;
    state [event.target.name] = event.target.value;
    this.setState(state);
  }


  render() { 
    const {
      nombre,
      descripcion,
      ruta,
      coste,
      stock } = this.state;
    return ( <div className="card">
      <div className="card-header">
        Nuevo Producto
      </div>
      <div className="card-body">
        <form onSubmit={this.enviarDatos} encType="multipart/form-data">
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input type="text" name="nombre" id="nombre" value={nombre} onChange={this.cambioValor} className="form-control" placeholder="Nombre" aria-describedby="helpId" />
            <small id="helpId" className="text-muted">Nombre del Producto</small>
          </div>
          <div className="form-group">
            <label>Descripción del Producto</label>
            <input type="text" name="descripcion" id="descripcion" value={descripcion} onChange={this.cambioValor} className="form-control" placeholder="Descripción" aria-describedby="helpId" />
            <small id="helpId" className="text-muted">Descripción del Producto</small>
          </div>
          <div className="form-group">
            <label>Imagen</label>
            <input type="file" name="ruta" id="ruta" accept=".jpg,.png" onChange={this.onChangeImage} className="form-control" aria-describedby="helpId" />
            <small id="helpId" className="text-muted">Imagen del Producto</small>
          </div>
          <div className="form-group">
            <label>Costo</label>
            <input type="text" name="coste" id="coste" value={coste} onChange={this.cambioValor} className="form-control" placeholder="0" aria-describedby="helpId" />
            <small id="helpId" className="text-muted">Costo del Producto</small>
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="text" name="stock" id="stock" value={stock} onChange={this.cambioValor} className="form-control" placeholder="0" aria-describedby="helpId" />
            <small id="helpId" className="text-muted">Cantidad del producto en almacén</small>
          </div>
          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-success">Guardar</button>
            <Link type="button" className="btn btn-danger" to="/">Cancelar</Link>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">
        
      </div>
    </div> );
  }
}


export default function CreateWithRouter(props){
  const navigate = useNavigate();
  return(<Create navigate={navigate} ></Create>);
}
//export default Create;