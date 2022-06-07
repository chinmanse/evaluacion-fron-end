import React from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";

function withParams(Component) {
  // return props => <Component {...props} params={useParams()} navigate= {navigate} />;
}

class Edit extends React.Component {

  host ="http://evaluacionbackend.combocompras.esy.es/api/productos/";
  imagePath = "http://evaluacionbackend.combocompras.esy.es/evaluacion/public/";
  
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      producto: null
    }
  }
  state = {  }

  componentDidMount() {
    const{id} = this.props.params;
    console.log(id);
    this.cargarProducto(id);
  }

  cargarProducto(id){
    fetch(this.host + "obtener-uno/" + id)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          datosCargados : true,
          producto : data,
          imagen: ""
        });
      })
      .catch(console.log);
  }

  redirect(){
    console.log(this.props.navigation);
  }

  onChangeImage = (event) => {
    document.getElementById("previsualizacion").style.display = "none";
    let images = event.target.files || event.dataTransfer.files;
    if(!images.length){
      return;
    }
    let image = images[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        imagen: e.target.result
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
      stock } = this.state.producto;
    
    var datosEnviar = {
      nombre: nombre,
      descripcion: descripcion,
      ruta: this.state.imagen,
      coste: coste,
      stock: stock,
      estado: 1
    }

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      body: JSON.stringify(datosEnviar)
    };

    fetch(this.host + this.state.producto.id, requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.props.navigate('/')
      })
      .catch(console.log);
  }

  cambioValor = (event) =>  {
    const state = this.state.producto;
    state [event.target.name] = event.target.value;
    this.setState({ producto: state });
  }

  render() { 
    const {
      datosCargados,
      producto
    } = this.state;
    if(!datosCargados){
      return (<div>Cargando datos....</div>);
    }
    return ( <div className="card">
      <div className="card-header">
        Edición de Producto
      </div>
      <div className="card-body">
        {producto.id}
        <form onSubmit={this.enviarDatos}>
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input type="text" name="nombre" id="nombre" value={producto.nombre} onChange={this.cambioValor} className="form-control" placeholder="Nombre" aria-describedby="helpId" />
            <small id="helpId" className="text-muted">Nombre del Producto</small>
          </div>
          <div className="form-group">
            <label>Descripción del Producto</label>
            <input type="text" name="descripcion" id="descripcion" value={producto.descripcion} onChange={this.cambioValor} className="form-control" placeholder="Descripción" aria-describedby="helpId" />
            <small id="helpId" className="text-muted">Descripción del Producto</small>
          </div>
          <div className="form-group">
            <label>Imagen</label>
            <br />
            <img id="previsualizacion" src={ this.imagePath + producto.ruta} alt={producto.nombre} width="100" height="100" />
            <input type="file" name="ruta" id="ruta" accept=".jpg,.png" onChange={this.onChangeImage} className="form-control" aria-describedby="helpId" />
            <small id="helpId" className="text-muted">Imagen del Producto</small>
          </div>
          <div className="form-group">
            <label>Costo</label>
            <input type="text" name="coste" id="coste" value={producto.coste} onChange={this.cambioValor} className="form-control" placeholder="0" aria-describedby="helpId" />
            <small id="helpId" className="text-muted">Costo del Producto</small>
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="text" name="stock" id="stock" value={producto.stock} onChange={this.cambioValor} className="form-control" placeholder="0" aria-describedby="helpId" />
            <small id="helpId" className="text-muted">Cantidad del producto en almacén</small>
          </div>
          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-success">Actualizar</button>
            <Link type="button" className="btn btn-danger" to="/">Cancelar</Link>
          </div>
        </form>


      </div>
      <div className="card-footer text-muted">
        
      </div>
    </div> );
  }
}

export default function EditWithRouter(props){
  const navigate = useNavigate();
  const params = useParams();
  return(<Edit {...props} params={params} navigate={navigate} ></Edit>);
}
