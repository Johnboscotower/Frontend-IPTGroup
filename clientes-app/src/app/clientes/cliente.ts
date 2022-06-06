import {Factura} from '../facturas/models/factura'

export class Cliente {
  id: any;
  nombre: any;
  apellido: any;
  createAt:any;
  email: any;
  facturas: Array<Factura> = [];

}
