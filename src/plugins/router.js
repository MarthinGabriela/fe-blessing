import Vue from 'vue'
import VueRouter from 'vue-router'
import {DaftarInvoice, Stok, DaftarTransaksi, FormBarang,
    FormInvoice, loginPage, Pembeli, FormPembeli} from '../screen/';
import {Store} from "../store";

Vue.use(VueRouter)

const route = (path, name, component, otherOptions) => ({
    path: path,
    name: name,
    component: component,
    ...(otherOptions ? otherOptions : {})
})

const initial = 'Home'

const routes = [
    route('/', 'initial', null, {redirect: initial}),
    route('/home', 'Home', DaftarInvoice),
    route('/stok', 'Stok', Stok),
    route('/transaksi', 'Transaksi', DaftarTransaksi),
    route('/form-barang', 'FormBarang', FormBarang),
    route('/pembeli', 'Pembeli', Pembeli),
    route(
        '/form-invoice/',
        'FormInvoice',
        FormInvoice,
        {
            props: route => ({
                viewMode: route.query.vmd,
                idInvoice: route.query.id,
            })
        }
        ),
    route(
        '/form-pembeli/',
        'FormPembeli',
        FormPembeli,
        {
            props: route => ({
                viewMode: route.query.vmd,
                idPembeli: route.query.id,
            })
        }
        ),
    route('/loginPage', 'loginPage', loginPage)
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (!Store.getters.isAuthenticated && to.name !== 'loginPage') {
        // return next();
        console.log('please login!!');
        next({ name: 'loginPage' });
    }
    else {
        next();
    }
})

export default router
