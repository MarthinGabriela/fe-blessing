<template>
    <div>
        <div class="header">
            <h1>{{$appName}}</h1>
        </div>

        <div id="content-area">
            <div>
                <div class="inlineKeyVal">
                    <div class="d-flex">Nama Toko</div>
                    <input type="text"/>
                </div>

                <div class="inlineKeyVal">
                    <div class="d-flex">Alamat Toko</div>
                    <input type="text"/>
                </div>
            </div>

            <br>

            <div>
                <div>Daftar Pembelian: </div>
                <br>
                <div style="width: 100%; height: 1px; background-color: black"/>
                <div style="width: 100%; padding: 0 15px">
                    <item-list-form title/>
                    <item-list-form v-for="(item, index) in items"
                                    :key="`${index}`"
                                    :item="item"
                    />
                </div>
                <br>
                <div class="d-flex justify-content-end" style="width: 100%">
                    <b-button class="text-decoration-none text-tombol" variant="link">+ Tambah Barang</b-button>
                </div>
            </div>

            <br>

            <div class="d-flex justify-content-end" style="margin-bottom: 40px">
                <div style="width: 350px;">
                    <div class="inlineKeyVal">
                        <label>Total Pembelian :</label>
                        <div>10000</div>
                    </div>

                    <div class="inlineKeyVal" style="padding-right: 10px">
                        <label>Diskon :</label>
                        <div class="row align-items-center">
                            <b-form-input size="sm" style="width: 50px"/> %
                        </div>
                    </div>

                    <div class="d-flex justify-content-end" style="text-decoration: line-through">100</div>

                    <div class="inlineKeyVal">
                        <label>Potongan Harga :</label>
                        <b-form-input size="sm" style="width: 150px; text-align: right"/>
                    </div>

                    <br>

                    <div class="inlineKeyVal">
                        <label style="font-weight: bolder; font-size: 24px">Jumlah Akhir</label>
                        <label style="font-weight: bolder; font-size: 24px">10000</label>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <b-button class="tombol">Batal</b-button>
                <b-button class="tombol">Buat Invoice</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {ItemListForm} from "../components";

    export default {
        components: {ItemListForm},
        data: () => ({
            items: [
                {
                    nama: 'Untuk uji coba 1',
                    harga_satuan: 10000
                },
                {
                    nama: 'Untuk uji coba 2',
                    harga_satuan: 1000
                },
                {
                    nama: 'Untuk uji coba 3',
                    harga_satuan: 100
                }
            ]
        })
    }
</script>

<style>
    .header {
        display: flex;
        background-color: yellow;
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
</style>