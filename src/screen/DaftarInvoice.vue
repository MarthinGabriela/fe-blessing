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
      </div>
    </b-container>
  </app-screen>
</template>

<script>
  import { AppScreen } from "../components";
  import { TransaksiService } from "../helpers/servicesAPI";
  import { currencyFormatting } from "../helpers/common";

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
        { key: "detail", label: "" },
      ],
      dari: null,
      sampai: null,

      transaksi: [],
    }),
    methods: {
      getDateFormat(epochTime) {
        const date = new Date(epochTime);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
      },
      getInvoiceList() {
        this.invoiceReady=false;

        TransaksiService.tampilkanInvoice({
          page: this.page,
          ...(this.dari ? {start: this.dari} : {}),
          ...(this.sampai ? {end: this.sampai} : {}),
        })
                .then(response => {
                  this.transaksi = response.result;
                  this.nextPage = response.message;
                })
                .catch(() => {
                  this.transaksi = [];
                  this.nextPage = false;
                })
                .finally(() => {
                  this.invoiceReady=true;
                })
      },
      goToFormBarang() {
        this.$router.push({ name: "FormInvoice", query: {vmd: 'CREATE'}});
      },
      viewInvoice(idInvoice, mode) {
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