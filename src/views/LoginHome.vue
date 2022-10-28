<template>
  <div>
    <div v-if="token == 'pendiente'" class="alert alert-warning col-12" role="alert">
      Token desde el API Spring Boot: {{ token }}
    </div>
    <div v-else class="alert alert-success col-12" role="alert">
      <h6 class="alert-heading">Genial!</h6>
      <p>Token recibido exitosamente desde el API Spring Boot.</p>
    </div>
    <div v-show="mensajeError" class="alert alert-danger col-12" role="alert">
      <h6 class="alert-heading">Error</h6>
      <p>{{ mensajeError }}</p>
    </div>
    <div>
      <span class="placeholder col-12 bg-secondary"></span>

      <div class="bg-light">
        <h3>PAPELERIA FENIX</h3>
      </div>
      <hr />
      <div align="center">
        <h1>Ingreso Usuario</h1>
      </div>

      <span class="placeholder col-12 bg-secondary"></span>

      <div class="bg-light w-50 p-3 position-absolute start-50 translate-middle-x">
        <div class="form-floating mb-3">
          <input type="username" class="form-control" id="floatingInput" v-model="id_usuario"
            placeholder="numero de identidad">
          <label for="floatingInput">Numero de Identidad</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingPassword" v-model="contrasena"
            placeholder="Contraseña">
          <label for="floatingPassword">Contraseña</label>
        </div>
        <div class="d-grid gap-2">
          <button @click="ingresar" :disabled="botonEntrarDeshabilitado" type="button"
            class="btn btn-outline-primary btn-lg">Ingresar</button>
          <button @click="mostrarInfo" :disabled="botonmostrarInfoDeshabilitado" type="button"
            class="btn btn-outline-warning btn-lg">Datos de Acceso</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
div.bg-light {
  max-width: 500px
}
</style>

<script>
export default ({
  props: {
    directo: String
  },
  data() {
    return {
      contrasena: '',
      id_usuario: '',
      token: 'pendiente',
      mensajeError: '',
      urly:'http://localhost:8080'      
    }
  },
  methods: {
    borrar() {
      this.contrasena = this.id_usuario = '';
    },
    ingresar() {
      if (this.contrasena == "" || this.id_usuario == "")
        this.mensajeError = "Datos vacios, Por favor Intente de Nuevo";
      else {
        this.mensajeError = "";
        this.obtenerData(this.id_usuario);
        setTimeout(() => this.tokenValido(), 200);
      }
    },
    tokenValido() {
      if (this.token !== 'pendiente')
        this.verificarPassword(this.id_usuario);
      else this.mensajeError = "Usuario No Existe"
    },
    mostrarInfo() {
      window.alert("Ingreso es Identidad: 123 Clave:querty")
    },
    async verificarPassword(id) {
      const options = {
        method: 'GET',
        //body: JSON.stringify({ id: 1 }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      };
      fetch(this.urly + '/api/usuarios/' + id, options)
        .then(async (response) => {
          if (!response.ok) {
            const error = new Error(response.statusText);
            error.json = response.json();
            this.mensajeError = error.message;
            throw error;
          } else {
            const data = await response.json();
            if (data.contrasenia_usuario === this.contrasena) {
              this.$router.push('facturacion')
              //this.$router.push({ name: 'facturacion', params: { username: 'eduardo' } })
            } else
              this.mensajeError = "Contraseña O Usuario Incorrectos"
          }
        });
    },
    async obtenerData(id) {
      const options = {
        method: 'POST',
        body: JSON.stringify({ id_usuarios: id }),
        headers: {
          'Content-Type': 'application/json'
          /* , 'Authorization': 'Bearer '+this.token */
        }
      };
      fetch(this.urly + '/api/auth', options)
        .then(async (response) => {
          if (!response.ok) {
            const error = new Error(response.statusText);
            error.json = response.json();
            this.mensajeError = error.message;
            throw error;
          } else {
            const data = await response.json();
            this.token = data.access;
            localStorage.setItem('user', JSON.stringify(data)) //Guarda el token en el localStorage
          }
        });
    }
  },
  //mounted(){
  //this.obtenerData(123)}
})
</script>
