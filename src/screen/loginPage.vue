<template>
  <body>
    <div class="jumbotron text-center" style="height: 100vh; margin: 0">
      <div style="margin-top: 200px">
        <h1>Sistem Database TB Blessing</h1>
        <p style="font-size: 20px">Masukkan Token Anda di bawah ini</p>
        <form method="POST" class="form">
          <div
            class="input-group input-group-mb-3"
            style="width: 75%; margin: auto"
          >
            <input type="hidden" th:value="toper" name="username" />
            <input
              type="text"
              class="form-control"
              size="50"
              placeholder="Token"
              name="password"
              required
            />
            <div class="input-group-btn">
              <button type="submit" class="btn btn-danger">Masuk</button>
            </div>
          </div>
        </form>
        <br />
        <div th:if="${param.error}">
          <span style="color: black">
            <p style="font-weight: bold">Token Anda tidak valid</p>
          </span>
        </div>
      </div>
    </div>
  </body>
</template>

// <script>
// import { AppScreen } from "../components";
// export default {
//   components: { AppScreen },
// };
//
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