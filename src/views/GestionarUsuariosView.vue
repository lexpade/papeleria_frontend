<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" href="#">PRODUCTOS</a>
                    <a class="nav-link" href="#">VENTAS</a>
                    <a class="nav-link" href="#">COMPRAS</a>
                    <a class="nav-link disabled">Disabled</a>
                </div>
            </div>
            <form class="container-fluid justify-content-start">
                <button class="btn btn-sm btn-outline-secondary" type="button">Salir</button>
                <button class="btn btn-sm btn-outline-secondary" type="button">Usuario activo</button>
            </form>
            <h3>Papeleria</h3>
        </nav>
        <hr />
        <div>
            <h1>Gestión de Usuarios</h1>
        </div>
        <hr />
        <div class="container-fluid pb-3">
            <div class="d-grid gap-3" style="grid-template-columns: 1fr 2fr;">
                <div class="bg-light border rounded-3">
                    <div class="input-group mb-2">
                        <span class="input-group-text">ID: </span>
                        <input type="text" placeholder="Identificación..." v-model="id_usuario" aria-label="id_user"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Nombre: </span>
                        <input type="text" placeholder="Digite el nombre..." v-model="nombre" aria-label="First name"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Apellido: </span>
                        <input type="text" placeholder="Digite el apellido..." v-model="apellido" aria-label="Last name"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Correo: </span>
                        <input type="text" placeholder="Correo electronico..." v-model="correo" aria-label="email"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Tipo usuario: </span>
                        <input type="text" placeholder="Tipo usuario..." v-model="tipo" aria-label="role"
                            class="form-control">
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic outlined example" style="margin-top:12px">
                        <button @click="crear" :disabled="botonCrearDeshabilitado" type="button"
                            class="btn btn-outline-primary">Crear</button>
                        <button @click="actualizar" :disabled="botonActualizarDeshabilitado" type="button"
                            class="btn btn-outline-primary">Actualizar</button>
                        <button @click="eliminar" :disabled="botonActualizarDeshabilitado" type="button"
                            class="btn btn-outline-danger">Eliminar</button>
                    </div>
                </div>
                <div class="bg-light border rounded-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Consultar: </span>
                        <input v-model="prefijo" placeholder="Digite el texto..." class="form-control"
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
    
                    <select size="6" v-model="seleccionado" class="form-select" aria-label="multiple select example">
                        <option v-for="nombreCompleto in nombresFiltrados" :key="nombreCompleto" @click="actualizando=true">
                            {{ nombreCompleto }}</option>
                    </select>
                </div>
            </div>
        </div>
        <hr class="col-12" />
    </div>
</template>