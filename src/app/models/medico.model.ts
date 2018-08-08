import {UsuarioModel} from './usuario.model';
import {Hospital} from './hospital.model';

export class Medico {

    constructor(
        public nombre?: string,
        public img?: string,
        public usuario?: UsuarioModel,
        public hospital?: Hospital,
        public _id?: string
    ) { }
}
