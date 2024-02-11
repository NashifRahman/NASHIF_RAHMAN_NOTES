//inisialisasi yang diperlukan
const add = document.querySelector(".add");
const main = document.querySelector(".main");
const tambah = document.querySelector(".tambah-notes");
let batas = 0;
var isi;
const logo = document.querySelector(".logo");


logo.addEventListener("click", function () {
  main.innerHTML = `<h2>No Recent Notes</h2><p>Consider to make one</p>`;
  batas = 0;
  // tambah.innerHTML = "";
  main.style.margin ="auto";
  main.style.textAlign="center";
});


// untuk menambahkan nota dan melakukan edit pada nota
add.addEventListener("click", function () {
  if(batas<4){
    listItem();
  }else{
    alert(`sudah tidak bisa menambah catatan`);
  }
  isi.addEventListener("click",function(){
  edit();
});
});


//function untuk menambahkan list item
function listItem(){
  batas ++;
  isi = document.createElement("li");
  isi.style.border = "none";
  isi.innerHTML=`<div class="nota">
    <i class="fa-regular fa-pen-to-square" style="font-size: 30px;"></i>
    <h2>Notes ${batas}</h2>
    </div>`;
  tambah.appendChild(isi);
}

//fungsi edit
function edit(){
  main.innerHTML=`<div class="isiNota">
          <input type="text" class="title" placeholder="Notes Title" />
          <input type="text" class="sub-title" placeholder="Sub Title" />
          <div class="text">
            <textarea placeholder="Type Something" cols="70"></textarea>
          </div>
        </div>
        <div class="btn">
            <button class="btn-1">Save Note</button>
            <button class="btn-2">Discard</button>
          </div>`;
  main.style.margin ="0";
  main.style.textAlign="start";
  resize();
}

//fungsi resize textarea
function resize(){
  const textArea = document.querySelector("textarea");
  textArea.addEventListener("input",e=>{
    textArea.style.overflow="hiddden";
    textArea.style.height= `auto`;
    let scHeight = e.target.scrollHeight;
    textArea.style.height= `${scHeight}px`;
  })
}
