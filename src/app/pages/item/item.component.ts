import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoId } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoId;
  id: string;

  constructor(private route: ActivatedRoute, private productosService: ProductosService) { }

  ngOnInit(): void {
    // Está pendinete de todos los parametros enviados por URL
    this.route.params.subscribe(paramentros => {
      // console.log(paramentros['id']);
      this.productosService.getProducto(paramentros['id']).subscribe((resp: ProductoId) => {
        this.id = paramentros['id'];
        this.producto = resp;
        // console.log(this.producto);
      });
    });
  }

}
