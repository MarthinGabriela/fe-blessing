<template>
    <app-screen hide-nav-bar>
        <div class="container card"
             style="margin-top: 40px"
        >
            <div class="card-body">
                <h3 class="mb-4"><strong>Form Barang</strong></h3>
                <form>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Nama :</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control mb-2 mr-sm-2" placeholder="Masukkan Nama" name="nama">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Harga :</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control mb-2 mr-sm-2" placeholder="Masukkan Harga" name="harga">
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-sm-2 col-form-label">Stok/Satuan :</label>
                        <div class="col">
                            <input type="text" class="form-control" id="email" placeholder="Masukkan Stok" name="stok/satuan">
                        </div>
                        <div class="dropdown">
                            <button type="button" class="btn btn-primary dropdown-toggle mr-3" data-toggle="dropdown">-Satuan-</button>
                        </div>
                    </div>
                </form>

                <button type="button"
                        class="btn btn-primary"
                        style="border-radius: 5px; margin-top: 3px;"
                >Tambah</button>
                <button type="button"
                        class="btn btn-primary ml-1"
                        style="border-radius: 5px; margin-top: 3px;"
                        @click="goBack"
                >Batal</button>
            </div>
        </div>
    </app-screen>
</template>

<script>
    import {AppScreen} from "../components";

    export default {
        name: 'FormBarang',
        components: {AppScreen},
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>