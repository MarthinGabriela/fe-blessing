<template>
    <app-screen active="transaksi">
        <div class="container-fluid">
            <div class="d-flex" style="margin: 10px 0; height: 40px">
                <button style="position: absolute; right: 15px"
                        class="btn btn-primary ml-auto"
                        @click="goToFormBarang"
                >Buat Nota</button>
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
                    :fields="transaksiField"
                    :items="transaksi"
            >
                <template #cell(detail)>
                    <a href="#">Detail >></a>
                </template>
            </b-table>
        </div>
    </app-screen>
</template>

<script>
    import {AppScreen} from "../components";

    export default {
        name: 'Transaksi',
        components: {AppScreen},
        data: () => ({
            transaksiField: [
                {key: 'nama_customer', label: 'Nama Pelanggan'},
                {key: 'tanggal_pemesanan', label: 'Tanggal Pemesanan'},
                {key: 'diskon', label: 'Diskon'},
                {key: 'total_transaksi', label: 'Total Transaksi'},
                {key: 'detail', label: ''}
            ],
            transaksi: [
                {
                    nama_customer: 'Kevin',
                    tanggal_pemesanan: '22-04-2020',
                    diskon: '5%',
                    total_transaksi: 140000
                }
            ]
        })
    }
</script>