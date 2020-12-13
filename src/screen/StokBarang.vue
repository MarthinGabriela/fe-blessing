<template>
  <app-screen active="stok">
    <b-modal hide-footer hide-header centered id="update-modal">
      <div style="padding: 20px; background-color: white">
        <div class="container-fluid">
          <p>
            <strong>Edit {{ stockOrPrice }}</strong>
          </p>
          <form class="form-inline justify-content-between" role="form">
            <label class="mb-2 mr-sm-2">{{ stockOrPrice }} :</label>
            <input
              type="text"
              class="form-control mb-2 mr-sm-2"
              :placeholder="'Edit ' + stockOrPrice"
            />
          </form>
          <button
            type="button"
            class="btn btn-secondary modalBtn"
            @click="
              () => {
                $bvModal.hide('update-modal');
              }
            "
            style="margin-left: 10px"
          >
            Batal
          </button>
          <button type="button" class="btn btn-primary modalBtn">Ubah</button>
        </div>
      </div>
    </b-modal>

    <div class="container-fluid">
      <div class="d-flex" style="margin: 10px 0; height: 40px">
        <button
          style="position: absolute; right: 15px"
          class="btn btn-primary ml-auto"
          @click="goToFormBarang"
        >
          Tambah Barang
        </button>
      </div>

      <form>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search" />
          <div class="input-group-btn">
            <button
              class="btn btn-default ml-3"
              type="button"
              style="border-color: silver; font-weight: bold ;"
            >
              Cari
            </button>
          </div>
        </div>
      </form>

      <br />

      <b-table bordered responsive="sm" :fields="barangField" :items="barang">
        <template #cell(stok)="data">
          <div class="d-flex justify-content-between">
            <div style="margin-right: 10px">{{ data.value }}</div>
            <div class="input-group-btn">
              <button
                class="btn btn-default btn-sm editBtn btn-danger"
                type="button"
                @click="
                  () => {
                    showModal(0, data.index);
                  }
                "
              >
                Edit
              </button>
            </div>
          </div>
        </template>

        <template #cell(harga)="data">
          <div class="d-flex justify-content-between">
            <div style="margin-right: 10px">{{ data.value }}</div>
            <div class="input-group-btn">
              <button
                class="btn btn-default btn-sm editBtn btn-danger"
                type="button"
                @click="
                  () => {
                    showModal(1, data.index);
                  }
                "
              >
                Edit
              </button>
            </div>
          </div>
        </template>
      </b-table>
    </div>
  </app-screen>
</template>

<script>
import { AppScreen } from "../components";

export default {
  name: "Stok",
  components: { AppScreen },
  data: () => ({
    updateType: 0,
    selectedIndex: null,
    barangField: [
      { key: "name", label: "Nama Barang" },
      { key: "stok", label: "Stok" },
      { key: "harga", label: "Harga" },
    ],
    barang: [
      { id: 1, name: "Baut yang panjang pokoknya", stok: 100, harga: 1500000 },
      { id: 1, name: "Baut yang panjang pokoknya", stok: 100, harga: 1500000 },
      { id: 1, name: "Baut yang panjang pokoknya", stok: 100, harga: 1500000 },
    ],
  }),
  computed: {
    stockOrPrice() {
      return this.updateType ? "Harga" : "Stok";
    },
  },
  methods: {
    showModal(type, selectedIndex) {
      this.selectedIndex = selectedIndex;
      this.updateType = type;
      this.$bvModal.show("update-modal");
    },
    goToFormBarang() {
      this.$router.push({ name: "FormBarang" });
    },
  },
};
</script>

<style>
.editBtn {
  border-color: silver;
}
.modalBtn {
  float: right;
  border-radius: 5px;
}
</style>