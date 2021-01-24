<template>
    <div class="row">
        <div class="d-flex container" style="min-width: 200px">
            <div v-if="title" class="title">Nama Barang</div>
            <div v-else>{{item.namaBarang}}</div>
        </div>

        <div class="d-flex justify-content-center" style="width: 85px; padding: 10px;">
            <div v-if="title" class="title">Jumlah</div>
            <b-form-input v-else
                          v-model="item.stock"
                          class="taRight"
                          size="sm"
                          type="number"
                          number
                          :min="1"
            />
        </div>

        <div class="d-flex container justify-content-center" style="min-width: 150px">
            <div v-if="title" class="title">Harga Satuan</div>
            <b-form-input v-else
                          v-model="item.harga"
                          class="taRight"
                          size="sm"
                          type="number"
                          number
                          :min="0"
            />
        </div>

        <div class="d-flex container" style="min-width: 150px">
            <div v-if="title" class="d-flex title justify-content-center" style="width: 100%">Harga Total</div>
            <div v-else class="d-flex justify-content-end" style="width: 100%">{{harga_total}}</div>
        </div>

        <div class="d-flex justify-content-center" style="width: 80px; padding: 5px 10px">
            <button v-if="!title"
                    style="height: 30px"
                    @click="hapus"
            >Hapus</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: Boolean,
                default: false
            },
            item: {
                type: Object,
                required: true
            },
            hapus: {
                type: Function,
                required: true
            }
        },
        computed: {
            harga_total() {
                return this.item.harga * this.item.stock;
            }
        }
    }
</script>

<style>
    .title {
        font-weight: bolder;
        font-size: 14px;
    }
    .container {
        padding: 10px;
        flex: 1;
    }
    .taRight {
        text-align: right;
    }
</style>