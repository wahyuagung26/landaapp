# README #
Slim Framework 3 with Angular 1.6.5 For Web App

## How To Install ##

* Buka terminal
* Install Core Project dengan perintah `composer create-project landa/app FOLDER_NAME`
* Jalankan perintah `cd FOLDER_NAME/api`
* Jalankan perintah `composer install --no-dev`
* Buat database baru
* Setting koneksi dan base url untuk versi stable di `api/.env`
* Setting koneksi dan base url untuk versi testing di `api/test.env`
* Jalankan migrasi database dengan mengeksekusi file `api/migrasi.php` pada browser

## Library PHP yang digunakan ##

* Slim 3, dokumentasi lengkap di [https://www.slimframework.com/docs/](https://www.slimframework.com/docs/)
* Landa-Db, dokumentasi lengkap di [https://github.com/cahkampung052/landadb](https://github.com/cahkampung052/landadb)
* Migrasi database, dokumentasi lengkap di [https://github.com/cahkampung052/landamigrasi](https://github.com/cahkampung052/landamigrasi)
