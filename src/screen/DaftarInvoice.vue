<template>
  <app-screen active="home">
    <b-container :fluid="true" style="padding-bottom: 30px">
      <b-modal hide-footer hide-header centered id="delete-modal">
        <div style="padding: 20px; background-color: white" v-if="selectedIndex !== null && !deleting">
          <div class="container-fluid">
            <p>
              <strong>Hapus Invoice</strong>
            </p>
            <div class="mb-3">
              Apakah anda yakin ingin menghapus Invoice ini?
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
              class="btn btn-danger modalBtn"
              style="margin-top: 10px"
              @click="() => {deleteInvoice(selectedIndex)}"
            >
              Hapus
            </button>
          </div>
        </div>
        <div v-else-if="deleting" class="d-flex justify-content-center align-items-center">
          <b-spinner/>
        </div>
      </b-modal>

      <div class="d-flex" style="margin: 10px 0; height: 40px">
        <button
                style="position: absolute; right: 15px"
                class="btn btn-primary ml-auto"
                @click="goToFormBarang"
        >
          Buat Nota
        </button>
      </div>

      <div class="form-group">
        <div style="font-weight: bold; margin: 10px 0">Periode Tanggal</div>
        <!-- <div class="input-group">
          <b-form-datepicker
                  v-model="dari"
                  locale="in-ID"
                  class="form-control startdate datetimepicker-input"
                  label-no-date-selected="Dari Tanggal"
                  reset-button
                  :max="new Date()"
                  @input="() => {
                    page = 1;
                    getInvoiceList()
                  }"
          />

          <div class="input-group-append">
            <span class="input-group-text">s/d</span>
          </div>

          <b-form-datepicker
                  v-model="sampai"
                  locale="in-ID"
                  class="form-control enddate datetimepicker-input"
                  label-no-date-selected="Sampai Tanggal"
                  reset-button
                  :max="new Date()"
                  @input="() => {
                    page = 1;
                    getInvoiceList()
                  }"
          />
        </div> -->
      </div>

      <!-- <b-table
              bordered
              :responsive="true"
              :busy="!invoiceReady"
              :fields="transaksiField"
              :items="transaksi"
      >
        <template #table-busy>
          <div class="text-center text-info my-2">
            <b-spinner class="align-middle" />
            <strong>Loading...</strong>
          </div>
        </template>

        <template #cell(tanggalTransaksi)="data">
          <div class="d-flex justify-content-center">
            <div>{{getDateFormat(data.value)}}</div>
          </div>
        </template>

        <template #cell(diskon)="data">
          <div class="d-flex justify-content-center">
            <div>{{data.value}} %</div>
          </div>
        </template>

        <template #cell(detail)="data">
          <div class="text-center">
            <b-button variant="link"
                      style="margin-right: 1px"
                      @click="() => {viewInvoice(transaksi[data.index].idTransaksi, 'EDIT')}"
            >Edit</b-button>
            |
            <b-button variant="link"
                      style="margin-right: 1px"
                      @click="() => {viewInvoice(transaksi[data.index].idTransaksi, 'VIEW')}"
            >Detail</b-button>
            |
            <b-button variant="link"
                      class="text-danger"
                      style="margin-right: 1px"
                      @click="() => {confirmDelete(data.index)}"
            >Hapus</b-button>
          </div>
        </template>
      </b-table> -->

      <table class="table table-borderless" cellspacing="5" cellpadding="1" border="0">
        <tbody>
          <tr>
            <div class="input-group mb-3">
              <input type="text" class="form-control" id="min" name="min" placeholder="Dari Tanggal" onfocus="(this.type='date')" onblur="(this.type='text')">
              <div class="input-group-append">
                <span class="input-group-text">s/d</span>
              </div>
              <input type="text" class="form-control" id="max" name="max" placeholder="Sampai Tanggal" onfocus="(this.type='date')" onblur="(this.type='text')">
            </div>
          </tr>
        </tbody>
      </table>
      <table class="table table-hover table-bordered" id="table_transaksi">
        <thead>
          <tr>
            <th>Nama Pelanggan</th>
            <th>Tanggal Pemesanan</th>
            <th>Diskon</th>
            <th>Total Transaksi</th>
            <th class="text-center align-middle">Aksi</th>
          </tr>
        </thead>
      </table>

      <!-- <div class="text-center">
        <button v-if="page > 1"
                @click="() => {
                  page--;
                  getInvoiceList();
                }"
                :disabled="!invoiceReady"
        >&#60;</button>
        <span> {{page}} </span>
        <button v-if="nextPage"
                @click="() => {
                  page++;
                  getInvoiceList();
                }"
                :disabled="!invoiceReady"
        >&#62;</button>
      </div> -->
    </b-container>
  </app-screen>
</template>

<script>
  //Datatable Modules
  import "datatables.net-dt/js/dataTables.dataTables"
  import "datatables.net-dt/css/jquery.dataTables.min.css"
  import $ from 'jquery';

  import { AppScreen } from "../components";
  import { listTransaksi, TransaksiService } from "../helpers/servicesAPI";
  import { currencyFormatting, getDateFormat } from "../helpers/common";

  export default {
    name: "Transaksi",
    components: { AppScreen },
    data: () => ({
      page: 1,
      nextPage: false,
      invoiceReady: false,
      transaksiField: [
        { key: "namaPembeli", label: "Nama Pelanggan", thClass: 'text-center'},
        { key: "tanggalTransaksi", label: "Tanggal Pemesanan", thClass: 'text-center'},
        { key: "diskon", label: "Diskon", thClass: 'text-center'},
        { key: "nominalTransaksi", label: "Total Transaksi", thClass: 'text-center', tdClass: 'text-right', formatter: currencyFormatting},
        { key: "detail", label: "", thStyle:"min-width: 250px; max-width: 250px", tdClass: 'py-1'},
      ],
      dari: null,
      sampai: null,
      nama_pelanggan: "",

      transaksi: [],
      selectedIndex: -1,
      deleting: false,
    }),
    methods: {
      // getInvoiceList() {
      //   this.invoiceReady=false;

      //   TransaksiService.tampilkanInvoice({
      //     page: this.page,
      //     ...(this.dari ? {start: this.dari} : {}),
      //     ...(this.sampai ? {end: this.sampai} : {}),
      //   })
      //           .then(response => {
      //             this.transaksi = response.result;
      //             this.nextPage = response.message;
      //           })
      //           .catch(() => {
      //             this.transaksi = [];
      //             this.nextPage = false;
      //           })
      //           .finally(() => {
      //             this.invoiceReady=true;
      //           })
      // },
      goToFormBarang() {
        this.$router.push({ name: "FormInvoice", query: {vmd: 'CREATE'}});
      },
      viewInvoice(idInvoice, mode) {
        this.$router.push({ name: "FormInvoice", query: {vmd: mode, id: idInvoice} });
      },
      confirmDelete(index){
        this.selectedIndex = index;
        this.$bvModal.show("delete-modal");
      },
      deleteInvoice(idInvoice) {
        this.deleting = true;
        TransaksiService.hapusInvoice(idInvoice)
          .then(() => {
            alert("Berhasil Menghapus Invoice")
            window.location.reload();
          })
          .catch(() => {
            alert("Gagal Menghapus Invoice")
          }) 
          .finally(() => {
            this.$bvModal.hide("delete-modal");
            this.$nextTick(() => {
              this.deleting = false;
              this.selectedIndex = -1;
            }); 
          })
      }
    },
    mounted() {
      // this.getInvoiceList(this.page);
      const self = this;

      var datatable = $('#table_transaksi').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
          url: listTransaksi,
          data: function(d) {
            return $.extend({},d,{
              "minDate": $('#min').val(),
              "maxDate": $('#max').val()
            })
          }
        },
        stateSave: true,
        searching: true,
        ordering:  false,
        columns: [
            { data: 'namaPembeli' },
            { data: 'tanggalTransaksi' },
            { data: 'diskon' },
            { data: 'nominalTransaksi' },
            { data: 'idTransaksi' }
        ],
        columnDefs: [
          {
            targets: 1,
            render: function(data) {
              return getDateFormat(data);
            }
          },
          {
            targets: 2,
            render: function(data) {
              return data + " %";
            }
          },
          {
            targets: 3,
            render: function(data) {
              return currencyFormatting(data);
            }
          },
          {
            targets: -1,
            orderable: false,
            render: function(data) { 
              return '\
              <div class="text-center">\
                <button class="btn btn-link edit-view" type="button" style="margin-right: 1px" data-item-id='+data+'> Edit </button>\
                |\
                <button class="btn btn-link detail-view" type="button" style="margin-right: 1px" data-item-id='+data+'> Detail </button>\
                |\
                <button class="btn btn-link delete-view text-danger" type="button" style="margin-right: 1px" data-item-id='+data+'> Hapus </button>\
              </div>\
              '
            }
          }
        ],
        drawCallback: function() {
            $(".detail-view").on( 'click', function (e) {
                self.viewInvoice(e.target.dataset.itemId, "VIEW");
            });
            $(".edit-view").on( 'click', function (e) {
              self.viewInvoice(e.target.dataset.itemId, "EDIT");
            });
            $(".delete-view").on( 'click', function (e) {
                self.confirmDelete(e.target.dataset.itemId);
            });
        }
      });
      $('#min, #max').on('change', function () {
        datatable.draw();
      });
    }
  };
</script>