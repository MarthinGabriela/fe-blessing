<template>
  <app-screen active="transaksi">
    <b-modal hide-footer hide-header centered id="bayar-modal">
      <div style="padding: 20px; background-color: white">
        <div class="container-fluid">
          <p>
            <strong>Nominal Pembayaran</strong>
          </p>
          <form class="form-inline justify-content-between" role="form">
            <label class="mb-2 mr-sm-2">Bayar</label>
            <input
              type="text"
              class="form-control mb-2 mr-sm-2"
              :placeholder="'Masukkan Nominal'"
            />
          </form>
          <button
            type="button"
            class="btn btn-danger modalBtn"
            @click="
              () => {
                $bvModal.hide('bayar-modal');
              }
            "
            style="margin-left: 10px; margin-top: 10px"
          >
            Batal
          </button>
          <button
            type="button"
            class="btn btn-success modalBtn"
            style="margin-top: 10px"
          >
            Ubah
          </button>
        </div>
      </div>
    </b-modal>
    <b-tabs id="app" fill justified card>
      <b-tab title="Pendapatan">
        <div style="margin-bottom: 10px">
          <div class="d-flex justify-content-around">
            <label>Tahun :</label>
            <div class="dropdown">
              <button
                type="button"
                class="btn btn-primary btn-sm dropdown-toggle"
                data-toggle="dropdown"
              >
                2020
              </button>
            </div>
            <label>Bulan :</label>
            <div class="dropdown">
              <button
                type="button"
                class="btn btn-primary btn-sm dropdown-toggle"
                data-toggle="dropdown"
              >
                Desember
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="p-3">Total Pemasukan :</div>
            <div class="p-3">Rp 0,00</div>
          </div>
        </div>

        <b-table
          bordered
          :items="pendapatan"
          :fields="pendapatanField"
        ></b-table>
      </b-tab>

      <b-tab title="Hutang">
        <div class="d-flex justify-content-between" style="margin-bottom: 30px">
          <div>Sisa Hutang :</div>
          <div>Rp 0,00</div>
        </div>

        <b-table bordered :responsive="'sm'" :items="hutang">
          <template #cell(hutang)="data">
            <div class="justify-content-between row table-row">
              <div>{{ data.value }}</div>
              <div class="input-group-btn">
                <button
                  class="btn btn-danger btn-sm"
                  type="button"
                  style="border-color: silver"
                  @click="
                    () => {
                      showModal();
                    }
                  "
                >
                  Edit
                </button>
              </div>
            </div>
          </template>
        </b-table>
      </b-tab>
    </b-tabs>
  </app-screen>
</template>

<script>
import { AppScreen } from "../components";

export default {
  name: "Home",
  components: {
    AppScreen,
  },
  data() {
    return {
      pendapatanField: [
        { label: "Tanggal", key: "tanggal" },
        { label: "Pemasukkan", key: "pemasukkan" },
      ],
      pendapatan: [{ tanggal: "22-04-2020", pemasukkan: 14000 }],
      hutangField: [
        { key: "nama", label: "Nama Pelanggan" },
        { key: "tanggal", label: "Tanggal" },
        { key: "hutang", label: "Hutang" },
      ],
      hutang: [{ nama: "Kevin", tanggal: "22-04-2020", hutang: 14000 }],
    };
  },
  methods: {
    showModal() {
      this.$bvModal.show("bayar-modal");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.table-row {
  padding: 0 10px;
}
</style>
