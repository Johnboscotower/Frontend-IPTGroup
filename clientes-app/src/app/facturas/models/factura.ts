import {ItemFactura} from './item-factura'
import {Cliente} from '../../clientes/cliente'

export class Factura {
  id: any;
  descripcion: any;
  observacion: any;
  items: Array<ItemFactura>=[];
  cliente!: Cliente;
  total:any;
  createAt: any;

}
