import React from 'react';

import { Link } from 'react-router-dom';

class List extends React.Component {
  host ="http://evaluacionbackend.combocompras.esy.es/api/productos/";
  imagePath = "http://evaluacionbackend.combocompras.esy.es/evaluacion/public/";
  pagina=0;
  constructor(props) {
    super(props);
    this.state = {
      datosCargados : false,
      productos: []
    };
  }

  eliminarProducto(id){
    let myHeaders = new Headers();
    
    myHeaders.append("Content-Type", "application/json");
    var raw = "\n\n";

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(this.host + id, requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.cargarDatos();
      })
      .catch(console.log);
  }

  cargarDatos(){
    fetch(this.host+this.pagina)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          datosCargados : true,
          productos : data
        });
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.cargarDatos();
  }
  state = {  }
  render() { 
    const { datosCargados, productos } = this.state;
    if(!datosCargados){
      return (<div>Cargando....</div>);
    }
    return ( 
      <>
      <div className="card">
        <div className="card-header">
        <Link className="btn btn-success" to="/nuevo">Nuevo Producto</Link>
        </div>
        <div className="card-body">
          <h2>Listado de Productos</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Costo</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>
                      <img src={ this.imagePath + producto.ruta} alt={producto.nombre} width="100" height="100" />
                    </td>
                    <td>{producto.coste}</td>
                    <td>{producto.stock}</td>
                    <td></td>
                    <td>
                      <div className = "btn-group" role="group" aria-label=''>
                        <Link className="btn btn-warning" to={{ pathname: "/editar/" + producto.id,  state:{id : producto.id}}}>
                          Editar
                        </Link>
                        <button className="btn btn-danger" onClick={()=> this.eliminarProducto(producto.id)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
              
            </tbody>
          </table>
          <ul className="pagination">
            <li className="page-item"><a className="page-link" onClick={()=> { if(productos.length == 5 ) this.pagina++; this.cargarDatos();}}>Next</a></li>
            <li className="page-item"><a className="page-link" onClick={()=> {if(this.pagina > 0)this.pagina--; this.cargarDatos();  }}>Prev</a></li>
          </ul> 
        </div>
      </div>
    </> );
  }
}
 
export default List;