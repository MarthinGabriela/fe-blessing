import Vue from 'vue'
import VueRouter from 'vue-router'
import {Home, Stok, Transaksi, FormBarang, About} from '../views/'

Vue.use(VueRouter)

const route = (path, name, component) => ({
  path: path,
  name: name,
  component: component
})

const routes = [
  route('/home', 'Home', Home),
  route('/stok', 'Stok', Stok),
  route('/transaksi', 'Transaksi', Transaksi),
  route('/form-barang', 'FormBarang', FormBarang),
  route('/about', 'About', About)
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
