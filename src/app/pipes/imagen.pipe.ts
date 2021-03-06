import { Pipe, PipeTransform } from '@angular/core';
import {URL_SERVICES} from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {


    let url = URL_SERVICES + '/imagenes';

    if (!img)
      return url + '/usuarios/xxx';

    if (img.startsWith('https://'))
      return img;

    switch (tipo) {

      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'hospital':
        url += '/hospitales/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      default:  console.log('no existe el tipo ' , tipo);
                url += '/usuarios/xxx';
      break;
    }
    return url;
  }

}
