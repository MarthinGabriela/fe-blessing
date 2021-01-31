<template>
  <div>
    <b-navbar v-if="!hideNavBar" class="navbar">
      <h1
        style="
          margin: 0;
          font-weight: bold;
          padding-left: 0px;
          padding-right: 40px;
          padding-top: 10px;
          padding-bottom: 10px;

          color: white;
        "
      >
        {{ $appName }}
      </h1>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="(menu, index) in menus"
            :active="active === menu.route"
            :key="menu + index"
            :style="{ fontWeight: 'bold' }"
            :to="menu.route"
            >{{ menu.caption }}</b-nav-item>
        </b-navbar-nav>

        <b-button
                class="ml-auto"
                variant="none"
                @click="logout"
        >Logout</b-button>
      </b-collapse>
    </b-navbar>

    <slot></slot>
  </div>
</template>

<script>
  import { Store } from '../store';

  export default {
    props: {
      active: String,
      hideNavBar: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        menus: [
          { caption: "Home", route: "home" },
          { caption: "Stok", route: "stok" },
          // { caption: "Transaksi", route: "transaksi" },
        ],
      };
    },
    methods: {
      logout() {
        Store.commit('logout');
        this.$router.push('loginPage');
      }
    }
  };
</script>

<style scoped>
.navbar {
  padding-top: 10px;

  background-color: white;
  background: url(../assets/17545.jpg) no-repeat center center fixed;
  background-size: cover;
  background-position: center;
}
</style>