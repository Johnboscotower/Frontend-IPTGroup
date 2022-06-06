import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente'
import {ClienteService} from './cliente.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] | undefined;

  constructor(private ClienteService: ClienteService) { }

  ngOnInit(): void {
    this.ClienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: 'Estas seguro?',
  text: `Seguro lo deseas eliminar ${cliente.nombre} ${cliente.apellido}!?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Si, deseo eliminarlo!',
  cancelButtonText: 'No, cancelar!',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {

    this.ClienteService.delete(cliente.id).subscribe(
      response => {
        this.clientes = this.clientes!.filter(cli => cli !== cliente)
        swalWithBootstrapButtons.fire(
          'Cliente Eliminado',
          `Cliente ${cliente.nombre} eliminado con exito `,
          'success'
        )

      }

    )

  }
})

  }

}
