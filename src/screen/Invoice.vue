<template>
  <div style="max-width: 100%">
    <b-modal hide-footer hide-header centered id="item-modal">
      <div style="padding: 20px; background-color: white">
        <div class="container-fluid">
          <p>
            <strong>Tambah Barang {{invItem ? '' : 'Retur'}}</strong>
          </p>

          <form role="form">
            <div class="form-inline justify-content-between">
              <label class="mb-2 mr-sm-2">Nama</label>
              <input
                      type="text"
                      class="form-control mb-2 mr-sm-2"
                      list="barang-list"
                      :placeholder="'Nama Barang'"
                      v-model="tmpItem['namaBarang']"
              />
              <datalist id="barang-list">
                <option v-for="(item, index) in itemHelper"
                        :key="item+index"
                >{{ item }}</option>
              </datalist>
            </div>

            <div class="form-inline justify-content-between">
              <label class="mb-2 mr-sm-2">Jumlah</label>
              <input
                      type="number"
                      class="form-control mb-2 mr-sm-2"
                      :placeholder="'Masukkan Jumlah'"
                      v-model="tmpItem['stock']"
              />
            </div>

            <div class="form-inline justify-content-between" role="form">
              <label class="mb-2 mr-sm-2">Harga</label>
              <input
                      type="number"
                      class="form-control mb-2 mr-sm-2"
                      :placeholder="'Masukkan Harga'"
                      v-model="tmpItem['harga']"
              />
            </div>
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
                  @click="addInvoiceItem"
          >
            Tambah
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal hide-footer hide-header centered id="error-modal">
      <div class="justify-content-center align-items-center d-flex"
           style="background-color: white; padding: 20px"
      >
        {{errorMessage}}
      </div>
    </b-modal>

    <div class="header">
      <h1 style="color: white">{{ $appName }}</h1>
    </div>

    <div id="content-area">
      <div>
        <div class="inlineKeyVal">
          <label>Nama Toko : </label>
          <input type="text" v-model="namaPembeli" />
        </div>

        <div class="inlineKeyVal">
          <label class="d-flex" title="Alamat Toko">Alamat Toko : </label>
          <input type="text" v-model="alamat" />
        </div>
      </div>

      <br />

      <div>
        <div>Daftar Pembelian:</div>
        <div class="separator" />
        <div class="itemListContainer">
          <item-list-form title v-if="invoiceItems.length > 0" />
          <item-list-form
                  v-for="(item, index) in invoiceItems"
                  :key="`${index}`"
                  ref="items"
                  :item="item"
                  :hapus="() => {invoiceItems.splice(index, 1);}"
          />
        </div>
      </div>

      <div :style="{marginTop: '20px'}"
           v-if="returItems.length > 0"
      >
        <div>Daftar Barang Retur:</div>
        <div class="separator" />
        <div class="itemListContainer">
          <item-list-form title  />
          <item-list-form
                  v-for="(item, index) in returItems"
                  :key="`${index}`"
                  ref="items"
                  :item="item"
                  :hapus="() => {returItems.splice(index, 1);}"
          />
        </div>
      </div>

      <br />

      <div class="d-flex justify-content-end row" style="width: 100%">
        <b-button
                class="text-decoration-none text-tombol"
                variant="link"
                @click="() => {showModal(true)}"
        >+ Tambah Barang</b-button>
        <b-button
                class="text-decoration-none text-retur"
                variant="link"
                @click="() => {showModal(false)}"
        >+ Tambah Retur</b-button>
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
                      v-model.number="diskon"
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
            <label style="font-weight: bold;">{{ potongan }}</label>
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
        <b-button class="tombol btn btn-success" @click="buatInvoice">Buat Invoice</b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { ItemListForm } from "../components";
  import { Store } from '../store';
  import {BarangService, TransaksiService} from "../helpers/servicesAPI";

  export default {
    components: { ItemListForm },
    props: {},
    data: () => ({
      idInvoice: 0,

      namaPembeli: "",
      alamat: "",
      diskon: 0,

      invItem: true,
      tmpItem:{
        namaBarang: '',
        stock: null,
        harga: null
      },

      invoiceItems: [],
      returItems: [],
      items: [],
      errorMessage: '',
    }),
    computed: {
      itemHelper() {
        return this.items.length > 0 ? this.items.map(i => i.namaBarang) : [];
      },
      total_pembelian() {
        return this.invoiceItems.length > 0 ? this.invoiceItems.reduce(
                (total, item) => total + item.harga * item.stock,
                0
        ) : 0;
      },
      potongan() {
        return this.returItems.length > 0 ? this.returItems.reduce(
                (total, item) => total + item.harga * item.stock,
                0
        ) : 0;
      },
      potongan_diskon() {
        return Math.round((this.total_pembelian * this.diskon) / 100);
      },
      total_akhir() {
        return this.total_pembelian - this.potongan_diskon - this.potongan;
      },
    },
    methods: {
      validateInvoice() {
        return !!this.namaPembeli &&
                !!this.alamat &&
                (this.invoiceItems.length > 0 || this.returItems.length > 0);
      },
      showModal(isInvItem) {
        this.invItem = isInvItem;

        this.tmpItem = {
          namaBarang: '',
          stock: null,
          harga: null
        }
        this.$bvModal.show("item-modal");
      },
      addInvoiceItem() {
        if(this.itemHelper.indexOf(this.tmpItem.namaBarang) < 0) {
          this.errorMessage = 'Barang tidak tercatat di Database';
          this.$bvModal.show("error-modal");
          return;
        }

        if(this.invItem) {
          this.invoiceItems.push({...this.tmpItem});
        } else {
          this.returItems.push({...this.tmpItem});
        }

        this.$bvModal.hide('item-modal');
      },
      buatInvoice() {
        if(this.validateInvoice()) {
          TransaksiService.buatInvoice({
            namaPembeli: this.namaPembeli,
            alamat: this.alamat,
            diskon: this.diskon,
            listBarangJual: this.invoiceItems,
            listBarangRetur: this.returItems,
            DP: 0
          }).then(response => {
            console.log(response);
            alert('berhasil')
          }).catch(() => {
            alert('error gan')
          })
        } else {
          this.errorMessage = "Harap isi semua informasi yang dibutuhkan"
          this.$bvModal.show("error-modal");
        }
      },
      batal() {
        this.$router.back();
      },
      requestBarang() {
        BarangService.tampilkanItem()
                .then(response => {
                  if(response && response.status === 200) {
                    this.baseBarang = response.result;
                    Store.commit('setListBarang', response.result);
                  }
                })
                .finally(() => {
                  this.itemReady = true;
                })
      },
      viewInvoice() {
        TransaksiService.viewInvoice(this.idInvoice)
                .then(response => {
                  if(response && response.status === 200) {
                    const data = response.result;

                    this.namaPembeli = data.namaPembeli;
                    this.alamat= data.alamat;
                    this.diskon= data.diskon;
                    this.invoiceItems= data.invoiceItems;
                    this.returItems= data.returItems;
                  }
                })
                .finally(() => {
                  this.itemReady = true;
                })
      },
    },
    created() {
      console.log('query = ' + this.$router.query);
      if(this.$router.query && this.$router.query.id) {
        this.idInvoice = this.$router.query.id;
        this.viewInvoice();
      } else {
        const storedList = Store.getters.listBarang;
        if (storedList && storedList.length > 0) {
          this.items = storedList;
        }

        this.requestBarang();
      }
    }
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
  .itemListContainer {
    width: 100%;
    padding: 0 15px;
  }

  p {
    font-size: 25px;
  }
</style>