<template>
    <tr>
        <th v-if="title" class="title nama" :style="{width: viewMode ? '50%' : '40%'}">Nama Barang</th>
        <td v-else class="nama" :style="{width: viewMode ? '50%' : '40%'}">{{item.namaBarang}}</td>

        <th v-if="title" class="title jumlah">Jumlah</th>
        <td v-else class="jumlah">
            <b-form-input v-model="item.stock"
                          :plaintext="viewMode"
                          :readonly="viewMode"
                          class="taRight"
                          size="md"
                          type="number"
                          number
                          :min="1"
            />
        </td>

        <th v-if="title" class="title harga">Harga Satuan</th>
        <td v-else class="harga">
            <b-form-input v-model="item.harga"
                          :plaintext="viewMode"
                          :readonly="viewMode"
                          class="taRight"
                          size="md"
                          type="number"
                          number
                          :min="0"
            />
        </td>

        <th v-if="title" class="title total">Harga Total</th>
        <td v-else class="text-right total">{{harga_total}}</td>

        <th v-if="title && !viewMode" class="tombol"/>
        <td class="text-center tombol"
            v-else-if="!viewMode"
        >
            <button v-if="!title"
                    style="height: 30px"
                    @click="hapus"
            >Hapus</button>
        </td>
    </tr>
</template>

<script>
    import {currencyFormatting} from '../helpers/common';
    export default {
        props: {
            mode: {
                type: String,
                default: 'EDIT'
            },
            title: {
                type: Boolean,
                default: false
            },
            item: Object,
            hapus: {
                type: Function,
                default: () => {}
            }
        },
        computed: {
            harga_total() {
                return currencyFormatting(this.item.harga * this.item.stock);
            },
            viewMode() {
                return this.mode === 'VIEW'
            }
        },
    }
</script>

<style scoped>
    th, td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .itemListContainer {
        width: 100%;
        padding: 0 15px;
        table-layout: fixed;
        white-space: nowrap;
    }

    .itemListContainer td{
        border-bottom: 0;
        border-top: 0;
        padding-top: 0;
        padding-bottom: 0;
    }

    .title {
        text-align: center;
        font-weight: bolder;
        font-size: 14px;
        padding: 10px;
    }
    .taRight {
        text-align: right;
        font-size: 18px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .jumlah {
        width: 10%;
    }
    .harga, .total {
        width: 20%
    }
</style>