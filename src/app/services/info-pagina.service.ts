import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina, Equipo } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: Equipo[] = [];

  url = 'https://portafolio-angular-294db.firebaseio.com/equipo.json';

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
     // console.log(resp);
    });
  }

  private cargarEquipo() {
    this.http.get(this.url).subscribe((resp: Equipo[]) => {
      this.cargada = true;
      this.equipo = resp;
      // console.log(resp);
    });
  }
}
