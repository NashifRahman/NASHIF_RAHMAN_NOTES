// inisialisasi yang diperlukan
const add = document.querySelector(".add");
const main = document.querySelector(".main");
const tambah = document.querySelector(".tambah-notes");
let batas = 0;
let isi;
const logo = document.querySelector(".logo");
let listID = [];

// untuk kembali ke halaman utama
logo.addEventListener("click", function () {
  main.innerHTML = `<h2>No Recent Notes</h2><p>Consider making one</p>`;
  main.style.margin = "auto";
  main.style.textAlign = "center";
});

// untuk menambahkan nota dan melakukan edit pada nota
add.addEventListener("click", function () {
  if (batas < 4) {
    listItem();
  } else {
    alert(`sudah tidak bisa menambah catatan`);
  }
});

renderList();

//fungsi GET untuk mengambil data yang ada di database
async function renderList() {
  const response = await fetch('http://localhost:3000/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { data } = await response.json();
  batas = data.length;
  listID = data.map(item => item.id);
  for (let i = 0; i < data.length; i++) {
    isi = document.createElement("li");
    const noteId = `${data[i].id}`;
    isi.id = noteId;
    isi.style.border = "none";
    isi.innerHTML = `<div class="nota">
        <i class="fa-regular fa-pen-to-square" style="font-size: 30px;"></i>
        <h2>Notes ${i + 1}</h2>
        </div>`;
    tambah.appendChild(isi);
  }
  console.log(listID);
  for (let i = 0; i < batas; i++) {
    console.log(listID[i]);
    document.getElementById(listID[i] + '').addEventListener("click", function () {
      edit(listID[i]);
    });
  }
}


// function untuk menambahkan list item
function listItem() {
  batas++;
  isi = document.createElement("li");
  const noteId = `${batas}`;
  isi.id = noteId;
  isi.style.border = "none";

  // Membuat objek untuk dikirim sebagai payload POST
  const postData = {
    judul: "",
    subjudul: "",
    text: "",
  };
  fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Respon dari server:', data);
      // Menampilkan kembali halaman utama setelah melakukan POST
      main.innerHTML = `<h2>No Recent Notes</h2><p>Consider making one</p>`;
      main.style.margin = 'auto';
      main.style.textAlign = 'center';
    })
    .catch((error) => {
      console.error('Terjadi kesalahan:', error);
    });
  isi.innerHTML = `<div class="nota">
    <i class="fa-regular fa-pen-to-square" style="font-size: 30px;"></i>
    <h2>Notes ${batas}</h2>
    </div>`;
  tambah.appendChild(isi);
}

// fungsi edit
async function edit(idAngka) {
  console.log(idAngka);
  const response = await fetch('http://localhost:3000/?id='+idAngka, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { id: idAngka },
  });
  const { data } = await response.json();
  console.log(data);
  // cek data null atau tidak
  var values = data ? data[0] : { judul: null, subjudul: null, text: null };

  // Gunakan nilai default jika judul, subjudul, atau text adalah null atau undefined
  var judulValue = values.judul !== null && values.judul !== undefined ? values.judul : "";
  var subjudulValue = values.subjudul !== null && values.subjudul !== undefined ? values.subjudul : "";
  var textValue = values.text !== null && values.text !== undefined ? values.text : ""; 
  main.innerHTML = `<div class="isiNota">
          <input type="hidden" class="idAngka" value="${idAngka}">
          <input type="text" class="title" placeholder="Notes Title" value="${judulValue}"/>
          <input type="text" class="sub-title" placeholder="Sub Title" value="${subjudulValue}"/>
          <div class="text">
            <textarea placeholder="Type Something" cols="70" rows="10">${textValue}</textarea>
          </div>
        </div>
        <div class="btn">
            <button class="btn-1">Save Note</button>
            <button class="btn-2">Discard</button>
          </div>`;
  main.style.margin = "0";
  main.style.textAlign = "start";
  resize();
}

// fungsi resize textarea
function resize() {
  const textArea = document.querySelector("textarea");
  textArea.addEventListener("input", e => {
    textArea.style.overflow = "hidden";
    textArea.style.height = `auto`;
    let scHeight = e.target.scrollHeight;
    textArea.style.height = `${scHeight}px`;
  });
}

// fungsi simpan menggunakan POST
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-1')) {
    const id = document.querySelector('.idAngka').value;
    const title = document.querySelector('.title').value;
    const subTitle = document.querySelector('.sub-title').value;
    const content = document.querySelector('textarea').value;
    const postData = {
      id: id,
      judul: title,
      subjudul: subTitle,
      text: content,
    };
    fetch('http://localhost:3000/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respon dari server:', data);
        main.innerHTML = `<h2>No Recent Notes</h2><p>Consider making one</p>`;
        main.style.margin = 'auto';
        main.style.textAlign = 'center';
      })
      .catch((error) => {
        console.error('Terjadi kesalahan:', error);
      });
  }
});


//percobaan DELETE
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-2')) {
    const id = document.querySelector('.idAngka').value;
    const title = document.querySelector('.title').value;
    const subTitle = document.querySelector('.sub-title').value;
    const content = document.querySelector('textarea').value;
    const postData = {
      id: id,
      judul: title,
      subjudul: subTitle,
      text: content,
    };
    fetch('http://localhost:3000', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respon dari server:', data);
        main.innerHTML = `<h2>No Recent Notes</h2><p>Consider making one</p>`;
        main.style.margin = 'auto';
        main.style.textAlign = 'center';
      })
      .catch((error) => {
        console.error('Terjadi kesalahan:', error);
      });
  }
});