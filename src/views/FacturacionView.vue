<template>
    <div>
        <nav class="navbar navbar-expand-lg text-bg-success p-3">
            <div class="container-fluid">
                <div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" href="#">PRODUCTOS</a>
                    <a class="nav-link active" href="#">VENTAS</a>
                    <a class="nav-link active" href="/detalleCompras">COMPRAS</a>
                    <a class="nav-link active" href="#">CLIENTES</a>
                    <a class="nav-link active" href="#">PROVEEDORES</a>
                    <a class="nav-link active" href="/">HOME</a>
                </div>
            </div>
            <form class="container-fluid justify-content-start">
                <button class="btn btn-light" @click="authToken" type="button">Salir</button>
            </form>
            <h3>PAPELERIA FENIX</h3>
        </nav>
        <hr />
        <div class="d-grid gap-3" style="grid-template-columns: 1fr 2fr;">
            <div>
                <h1>Facturación</h1>
            </div>
            <div v-show="mensajeError" class="alert alert-warning col-8" role="alert">
                <h6 class="alert-heading">Error, {{ mensajeError }}</h6>
            </div>
        </div>
        <hr />
        <div class="container-fluid pb-3">
            <div class="d-grid gap-3" style="grid-template-columns: 1fr 2fr;">
                <div class="bg-light">
                    <div class="input-group mb-2">
                        <span class="input-group-text">Fecha venta: {{ horaVer() }}</span>
                    </div>
                    <div class="mb-2">
                        <button type="button" @click="this.$router.push('/')" class="btn btn-outline-success">Nuevo
                            cliente</button>
                    </div>
                    <div class="input-group mb-2">
                        <input type="text" placeholder="Codigo producto..." v-model="codigo_producto"
                            aria-label="code_product" class="form-control">
                        <button @click="agregarProducto(codigo_producto)" type="button"
                            class="btn btn-outline-success">Agregar producto</button>
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Nombre: </span>
                        <input type="text" :disabled="true" placeholder="Nombre Producto..." v-model="nombre_producto"
                            aria-label="name" class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Cantidad vendida: </span>
                        <input type="text" :disabled="inDatosDisable2" placeholder="Cantidad vendida..."
                            v-model="cantidad_vendida" aria-label="quantity" class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Valor item: </span>
                        <input type="text" :disabled="inDatosDisable" placeholder="Valor venta item"
                            v-model="valor_venitem" aria-label="value_item" class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <button type="button" @click="confirmarProducto" :disabled="inDatosDisable2"
                            class="btn btn-outline-warning">Confirmar producto</button>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" :disabled="inDatosDisable2"
                            placeholder="Identificación del cliente" aria-label="client_dato" v-model="numero_cliente">
                        <button class="btn btn-outline-success" :disabled="false" type="button"
                            @click="verLista">Agregar Cliente</button>
                    </div>
                </div>
                <div class="container">
                    <h2>{{ infoTabla }}</h2>
                    <table class="table" id="tabla">
                    </table>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Total Ventas: </span>
                        <input v-model="total_vendido" placeholder="..." class="form-control"
                            aria-label="Sizing example input">
                    </div>
                    <div v-show="verDel">
                        <div class="input-group mb-2">
                            <input type="text" placeholder="numero item a eliminar" v-model="item_aEliminar"
                                aria-label="itemDelete" class="form-control-sm">
                            <button class="btn btn-danger btn-sm" type="button" @click="eliminarItem">Eliminar
                                item</button>
                            <button class="btn btn-success btn-sm" type="button" @click="finalizarVenta">Finalizar
                                Venta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <span class="placeholder col-12 bg-success"></span>
    </div>
</template>

<script>
export default ({
    props: {
    },
    data() {
        return {
            infoTabla: 'Facturas',
            usuario_Venta: 123,
            numero_cliente: 360,
            lista_detalles: [],
            ficha_detalle: { cantidad_vendida: 0, subtotal_item: 0.0, factura: { numero_factura: 0 }, producto: { codigo_producto: 0 } },
            ficha_factura: { fecha_venta: '', subtotal_venta: 0, total_venta: 0, valor_iva: 0, cliente: { id_cliente: 0 }, usuario: { id_usuarios: 0 } },
            lista_productos: [],
            inDatosDisable: true,
            inDatosDisable2: true,
            inDatosDisable3: true,
            itemStock: 0,
            enliste_ventas: [],
            mensajeError: '',
            temp_data: {},
            codigo_producto: '',
            nombre_producto: '',
            valor_venitem: '',
            cantidad_vendida: '',
            verDel: "",
            total_vendido: 0,
            id_lista: 1,
            item_aEliminar: '',
            item: 0,
            num_factura: 0,
            urly: 'http://localhost:8080'

        }
    },
    methods: {
        horaVer() {
            let hora = new Date(); //.toJSON().slice(0, 19)
            return hora.toLocaleTimeString();
        },
        finalizarVenta() {
            this.realizarFactura();            
            setTimeout(() => this.actualizarInventario(), 500);
            this.consultarFacturas();
        },
        authToken() {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user && user.access) {
                return "Bearer " + user.access;
            } else {
                return {};
            }
        },
        eliminarItem() {
            if (this.item_aEliminar == '') {
                this.mensajeError = 'Digite el numero del Item'
            }
            else {
                this.item = parseInt(this.item_aEliminar);
                this.item = this.item - 1;

                this.enliste_ventas.splice(this.item, 1);
                this.lista_productos.splice(this.item, 1);
                this.lista_detalles.splice(this.item, 1);
            }
            this.entablarDetalles(this.enliste_ventas);
            this.item_aEliminar = '';

        },
        listarListas() {
            this.lista_productos.push(this.temp_data);
            this.lista_detalles.push(this.ficha_detalle);
        },
        entablarDetalles(renglon_data) {
            let listado = "<tr><th>Num. Item</th><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr>";
            this.total_vendido = 0;
            renglon_data.forEach(element => {
                listado += '<tr><td>' + this.id_lista + '</td><td>' + element.nombre + '</td><td>' + element.precio + '</td><td>' + element.cantidad + '</td><td>' + element.subtotal + '</td>';
                listado += '</tr>';
                this.total_vendido = parseFloat(this.total_vendido + element.subtotal);
                this.id_lista++;
            });
            document.getElementById("tabla").innerHTML = listado;
            this.verDel = "Opciones";
            this.id_lista = 1;
        },
        confirmarProducto() {
            if (this.cantidad_vendida > 0) {
                if (this.itemStock < parseInt(this.cantidad_vendida)) {
                    this.cantidad_vendida = this.itemStock;
                }
                var subtotal = parseFloat(this.cantidad_vendida) * this.temp_data.costo_unitario;

                this.enliste_ventas.push({
                    'nombre': this.temp_data.nombre_producto,
                    'precio': this.temp_data.costo_unitario,
                    'cantidad': parseInt(this.cantidad_vendida),
                    'subtotal': subtotal,
                });
                this.ficha_detalle = { cantidad_vendida: parseInt(this.cantidad_vendida), subtotal_item: subtotal, factura: { numero_factura: 0 }, producto: { codigo_producto: this.temp_data.codigo_producto } };
                this.inDatosDisable3 = false;
                this.entablarDetalles(this.enliste_ventas);
                this.nombre_producto = '';
                this.valor_venitem = '';
                this.cantidad_vendida = '';
                this.codigo_producto = '';
                this.inDatosDisable2 = true;
                this.infoTabla = 'Detalles Venta';
                this.listarListas();
                this.mensajeError = '';
            } else { this.mensajeError = "cantidad vendida no esta definida" }
        },
        realizarFactura() {
            let horaf = this.horaVer;
            this.ficha_factura = {
                fecha_venta: horaf,
                subtotal_venta: this.total_vendido - (this.total_vendido * 19 / 100),
                total_venta: this.total_vendido,
                valor_iva: (this.total_vendido * 19 / 100),
                cliente: { id_cliente: this.numero_cliente },
                usuario: { id_usuarios: this.usuario_Venta }
            };
            const options = {
                method: 'POST',
                body: JSON.stringify(this.ficha_factura),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.authToken()
                }
            };
            fetch(this.urly + '/api/factura', options)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        this.mensajeError = error.message;
                        throw error;
                    } else {
                        const data = await response.json();                        
                        this.codigo_producto = data.numero_factura;
                    }
                });
        },
        actualizarInventario() {
            let id_P;
            for (let i = 0; i < this.lista_detalles.length; i++) {
                this.lista_detalles[i].factura.numero_factura = parseInt(this.codigo_producto);
                this.lista_productos[i].cantidad_stock -= parseInt(this.lista_detalles[i].cantidad_vendida);
                window.alert(this.lista_detalles[i].factura.numero_factura);
            }
            for (let j = 0; j < this.lista_detalles.length; j++) {
                id_P = this.lista_productos[j].codigo_producto;
                const options = {
                    method: 'POST',
                    body: JSON.stringify(this.lista_detalles[j]),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.authToken()
                    }
                };
                window.alert(this.lista_detalles[0].factura.numero_factura);
                fetch(this.urly + '/api/detalle_ventas', options)
                    .then(async (response) => {
                        if (!response.ok) {
                            const error = new Error(response.statusText);
                            error.json = response.json();
                            this.mensajeError = error.message;
                            throw error;
                        } else {
                            const data = await response.json();
                            console.log(data);
                        }
                    });
                const requestOptions = {
                    method: 'PUT',
                    body: JSON.stringify(this.lista_productos[j]),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.authToken()
                    }
                }

                fetch(this.urly + '/api/productos/' + id_P, requestOptions)
                    .then(async response => {
                        if (!response.ok) {
                            const error = new Error(response.statusText);
                            error.json = response.json();
                            this.mensajeError = error.message;
                            throw error;
                        } else {
                            const data = await response.json();
                            console.log(data);
                        }
                    })
                    .catch(error => console.log(error))
            }
        },
        async agregarProducto(codPro) {
            if (codPro != '') {
                const options = {
                    method: 'GET',
                    //body: JSON.stringify({ id: 1 }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.authToken()
                    }
                };
                fetch(this.urly + '/api/productos/' + codPro, options)
                    .then(async (response) => {
                        if (!response.ok) {
                            const error = new Error(response.statusText);
                            error.json = response.json();
                            this.mensajeError = error.message;
                            this.mensajeError = "No existe el producto con ese codigo";
                            throw error;
                        } else {
                            const data = await response.json();
                            this.mensajeError = "";
                            this.temp_data = data;
                            this.inDatosDisable2 = false;
                            this.nombre_producto = data.nombre_producto;
                            this.valor_venitem = data.costo_unitario;
                            this.itemStock = data.cantidad_stock;
                            this.cantidad_vendida = '';
                        }
                    });
            }
        },
        async consultarFacturas() {
            const options = {
                method: 'GET',
                //body: JSON.stringify({ id: 1 }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.authToken()
                }
            };
            fetch(this.urly + '/api/factura', options)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        this.mensajeError = error.message;
                        throw error;
                    } else {
                        const data = await response.json();
                        let codigo = "<tr><th>N° Factura</th><th>Cliente</th><th>Total</th><th>Iva</th><th>Fecha</th></tr>"
                        data.forEach(element => {
                            codigo += '<tr><td>' + element.numero_factura + '</td><td>' + element.cliente.nombre_cliente + '</td><td>' + element.total_venta + '</td><td>' + element.valor_iva + '</td><td>' + element.fecha_venta + '</td>'
                            codigo += '</tr>';
                            this.total_vendido = parseFloat(this.total_vendido + element.total_venta);
                        });
                        document.getElementById("tabla").innerHTML = codigo

                    }
                });
        },
    },
    mounted() {
        this.consultarFacturas();
    }
})
</script>