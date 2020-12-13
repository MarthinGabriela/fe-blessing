import Vue from 'vue'
import VueRouter from 'vue-router'
import {DaftarInvoice, Stok, DaftarTransaksi, FormBarang, About, FormInvoice, loginPage} from '../screen/'

Vue.use(VueRouter)

const initialRoute = '/loginPage'

const route = (path, name, component, redirect) => ({
  path: path,
  name: name,
  redirect: redirect,
  component: component
})

const routes = [
    route('/', 'initial', null, initialRoute),
    route('/home', 'Home', DaftarInvoice),
    route('/stok', 'Stok', Stok),
    route('/transaksi', 'Transaksi', DaftarTransaksi),
    route('/form-barang', 'FormBarang', FormBarang),
    route('/about', 'About', About),
    route('/form-invoice', 'FormInvoice', FormInvoice),
    route('/loginPage', 'loginPage', loginPage)
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
