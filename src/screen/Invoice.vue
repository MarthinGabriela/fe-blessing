<template>
  <div style="max-width: 100%">
    <b-modal hide-footer hide-header centered id="item-modal">
      <div style="padding: 20px; background-color: white">
        <div class="container-fluid">
          <p>
            <strong>Tambah Barang</strong>
          </p>
          <form class="form-inline justify-content-between" role="form">
            <label class="mb-2 mr-sm-2">Nama</label>
            <input
              type="text"
              class="form-control mb-2 mr-sm-2"
              :placeholder="'Edit Nama'"
            />
          </form>

          <form class="form-inline justify-content-between" role="form">
            <label class="mb-2 mr-sm-2">Stock</label>
            <input
              type="text"
              class="form-control mb-2 mr-sm-2"
              :placeholder="'Edit Stock'"
            />
          </form>

          <form class="form-inline justify-content-between" role="form">
            <label class="mb-2 mr-sm-2">Satuan</label>
            <input
              type="text"
              class="form-control mb-2 mr-sm-2"
              :placeholder="'Edit Satuan'"
            />
          </form>

          <form class="form-inline justify-content-between" role="form">
            <label class="mb-2 mr-sm-2">Harga Beli</label>
            <input
              type="text"
              class="form-control mb-2 mr-sm-2"
              :placeholder="'Edit Harga Beli'"
            />
          </form>
          <button
            type="button"
            class="btn btn-danger modalBtn"
            @click="
              () => {
                $bvModal.hide('item-modal');
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
            Tambah
          </button>
        </div>
      </div>
    </b-modal>
    <div class="header">
      <h1 style="color: white">{{ $appName }}</h1>
    </div>

    <div id="content-area">
      <div>
        <div class="inlineKeyVal">
          <label>Nama Toko : </label>
          <input type="text" v-model="nama_toko" />
        </div>

        <div class="inlineKeyVal">
          <label class="d-flex" title="Alamat Toko">Alamat Toko : </label>
          <input type="text" v-model="alamat_toko" :readonly="true" />
        </div>
      </div>

      <br />

      <div>
        <div>Daftar Pembelian:</div>
        <br />
        <div id="separator" />
        <div id="itemListContainer">
          <item-list-form title v-if="items.length > 0" />
          <item-list-form
            v-for="(item, index) in items"
            :key="`${index}`"
            ref="items"
            :item="item"
            :hapus="
              () => {
                items.splice(index, 1);
              }
            "
          />
        </div>
      </div>

      <br />

      <div class="d-flex justify-content-end" style="width: 100%">
        <b-button
          class="text-decoration-none text-tombol"
          variant="link"
          @click="
            () => {
              showModal();
            }
          "
          >+ Tambah Barang</b-button
        >
      </div>

      <br />

      <div class="d-flex justify-content-end" style="margin-bottom: 40px">
        <div style="width: 350px">
          <div class="inlineKeyVal">
            <label>Total Pembelian :</label>
            <div>{{ total_pembelian }}</div>
          </div>

          <div class="inlineKeyVal" style="padding-right: 10px">
            <label>Diskon :</label>
            <div class="row align-items-center">
              <b-form-input
                size="sm"
                style="width: 50px; text-align: right"
                v-model.number="discount"
              />
              %
            </div>
          </div>

          <div
            class="d-flex justify-content-end"
            style="text-decoration: line-through"
          >
            {{ potongan_diskon }}
          </div>

          <div class="inlineKeyVal">
            <label>Potongan Harga :</label>
            <b-form-input
              size="sm"
              style="width: 150px; text-align: right"
              v-model="potongan"
            />
          </div>

          <br />

          <div class="inlineKeyVal">
            <label style="font-weight: bolder; font-size: 24px"
              >Jumlah Akhir</label
            >
            <label style="font-weight: bolder; font-size: 24px">{{
              total_akhir
            }}</label>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <b-button class="tombol btn btn-danger" @click="batal">Batal</b-button>
        <b-button class="tombol btn btn-success">Buat Invoice</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ItemListForm } from "../components";

export default {
  components: { ItemListForm },
  props: {},
  data: () => ({
    nama_toko: "",
    alamat_toko: "",
    discount: 0,
    potongan: 0,
    items: [],
  }),
  computed: {
    total_pembelian() {
      return this.items.reduce(
        (total, item) => total + item.harga_satuan * item.jumlah,
        0
      );
    },
    potongan_diskon() {
      return Math.round((this.total_pembelian * this.discount) / 100);
    },
    total_akhir() {
      return this.total_pembelian - this.potongan_diskon - this.potongan;
    },
  },
  methods: {
    showModal() {
      this.$bvModal.show("item-modal");
    },
    buatInvoice() {},
    batal() {
      this.$router.back();
    },
  },
};
</script>

<style>
.header {
  display: flex;
  margin: 0;
  background: url(../assets/17545.jpg) no-repeat center center fixed;
  background-size: cover;
  background-position: center;

  padding: 15px;
}
#content-area {
  padding: 30px;
}
.inlineKeyVal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
.text-tombol {
  font-weight: bolder;
  font-size: 18px;
  color: deepskyblue;
}
.tombol {
  min-width: 120px;
  margin: 0 15px;
}
#separator {
  width: 100%;
  height: 1px;
  background-color: black;
}
#itemListContainer {
  width: 100%;
  padding: 0 15px;
}

p {
  font-size: 25px;
}
</style>