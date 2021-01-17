<template>
  <router-view/>
</template>

<script>
  // import {Store} from "./store";
  // import {BarangService} from "./helpers/servicesAPI";

  export default {
    mounted() {
      // console.log("token = " + Store.getters.token)
      // BarangService.tampilkanItem()
      //         .then(response => {
      //           console.log(response);
      //         })
      //         .catch(err => {
      //           console.log(err);
      //         })
      // Store.commit('logout')
    }
  }
</script>
