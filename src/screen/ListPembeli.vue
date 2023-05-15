<template>
  <app-screen active="pembeli">
    <b-container :fluid="true" style="padding-bottom: 30px">
      <b-modal hide-footer hide-header centered id="delete-modal">
        <div style="padding: 20px; background-color: white" v-if="selectedIndex !== null && !deleting">
          <div class="container-fluid">
            <p>
              <strong>Hapus Pembeli</strong>
            </p>
            <div class="mb-3">
              Apakah anda yakin ingin menghapus pembeli ini?
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
              @click="() => {deletePembeli(selectedIndex)}"
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
                @click="goToFormPembeli"
        >
          Tambah Pembeli
        </button>
      </div>

      <table class="table table-hover table-bordered" id="table_pembeli">
        <thead>
          <tr>
            <th>Nama Pembeli</th>
            <th>Alamat</th>
            <th class="text-center align-middle">Aksi</th>
          </tr>
        </thead>
      </table>
    </b-container>
  </app-screen>
</template>

<script>
  //Datatable Modules
  import "datatables.net-dt/js/dataTables.dataTables"
  import "datatables.net-dt/css/jquery.dataTables.min.css"
  import $ from 'jquery';

  import { AppScreen } from "../components";
  import { listPembeli, PembeliService } from "../helpers/servicesAPI";

  export default {
    name: "Pembeli",
    components: { AppScreen },
    data: () => ({
      dari: null,
      sampai: null,
      nama_pelanggan: "",

      pembeli: [],
      selectedIndex: -1,
      deleting: false,
    }),
    methods: {
      goToFormPembeli() {
        this.$router.push({ name: "FormPembeli", query: {vmd: 'CREATE'}});
      },
      viewPembeli(idPembeli, mode) {
        this.$router.push({ name: "FormPembeli", query: {vmd: mode, id: idPembeli} });
      },
      confirmDelete(index){
        this.selectedIndex = index;
        console.log(index)
        this.$bvModal.show("delete-modal");
      },
      deletePembeli(idPembeli) {
        this.deleting = true;
        PembeliService.hapusPembeli(idPembeli)
          .then(() => {
            alert("Berhasil Menghapus Pembeli")
            window.location.reload();
          })
          .catch(() => {
            alert("Gagal Menghapus Pembeli")
          }) 
      }
    },
    mounted() {
      const self = this;
      $('#table_pembeli').DataTable({
        processing: true,
        serverSide: true,
        ajax: listPembeli,
        stateSave: true,
        searching: true,
        ordering:  false,
        columns: [
            { data: 'namaPembeli' },
            { data: 'alamat' },
            { data: 'idPembeli' }
        ],
        columnDefs: [
          {
            targets: -1,
            orderable: false,
            render: function(data) { 
              return '\
              <div class="text-center">\
                <button class="btn btn-link edit-view" type="button" style="margin-right: 1px" data-item-id='+data+'> Edit </button>\
                |\
                <button class="btn btn-link delete-view text-danger" type="button" style="margin-right: 1px" data-item-id='+data+'> Hapus </button>\
              </div>\
              '
            }
          }
        ],
        drawCallback: function() {
            $(".edit-view").on( 'click', function (e) {
              self.viewPembeli(e.target.dataset.itemId, "EDIT");
            });
            $(".delete-view").on( 'click', function (e) {
                self.confirmDelete(e.target.dataset.itemId);
            });
        }
      });
    }
  };
</script>