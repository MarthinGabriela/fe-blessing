<template>
  <app-screen active="home">
    <b-container :fluid="true" style="padding-bottom: 30px">
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
        <div class="input-group">
          <b-form-datepicker
            locale="in-ID"
            class="form-control startdate datetimepicker-input"
          />

          <div class="input-group-append">
            <span class="input-group-text">s/d</span>
          </div>

          <b-form-datepicker
            locale="in-ID"
            class="form-control enddate datetimepicker-input"
          />
        </div>
      </div>

      <b-table
        bordered
        responsive="sm"
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

        <template #cell(potongan)="data">
          <div>
            <div>{{hitungPotongan(data.index)}}</div>
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
          </div>
        </template>
      </b-table>

      <div class="text-center">
        <button v-if="page > 1"
                @click="() => {
                  page--;
                  getInvoiceList(page);
                }"
                :disabled="!invoiceReady"
        >&#60;</button>
        <span> {{page}} </span>
        <button v-if="nextPage === 'Next Page'"
                @click="() => {
                  page++;
                  getInvoiceList(page);
                }"
                :disabled="!invoiceReady"
        >&#62;</button>
      </div>
    </b-container>
  </app-screen>
</template>

<script>
import { AppScreen } from "../components";
import { TransaksiService } from "../helpers/servicesAPI";

export default {
  name: "Transaksi",
  components: { AppScreen },
  data: () => ({
    page: 1,
    nextPage: null,
    invoiceReady: false,
    transaksiField: [
      { key: "namaPembeli", label: "Nama Pelanggan", thClass: 'text-center'},
      { key: "tanggalTransaksi", label: "Tanggal Pemesanan", thClass: 'text-center'},
      { key: "diskon", label: "Diskon", thClass: 'text-center'},
      { key: "potongan", label: "Potongan Harga", thClass: 'text-center', tdClass: 'text-right'},
      { key: "nominalTransaksi", label: "Total Transaksi", thClass: 'text-center', tdClass: 'text-right'},
      { key: "detail", label: "" },
    ],
    dariTanggal: null,

    transaksi: [],
  }),
  methods: {
    hitungPotongan(index) {
        const retur = this.transaksi[index].listBarangJual;
        console.log(`index = ${index} = ${JSON.stringify(retur)}`);
        if(retur.length > 0) {
          return retur.reduce((a,c) => a + (c['hargaJual'] * c['stockBarangJual']), 0);
        } else {
          return 0;
        }
    },
    getDateFormat(epochTime) {
      const date = new Date(epochTime);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    },
    getInvoiceList(page) {
      this.invoiceReady=false;

      TransaksiService.tampilkanInvoice(page)
        .then(response => {
          this.transaksi = response.result;
          this.nextPage = response.message;
        })
      .finally(() => {
        this.invoiceReady=true;
      })
    },
    goToFormBarang() {
      this.$router.push({ name: "FormInvoice", query: {vmd: 'CREATE'}});
    },
    viewInvoice(idInvoice, mode) {
      console.log("id = " + idInvoice);
      this.$router.push({ name: "FormInvoice", query: {vmd: mode, id: idInvoice} });
    }
  },
  mounted() {
    this.getInvoiceList(this.page);
  }
};
</script>

<style scoped>
</style>