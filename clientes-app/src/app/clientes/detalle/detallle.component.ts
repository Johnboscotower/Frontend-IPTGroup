import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import {FacturaService} from '../../facturas/services/factura.service';
import {Factura} from '../../facturas/models/factura';
import Swal from 'sweetalert2'

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente!: Cliente;

  titulo: string = "Detalle del cliente";

  constructor(private clienteService: ClienteService,
    private facturaService: FacturaService,
    private activatedRoute: ActivatedRoute) { }

    delete(factura:Factura): void {
      {
        const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Seguro lo deseas eliminar la factura ${factura.descripcion}}!?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminarlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.facturaService.delete(factura.id).subscribe(
          response => {
            this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura)
            swalWithBootstrapButtons.fire(
              'Factura Eliminado',
              `Factura ${factura.descripcion} eliminada con exito `,
              'success'
            )

          }

        )

      }
    })

      }
    }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id : any = params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        })
      }
    }
  );
  }
}
