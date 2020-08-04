import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto, ProductoId } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  urlProductos = 'https://portafolio-angular-294db.firebaseio.com/';
  cargando = true;
  producto: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {
      this.http.get(`${this.urlProductos}productos_idx.json`).subscribe((resp: Producto[]) => {
        this.producto = resp;
        // console.log(this.producto);
        setTimeout(() => {
          this.cargando = false;
          resolve();
        }, 500);
      });

    });

  }

  getProducto(id: string) {
    return this.http.get(`${this.urlProductos}productos/${id}.json`);
  }

  buscarProducto(termino: string) {

    if (this.producto.length === 0) {
      // cargar productos

      this.cargarProductos().then(() => {
        // ejecutar despues de tener los productos
        // aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar filtro
      this.filtrarProductos(termino);
    }

  }

  filtrarProductos(termino: string) {
    // console.log(this.producto);
    this.productoFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.producto.forEach(prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productoFiltrado.push(prod);
      }
    });
  }
}
