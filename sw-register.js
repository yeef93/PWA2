// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("service-worker.js")
        .then(function() {
          console.log("Registrasi Service Worker berhasil");
        })
        .catch(function() {
          console.log("Registrasi Service Worker gagal");
        });
    });
  } else {
    console.log("Service Worker belum didukung browser ini.");
  }

  // REQUEST API UNTUK PERTAMA KALI
  document.addEventListener("DOMContentLoaded", function() {
    const page = window.location.hash.substr(1);

  });