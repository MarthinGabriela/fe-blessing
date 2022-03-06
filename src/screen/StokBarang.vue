<template>
  <app-screen active="stok">
    <b-overlay :show="uploading">
      <b-modal hide-footer hide-header centered id="delete-modal">
        <div style="padding: 20px; background-color: white" v-if="selectedIndex !== null">
          <div class="container-fluid">
            <p>
              <strong>Hapus Barang</strong>
            </p>
            <div class="mb-3">
              Apakah anda yakin ingin menghapus barang ini?
            </div>
            <button
              type="button"
              class="btn btn-secondary modalBtn"
              @click="
                () => {
                  $bvModal.hide('delete-modal');
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
              @click="() => {deleteBarang(selectedIndex)}"
            >
              Hapus
            </button>
          </div>
        </div>
      </b-modal>

      <div class="container-fluid">
        <div class="d-flex" style="margin: 10px 0; height: 40px">
          <button
            style="position: absolute; right: 15px"
            class="btn btn-primary ml-auto"
            @click="() => goToFormBarang()"
          >
            Tambah Barang
          </button>
        </div>

        <!-- <form>
          <div class="input-group">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Search"
            />
            <div class="input-group-btn">
              <button
                class="btn btn-default ml-3"
                type="button"
                style="border-color: silver; font-weight: bold"
              >
                Cari
              </button>
            </div>
          </div>
        </form>

        <br /> -->

        <!-- <b-table
          bordered
          responsive="sm"
          :fields="barangField"
          :items="barang"
          :busy="!itemReady"
        >
          <template #table-busy>
            <div class="text-center text-info my-2">
              <b-spinner class="align-middle" />
              <strong>Loading...</strong>
            </div>
          </template>

          <template #cell(stockBarang)="data">
            <div class="text-right" style="margin-right: 10px">
              {{ data.value }} / {{ barang[data.index].satuanBarang }}
            </div>
          </template>

          <template #cell(action)="data">
            <div class="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-default btn-sm editBtn btn-info px-3 mr-2"
                @click="() => goToFormBarang(barang[data.index].idBarang)"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-default btn-sm editBtn btn-danger"
                @click="() => {showModal(data.index)}"
              >
                Hapus
              </button>
            </div>
          </template>
        </b-table> -->

        <table class="table table-hover table-bordered" id="table_barang">
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Stok</th>
              <th>Satuan</th>
              <th>Harga</th>
              <th class="text-center align-middle">Aksi</th>
            </tr>
          </thead>
        </table>
      </div>
    </b-overlay>
  </app-screen>
</template>

<script>
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import { AppScreen } from "../components";
import { BarangService } from "../helpers/servicesAPI";
import { Store } from "../store";

export default {
  name: "Stok",
  components: { AppScreen },
  data: () => ({
    selectedIndex: null,
    barangField: [
      { key: "namaBarang", label: "Nama Barang" },
      { key: "stockBarang", label: "Stok / Satuan", thClass: "text-center" },
      {
        key: "hargaBeliBarang",
        label: "Harga",
        thClass: "text-center",
        tdClass: "text-right",
      },
      {
        key: "action",
        label: "",
        thStyle: "width: 200px",
      },
    ],

    itemReady: false,
    uploading: false,

    search: "",
    baseBarang: [],
  }),
  computed: {
    barang() {
      return this.baseBarang.filter(
        (b) =>
          b["namaBarang"].toLowerCase().indexOf(this.search.toLowerCase()) >= 0
      );
    },
  },
  methods: {
    requestBarang() {
      BarangService.tampilkanItem()
        .then((response) => {
          if (response && response.status === 200) {
            this.baseBarang = response.result;
            Store.commit("setListBarang", response.result);
          }
        })
        .finally(() => {
          this.itemReady = true;
        });
    },
    showModal(selectedIndex) {
      this.selectedIndex = selectedIndex;
      this.$bvModal.show("delete-modal");
    },
    goToFormBarang(idBarang) {
      this.$router.push({ name: "FormBarang", query: {...(idBarang !== null ? {id: idBarang} : {})} });
    },
    deleteBarang(idBarang) {
      this.uploading = true;
      BarangService.deleteBarang(idBarang)
        .then(response => {
          if (response && response.status === 200) {
            // alert("Berhasil Menghapus Invoice")
            window.location.reload();
          } else {
            alert("Gagal menghapus barang");
            console.warn(response);
          }
        })
        .catch(() => {
          alert("Gagal mengupdate item");
          // console.log(err);
        })
        .finally(() => {
          this.uploading = false;
        })
    }
  },
  created() {
    const storedList = Store.getters.listBarang;
    if (storedList && storedList.length > 0) {
      this.baseBarang = storedList;
      this.itemReady = true;
    }

  },
  mounted() {
    this.requestBarang();
    const self = this;
    $('#table_barang').DataTable({
        processing: true,
        data: this.baseBarang,
        stateSave: true,
        searching: true,
        ordering:  false,
        columns: [
            { data: 'namaBarang' },
            { data: 'stockBarang' },
            { data: 'satuanBarang' },
            { data: 'hargaBeliBarang' },
            { data: 'idBarang' }
        ],
        columnDefs: [
          {
            targets: -1,
            orderable: false,
            render: function(data) { 
              return '\
              <div class="text-center">\
                <button class="btn btn-default btn-sm btn-info px-3 mr-2 edit-view" type="button" style="margin-right: 1px" data-item-id='+data+'> Edit </button>\
                <button class="btn btn-default btn-sm btn-danger delete-view" type="button" style="margin-right: 1px" data-item-id='+data+'> Hapus </button>\
              </div>\
              '
            }
          }
        ],
        drawCallback: function() {
            $(".edit-view").on( 'click', function (e) {
              self.goToFormBarang(e.target.dataset.itemId);
            });
            $(".delete-view").on( 'click', function (e) {
                self.showModal(e.target.dataset.itemId);
            });
        }
      });
  }
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