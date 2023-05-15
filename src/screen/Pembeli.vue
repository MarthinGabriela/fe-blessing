<template>
  <div style="max-width: 100%">
    <b-overlay :show="uploading">
      <div
        :style="{
          backgroundImage: 'url(' + tabImage + ')',
          backgroundSize: '80% 250%',
          backgroundRepeat: 'no-repeat',
          padding: '15px',
        }"
      >
        <h1 style="color: white">{{ $appName }}</h1>
      </div>

      <b-container class="p-20">
        <table class="table table-borderless">
          <tr>
            <td>Nama Toko:</td>
            <td>
              <b-form-input
                id="namaPembeli"
                :style="{ textAlign: 'left' }"
                size="md"
                type="text"
                v-model="namaPembeli"
                :plaintext="isViewMode"
                :readonly="isViewMode"
              />
            </td>
          </tr>
          <tr>
            <td>Alamat Toko:</td>
            <td>
              <b-form-input
              id="alamatToko"
              :style="{ textAlign: 'left' }"
              size="md"
              type="text"
              v-model="alamat"
              :plaintext="isViewMode"
              :readonly="isViewMode"
            />
            </td>
          </tr>
        </table>
      </b-container>
          
      <div
        class="d-flex justify-content-center"
        :style="{ padding: '0 30px 30px 30px' }"
      >
        <b-button class="tombol btn btn-danger" @click="batal">{{
          isViewMode ? "Keluar" : "Batal"
        }}</b-button>
        <b-button class="tombol btn btn-success" @click="actionFn">{{
          actionCaption
        }}</b-button>
      </div>
    </b-overlay>
  </div>
</template>

<script>
// import { ItemListForm } from "../components";
// import { Store } from "../store";
import { PembeliService } from "../helpers/servicesAPI";
import 'select2';
import $ from 'jquery';

const tabImage = require("../assets/17545.jpg");

export default {
  // components: { ItemListForm },
  props: {
    idPembeli: [Number, String],
    viewMode: {
      type: String,
    },
  },
  data: () => ({
    tabImage: tabImage,
    uploading: false,

    namaPembeli: "",
    alamat: "",

    invoiceItems: [],
    returItems: [],
    items: [],
    errorMessage: "",
    optionsPembeli: [],
    isViewMode: false,
    // idPembeli: null
  }),
  computed: {
    actionCaption() {
      switch (this.viewMode) {
        case "EDIT":
          return "Update Pembeli";
        case "CREATE":
          return "Tambah Pembeli";
        default:
          return "UNKNOWN";
      }
    },
  },
  methods: {
    validatePembeli() {
      return !!this.namaPembeli && !!this.alamat;
    },
    tambahPembeli() {
      PembeliService.tambahPembeli({
        namaPembeli: this.namaPembeli,
        alamat: this.alamat
      })
        .then((response) => {
          if(response.message.includes("sudah ada")) {
            alert(response.message)
          } else {
            this.$router.back();
          }
        })
        .catch(() => {
          // alert(e.message)
          // this.errorMessage = "Terjadi kesalahan saat menambah pembeli";
          this.$bvModal.show("error-modal");
        });
    },
    updatePembeli() {
      PembeliService.editPembeli(this.idPembeli, {
        namaPembeli: this.namaPembeli,
        alamat: this.alamat
      })
        .then(() => {
          this.$router.back();
        })
        .catch(() => {
          alert("Gagal Mengubah Data Pembeli");
        });
    },
    actionFn() {
      switch (this.viewMode) {
        case "EDIT": {
          this.updatePembeli();
          break;
        }
        case "CREATE": {
          this.tambahPembeli();
          break;
        }
      }
    },
    batal() {
      this.$router.back();
    },
    viewPembeli() {
      console.log("id = " + this.idPembeli);
      PembeliService.viewPembeli(this.idPembeli)
        .then((response) => {
          console.log("response = " + response.namaPembeli);
          // if (response && response.status === 200) {
            // const data = response.result;

            this.namaPembeli = response.namaPembeli;
            this.alamat = response.alamat;
          // }
        })
        .catch(() => {
          // console.log(e.message);
          this.errorMessage = "Data pembeli tidak ditemukan";
          this.$bvModal.show("error-modal");
        })
        .finally(() => {
          this.uploading = false;
        });
    },
    getListPembeli() {
      PembeliService.tampilkanPembeli()
          .then(response => {
            const data = response.data;
            data.forEach((x) => {
              this.optionsPembeli.push({
                value: x.id,
                text: x.namaPembeli,
              });
            })
          })
          .catch(() => {
            this.optionsPembeli = [];
          })
      return this.optionsPembeli;
    }
  },
  created() {
    // if (this.idInvoice && this.viewMode !== "CREATE") {
    //   this.viewPembeli();
    // }

    // if (this.viewMode !== "VIEW") {
    //   const storedList = Store.getters.listBarang;
    //   if (storedList && storedList.length > 0) {
    //     this.items = storedList;
    //   }

    //   this.requestBarang();
    // }
    if(this.viewMode === "EDIT") 
      this.viewPembeli()
  },
  mounted() {
    // this.getListPembeli(false)
    const self = this;
    if(!this.isViewMode) {
      $('#namaToko').select2({
        placeholder: 'Pilih Toko',
        width: '100%',
        data: this.optionsPembeli
      })
      $('#namaToko').on('change', function() {
        this.idPembeli = $('#namaToko').val();
        self.getAlamat(this.idPembeli);
      })
    }
  }
};
</script>

<style scoped>
#merk {
  display: none;
}
#content-area {
  padding: 30px;
}
.basicInformation {
  margin: 10px 0;
}
.inlineKeyVal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
}
.text-tombol {
  font-weight: bolder;
  font-size: 18px;
  color: deepskyblue;
}
.text-retur {
  font-weight: bolder;
  font-size: 18px;
  color: darkblue;
}
.tombol {
  min-width: 120px;
  margin: 0 15px;
}
.separator {
  margin-top: 5px;
  width: 100%;
  height: 1px;
  background-color: black;
}

p {
  font-size: 25px;
}
</style>