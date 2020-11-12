const dbPromised = idb.open("bebo", 25, function (upgradeDb) {
  const articlesObjectStore = upgradeDb.createObjectStore("articles", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("teams_id", "id", { unique: false });
});

function saveForLater(data) {
  console.log(data)
  dbPromised
    .then(function (db) {
      const tx = db.transaction("articles", "readwrite");
      const store = tx.objectStore("articles");
      store.put(data);
      console.log(data)
      return tx.complete;
    })
    .then(function () {
      console.log("Tim berhasil di simpan.");
    }).catch(function () {
      console.error("Tim gagal disimpan.");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("articles", "readonly");
        const store = tx.objectStore("articles");
        return store.getAll();
      })
      .then(function (data) {
        resolve(data);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("articles", "readonly");
        const store = tx.objectStore("articles");
        return store.get(parseInt(id));
      })
      .then(function (data) {
        resolve(data);
      });
  });
}

function deleteTeam(id) {
  console.log(id)
  dbPromised.
  then(function (db) {
    var tx = db.transaction("articles", "readwrite");
    var store = tx.objectStore("articles");
    store.delete(parseInt(id));
    return tx.complete;
  }).then(function () {
    console.log("Tim berhasil di hapus");           
    M.toast({html: 'Tim Berhasil di Hapus', classes: 'rounded'});
    setTimeout(function(){ }, 8000);
    window.location.reload(); 
  })
    .catch(function () {
      console.error("Tim gagal dihapus.");
    });
}