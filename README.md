# Front End Service (In Development)

## - Project setup
>Pastikan jalankan ini terlebih dahulu setelah pull atau clone projek
```
npm install
```

### - Compiles and hot-reloads for development
> Untuk menjalankan program dalam mode development
```
npm run serve
```
> Untuk menjalankan program dalam mode production
### - Compiles and minifies for production
```
npm run build
```

### [Panduan untuk deploy ke Heroku](https://cli.vuejs.org/guide/deployment.html#heroku)



## Halaman

### - Login Page _(Belum tersedia)_    
Berisi password yang harus dimasukan oleh user untuk dapat mengakses aplikasi  
- Jika **berhasil** melakukan login, maka suatu informasi akan disimpan ke dalam memori lokal sebagai Authorisasi
> Penyimpanan dilakukan menggunakan [vuex-persist](https://www.npmjs.com/package/vuex-persist)
- Jika **gagal** maka akan muncul sebuah alert yang menyatakan login gagal

### - Home Page  
Berisi informasi-informasi mengenai invoice berupa nama, tanggal pembuatan, dan informasi lainnya.  
Invoice akan diurutkan berdasarkan hari pembuatan, dimana invoice paling baru akan dimunculkan di paling atas **(Belum diimplementasi, jumlah maksimum per halaman belum pasti)**. Di halaman ini juga terdapat sebuah tombol yang akan mengarahkan ke halaman form invoice.  
> Pada setiap baris invoice pada tabel, akan terdapat 2 tombol yang dapat digunakan untuk mengedit atau melihat detail invoice

#### Form Invoice
Sebagai sebuah komponen dalam vue, dapat digunakan untuk membuat invoice baru, mengedit invoice, dan hanya melihat invoice _**(on progress)**_. Terdapat sebuah tombol untuk menambahkan item, tombol ini akan mengarahkan ke halaman pemilihan item _**(belum diimplementasi)**_ yang akan ditambahkan ke dalam invoice. Ketika menambahkan item, jumlah barang yang akan dijual harus dimasukkan secara mandiri. Harga satuan dari item akan dimasukkan kedalam tabel, namun masih dapat diubah sesuai keinginan.  
>> Harga total dari item, serta total pembayaran dalam nota akan terhitung secara otomatis. 

#### Menu Pemilihan Item _(Belum Tersedia)_
> Segala sesuatu yang tertulis masih dalam perencanaan
Tampilan mirip dengan halaman list item, hanya saja tidak ada opsi untuk menambahkan, menghapus, maupun mengedit item. Informasi yang tersedia dalam tabel hanya berupa nama item dan harga item tersebut.

### Form Tambah Barang
Halaman yang berisikan form informasi barang yang akan ditambahkan

### - Item List Page
Halaman yang menampilkan item yang dijual, stok dari item tersebut, dan harga satuannya. Pada halaman ini terdapat opsi untuk menambahkan, menghapus, mengedit item, dan mencari item.

### - Transaction Page
Halaman terdiri dari 2 tab, yaitu pendapatan dan hutang.

### Tab Pendapatan
Berisikan informasi dari semua pemasukkan yang didapat setiap saat. informasi dapat difilter dalam bulanan maupun harian. Selain filter, terdapat juga informasi pendapatan yang didapat dalam 1 bulan.

### Tab Hutang
Berisi informasi dari hutang-hutang yang belum dibayar serta total semua hutang yang masih tersisa