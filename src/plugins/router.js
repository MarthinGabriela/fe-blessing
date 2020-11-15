import Vue from 'vue'
import VueRouter from 'vue-router'
import {Home, Stok, Transaksi, FormBarang, About, FormInvoice} from '../views/'

Vue.use(VueRouter)

const initialRoute = '/form-invoice'

const route = (path, name, component, redirect) => ({
  path: path,
  name: name,
  redirect: redirect,
  component: component
})

const routes = [
    route('/', 'initial', null, initialRoute),
    route('/home', 'Home', Home),
    route('/stok', 'Stok', Stok),
    route('/transaksi', 'Transaksi', Transaksi),
    route('/form-barang', 'FormBarang', FormBarang),
    route('/about', 'About', About),
    route('/form-invoice', 'FormInvoice', FormInvoice),
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
