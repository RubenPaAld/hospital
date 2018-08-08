import {UsuarioService} from '../services/service.index';

export class Hospital {

    constructor (
        public nombre: string,
        public img?: string,
        public _id?: string,
        public usuario?: UsuarioService
    ) { }

}
