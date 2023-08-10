<template>
    <div>
        <table>
            <tr>
                <th>Id</th>
                <th>Nama</th>
                <th>Harga Beli</th>
            </tr>
            <tr v-for="(barang, index) in barangs"
                :key="index"
                >
                <td>{{barang.id}}</td>
                <td>{{barang.nama}}</td>
                <td>{{barang.hargaBeli}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default{
        data: () => ({
            barangs: [],
        }),
        methods: {
            fetchBarang(){
                fetch("https://tb-blessing-db-production.up.railway.app/barang/tampilkan")
                    .then(response => response.json())
                    .then(barangs => {
                        console.log(barangs)
                        this.barangs = barangs
                    })
                    .catch(error => console.log(error))
            }
        },
        created() {
            this.fetchBarang();
        }
    }
</script>
