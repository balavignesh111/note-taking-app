'use script';

// select elements

const addNoteEle = document.querySelector('.add-note');

const containerEle = document.querySelector('.container');

// popup title and description
const popUpContainer = document.querySelector('.pop-up');

const titleEle = document.querySelector('.title-inp');

const descriptionEle = document.getElementById('description-inp');

const popUpHeadingEle = document.querySelector('.heading');

// close and add note btn
const closeBtn = document.querySelector('.close-icon');

const addBtn = document.querySelector('.add-btn');

// edit and delete btn
const displayTitle = document.querySelector('.title-data');

const displayDescription = document.querySelector('.description-data');

const displayDate = document.querySelector('.time');

const editBtn = document.querySelector('.edit');

const deleteBtn = document.querySelector('.delete');

// gv
let dataBase = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
let isEditable = false;
let isEmpty = false;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let editId = "";

// functions
function init(){
  popUpContainer.style.display = "none";
  descriptionEle.value = "";
  titleEle.value = "";
  popUpHeadingEle.innerText = `Add a New Note`;
  addBtn.innerText = `Add Note`;
  isEmpty = false;
  isEditable = false;
  addDataToDOM();
}

// date format
const dateFormat = ()=>{
  const date = new Date();
  return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
}

// validation
const validate = ()=>{
  if(titleEle.value === "" && descriptionEle.value === ""){
    isEmpty = true;
  }
}

/* add data to db*/
const addNotes = ()=>{
  validate();
  /* adding data to db array */
  if(!isEditable && !isEmpty){
    let obj = {};
    obj["id"] = Date.now();
    obj["title"] = titleEle.value;
    obj["description"] = descriptionEle.value;
    obj["lastModified"] = dateFormat();
    dataBase.unshift(obj);
  }else if(isEditable){
    /* edited data is added to db array */
    dataBase.forEach((ele)=>{
      if(ele.id === editId){
        ele.title = titleEle.value;
        ele.description = descriptionEle.value;
        ele.lastModified = dateFormat();
      }
    })
  }else{
    isEmpty = false;
    return;
  }
  localStorage.setItem('data',JSON.stringify(dataBase));
  addDataToDOM();
}

/* remove element */
const removeElement = ()=>{
  let listEle = document.querySelectorAll('.note.added-notes');
  for(let i=0;i<listEle.length;i++){
    listEle[i].remove();
  }
  console.log(listEle);
}

// adding data to DOM
const addDataToDOM = () =>{
  removeElement();
  if(dataBase.length > 0){
    dataBase.forEach((ele)=>{
      const noteEle = document.createElement('div');
      noteEle.setAttribute('class','note added-notes');
      noteEle.innerHTML = `
    <div class="content">
      <div class="title-data">${ele.title}</div>
      <div class="description-data">${ele.description}</div>
    </div>
    <div class="footer">
      <div class="time">
        ${ele.lastModified}
      </div>
      <div class="footer-btn">
        <button class="edit" onclick="editData(${ele.id})">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="delete" onclick="deleteData(${ele.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
      `;
      containerEle.appendChild(noteEle);
    })
  }
  console.log(dataBase)
}

// edit data function
const editData = (id)=>{
  isEditable = true;
  popUpHeadingEle.innerText = `Editing a Note`;
  addBtn.innerText = `Edit Note`;
  popUpContainer.style.display = "flex";
  editId = id;
  fetchId(id);
}

// fetching id from data base
const fetchId = (id) =>{
  dataBase.forEach((ele)=>{
    if(ele.id == id){
      titleEle.value = ele.title;
      descriptionEle.value = ele.description;
    }
  })
}

// delete data function
const deleteData = (id)=>{
  let result = confirm('Are you sure you want to delete this note?')
  if(result){
    dataBase = dataBase.filter((ele)=>{
      return ele.id !== id;
    })
    // deleted data is removed from local storage
    localStorage.setItem('data',JSON.stringify(dataBase));
    addDataToDOM();
    init();
  }
}



// eventlistener
// to show popup
addNoteEle.addEventListener('click',()=>{
  popUpContainer.style.display = "flex";
})

// to add data to db
addBtn.addEventListener('click',()=>{
    addNotes();
    init();
})

// close btn
closeBtn.addEventListener('click',()=>{
  init();
})


// init
init();