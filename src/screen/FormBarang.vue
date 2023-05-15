<template>
  <app-screen hide-nav-bar>
    <b-overlay :show="uploading">
      <div
        class="container"
        :style="{
          height: '100vh',
        }"
      >
        <div class="card">
          <div class="card-body">
            <h3 class="mb-4"><strong>Form Barang</strong></h3>
            <form>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Nama :</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control mb-2 mr-sm-2"
                    placeholder="Masukkan Nama"
                    name="nama"
                    v-model="nama"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Harga :</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control mb-2 mr-sm-2"
                    placeholder="Masukkan Harga"
                    name="harga"
                    v-model="harga"
                  />
                </div>
              </div>
              <div class="row form-group">
                <label class="col-sm-2 col-form-label">Stok/Satuan :</label>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Masukkan Stok"
                    name="stok"
                    v-model="stok"
                  />
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Satuan"
                    name="satuan"
                    v-model="satuan"
                  />
                </div>
              </div>
            </form>

            <button
              type="button"
              class="btn btn-success"
              style="border-radius: 5px; margin-top: 3px"
              @click="() => {
                  if(barangId === null) {
                    createItem();
                  } else {
                    editItem();
                  }
                }"
            >
              {{ barangId === null ? "Tambah" : "Update" }}
            </button>
            <button
              type="button"
              class="btn btn-danger ml-1"
              style="border-radius: 5px; margin-top: 3px"
              @click="goBack"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </b-overlay>
  </app-screen>
</template>

<script>
import { AppScreen } from "../components";
import { BarangService } from "../helpers/servicesAPI";

export default {
  name: "FormBarang",
  components: { AppScreen },
  data: () => ({
    uploading: false,
    nama: "",
    harga: 0,
    stok: 0,
    satuan: "",
    barangId: null,
  }),
  methods: {
    validate() {
      return (
        !!this.nama && !!(this.harga | 0) && !!(this.stok | 0) && !!this.satuan
      );
    },
    createItem() {
      if (this.validate()) {
        this.uploading = true;
        BarangService.buatBarang({
          namaBarang: this.nama,
          stockBarang: this.stok,
          hargaBeliBarang: this.harga,
          satuanBarang: this.satuan,
        })
          .then(() => {
            // console.log(response);
            this.goBack();
          })
          .catch(() => {
            this.uploading = false;
            alert("Gagal menambahkan item");
            // console.log(err);
          });
      } else {
        alert("Semua field harus diisi dengan benar");
      }
    },
    editItem() {
      if (this.validate()) {
        this.uploading = true;
        BarangService.updateBarang(this.barangId, {
          namaBarang: this.nama,
          stockBarang: this.stok,
          hargaBeliBarang: this.harga,
          satuanBarang: this.satuan,
        })
          .then(() => {
            // console.log(response);
            this.goBack();
          })
          .catch(() => {
            alert("Gagal mengupdate item");
            // console.log(err);
          })
          .finally(() => {
            this.uploading = false;
          });
      } else {
        alert("Semua field harus diisi dengan benar");
      }
    },
    requestBarang() {
      BarangService.lihatBarang(this.$route.query.id)
        .then((response) => {
          if (response && response.status === 200) {
            // console.log(response);
            const barang = response.result;
            this.nama = barang.namaBarang;
            this.stok = barang.stockBarang;
            this.harga = barang.hargaBeliBarang;
            this.satuan = barang.satuanBarang;
          }
        })
        .finally(() => {
          this.uploading = false;
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    if (this.$route.query.id !== undefined) {
      this.uploading = true;
      this.barangId = this.$route.query.id;
      this.requestBarang();
    }
  },
};
</script>

<style scoped>
.container {
  margin: 0;
  background: url(../assets/17545.jpg) no-repeat center center fixed;
  background-size: cover;
  background-position: center;
}

.card {
  margin-left: 8%;
}
</style>