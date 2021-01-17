<template>
  <div>
    <b-overlay :show="loading" rounded="sm">
      <div class="jumbotron text-center" style="height: 100vh; margin: 0">
        \
        <div style="margin-top: 200px">
          <h1>Sistem Database TB Blessing</h1>

          <p :style="{ fontSize: '20px' }">Masukkan Token Anda di bawah ini</p>

          <div
            class="input-group input-group-mb-3"
            :style="{ width: '75%', margin: 'auto' }"
          >
            <input
              v-model="token"
              type="text"
              class="form-control"
              size="50"
              placeholder="Token"
              name="password"
              required
            />

            <div class="input-group-btn">
              <button type="submit" class="btn btn-danger" @click="login">
                Masuk
              </button>
            </div>
          </div>

          <br />

          <div
            v-if="errorMessage"
            :style="{ color: 'black', fontWeight: 'bold' }"
          >
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { Authentication } from "../helpers/servicesAPI";
import { Store } from "../store";

export default {
  data: () => ({
    token: "",
    errorMessage: "",
    loading: false,
  }),
  methods: {
    login() {
      if (!this.token) {
        this.errorMessage = "Harap MASUKKAN token";
        return;
      }
      this.loading = true;
      Authentication.login(this.token)
        .then((response) => {
          this.loading = false;
          Store.commit("setToken", response.token);
          this.$router.push({ name: "Home" });
        })
        .catch((e) => {
          this.loading = false;
          console.log("error = ", e);
          this.errorMessage = "Token yang dimasukkan SALAH !";
        });
    },
  },
};
</script>


<style scoped>
body {
  margin: 0;
}

.jumbotron {
  margin: 0;
  background: url(../assets/17545.jpg) no-repeat center center fixed;
  background-size: cover;
  background-position: center;
}

h1 {
  font-weight: bold;
  font-size: 50px;
  color: black;
}
</style>