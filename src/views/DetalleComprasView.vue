<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" href="#">PRODUCTOS</a>
                    <a class="nav-link" href="/facturacion">VENTAS</a>
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
            <h1>Detalles Compra</h1>
        </div>
        <hr />
        <div class="container-fluid pb-3">
            <div class="d-grid gap-3" style="grid-template-columns: 1fr 2fr;">
                <div class="bg-light">
                    <div class="input-group mb-2">
                        <span class="input-group-text">item_compra: </span>
                        <input type="text" :disabled="Deshabilitado" placeholder="item de compra Autogenerado" class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Codigo producto: </span>
                        <input type="text" placeholder="Codigo producto..." v-model="codigo_producto" aria-label="code_product"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Cantidad: </span>
                        <input type="text" placeholder="Cantidad Comprada..." v-model="cantidad" aria-label="quantity"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Valor item: </span>
                        <input type="text" placeholder="Valor compra item" v-model="valor_comitem" aria-label="value_item"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Id Proveedor: </span>
                        <input type="text" placeholder="Id proveedor..." v-model="id_proveedor" aria-label="id_provider"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Numero factura: </span>
                        <input type="text" placeholder="Factura Proveedor..." v-model="factura" aria-label="fact_provider"
                            class="form-control">
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic outlined example" style="margin-top:12px">
                        <button @click="crear" :disabled="botonCrearDeshabilitado" type="button"
                            class="btn btn-outline-primary">Agregar</button>
                            <button @click="eliminar" :disabled="botonActualizarDeshabilitado" type="button"
                            class="btn btn-outline-danger">Eliminar</button>
                        <button @click="terminar" :disabled="botonTerminarDeshabilitado" type="button"
                            class="btn btn-outline-success">Terminar</button>
                        
                    </div>
                </div>
                <div class="bg-light">                      
                    <select size="10" v-model="seleccionado" class="form-select" aria-label="multiple select example">
                        <option v-for="nombreCompleto in nombresFiltrados" :key="nombreCompleto" @click="actualizando=true">
                            {{ nombreCompleto }}</option>
                    </select>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Total Compra: </span>
                        <input v-model="prefijo" placeholder="..." class="form-control"
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
            </div>
        </div>
        <hr class="col-12" />
    </div>
</template>