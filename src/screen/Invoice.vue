<template>
    <div style="max-width: 100%">
        <div class="header">
            <h1 style="color: white">{{$appName}}</h1>
        </div>

        <div id="content-area">
            <div>
                <div class="inlineKeyVal">
                    <label>Nama Toko : </label>
                    <input type="text"
                           v-model="nama_toko"
                    />
                </div>

                <div class="inlineKeyVal">
                    <label class="d-flex" title="Alamat Toko">Alamat Toko : </label>
                    <input type="text"
                           v-model="alamat_toko"
                           :readonly="true"
                    />
                </div>
            </div>

            <br>

            <div>
                <div>Daftar Pembelian: </div>
                <br>
                <div id="separator"/>
                <div id="itemListContainer">
                    <item-list-form title
                                    v-if="items.length > 0"
                    />
                    <item-list-form v-for="(item, index) in items"
                                    :key="`${index}`"
                                    ref="items"
                                    :item="item"
                                    :hapus="() => {items.splice(index, 1)}"
                    />
                </div>
            </div>

            <br>

            <div class="d-flex justify-content-end" style="width: 100%">
                <b-button class="text-decoration-none text-tombol"
                          variant="link"
                          @click="() => {items.push({nama: `test push item ${Math.random()}`, harga_satuan: 10000, jumlah: 1})}"
                >+ Tambah Barang</b-button>
            </div>

            <br>

            <div class="d-flex justify-content-end" style="margin-bottom: 40px">
                <div style="width: 350px;">
                    <div class="inlineKeyVal">
                        <label>Total Pembelian :</label>
                        <div>{{total_pembelian}}</div>
                    </div>

                    <div class="inlineKeyVal" style="padding-right: 10px">
                        <label>Diskon :</label>
                        <div class="row align-items-center">
                            <b-form-input
                                    size="sm"
                                    style="width: 50px; text-align: right"
                                    v-model.number="discount"
                            /> %
                        </div>
                    </div>

                    <div class="d-flex justify-content-end" style="text-decoration: line-through"
                    >{{potongan_diskon}}</div>

                    <div class="inlineKeyVal">
                        <label>Potongan Harga :</label>
                        <b-form-input
                                size="sm"
                                style="width: 150px; text-align: right"
                                v-model="potongan"
                        />
                    </div>

                    <br>

                    <div class="inlineKeyVal">
                        <label style="font-weight: bolder; font-size: 24px">Jumlah Akhir</label>
                        <label style="font-weight: bolder; font-size: 24px">{{total_akhir}}</label>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <b-button class="tombol" @click="batal">Batal</b-button>
                <b-button class="tombol">Buat Invoice</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {ItemListForm} from "../components";

    export default {
        components: {ItemListForm},
        props: {

        },
        data: () => ({
            nama_toko: '',
            alamat_toko: '',
            discount: 0,
            potongan: 0,
            items: []
        }),
        computed: {
            total_pembelian() {
                return this.items.reduce((total, item) => total + item.harga_satuan * item.jumlah, 0);
            },
            potongan_diskon() {
                return Math.round(this.total_pembelian * this.discount / 100);
            },
            total_akhir() {
               return this.total_pembelian - this.potongan_diskon - this.potongan;
            }
        },
        methods: {
            buatInvoice() {

            },
            batal() {
                this.$router.back();
            }
        }
    }
</script>

<style>
    .header {
        display: flex;
        background-color: black;
        padding: 15px;
    }
    #content-area{
        padding: 30px;
    }
    .inlineKeyVal {
        display : flex;
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
        background-color: black
    }
    #itemListContainer {
        width: 100%;
        padding: 0 15px
    }
</style>