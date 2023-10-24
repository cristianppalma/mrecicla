import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultadoBusqueda = [];
    for( const proveedor of value){
      if( proveedor.name_proveedor.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
      proveedor.name_proveedor.toUpperCase().indexOf(arg.toUpperCase()) > -1 ||
      proveedor.name_proveedor.indexOf(arg) > -1
      ){
        resultadoBusqueda.push(proveedor);
      }
    }
    return resultadoBusqueda;
  }

}
