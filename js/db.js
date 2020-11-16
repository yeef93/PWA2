const dbPromised = idb.open("bebo", 25, function (upgradeDb) {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("teams_id", "id", { unique: false });
});

function saveForLater(data) {
  console.log(data)
  dbPromised
    .then(function (db) {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
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
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
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
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
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
    const tx = db.transaction("teams", "readwrite");
    const store = tx.objectStore("teams");
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