import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {UsuarioService} from '../services/service.index';
import {UsuarioModel} from '../models/usuario.model';
import {Router} from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;

  forma: FormGroup;

  constructor(public us: UsuarioService, public router: Router) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo:new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null),
      condiciones: new FormControl(false)
    }, {validators: this.equalPasswords('password', 'password2')} );

    this.forma.setValue({
      nombre: 'test',
      correo: 'test@test.com',
      password: '123',
      password2: '123',
      condiciones: true
    });
  }

  equalPasswords(c1: string, c2: string) {

    return (group: FormGroup) => {

      let pass1 = group.controls[c1].value;
      let pass2 = group.controls[c2].value;

      if (pass1 == pass2)
        return null;

      return {
        sonIguales: true
      }
    }
  }

  showPopPassword():boolean {

    if (!this.forma.errors)
      return false;

    return this.forma.errors.sonIguales &&
      !this.forma.controls.password.pristine &&
      !this.forma.controls.password2.pristine &&
      this.forma.controls.password.value != null &&
      this.forma.controls.password2.value != null;
  }

  register() {

    if (this.forma.invalid)
      return;

    if (!this.forma.value.condiciones) {

      this.deleteSwal.show();
      return;
    }

    const user = new UsuarioModel(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this.us.createUser(user).subscribe( resp =>{
      this.router.navigate(['/login']);
    },error => {

    });
  }

}
