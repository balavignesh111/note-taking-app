'use script';

// select elements

const addNoteEle = document.querySelector('.add-note');

const containerEle = document.querySelector('.container');

// popup title and description
const popUpContainer = document.querySelector('.pop-up');

const titleEle = document.querySelector('.title-inp');

const descriptionEle = document.getElementById('description-inp');

const popUpHeadingEle = document.querySelector('heading');

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
let dataBase = [];
let isEditable = false;
let isValidated = false;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// functions
function init(){
  popUpContainer.style.display = "none";
  descriptionEle.value = "";
  titleEle.value = "";
}

// date format
const dateFormat = ()=>{
  const date = new Date();
  return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} `
}

// validation
const validate = ()=>{
  if(titleEle.value === "" && descriptionEle.value === ""){
    isValidated = true;
  }
}

/* add data to db*/
const addNotes = ()=>{
  let obj = {};
  validate();
  if(!isValidated){
    obj["id"] = Date.now();
    obj["title"] = titleEle.value;
    obj["description"] = descriptionEle.value;
    obj["createdAt"] = dateFormat();
    dataBase.unshift(obj);
  }
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
        ${ele.createdAt}
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
  init();
  console.log(dataBase)
}

// delete data 
const deleteData = (id)=>{
  let result = confirm('Are you sure you want to delete this note?')
  if(result){
    dataBase = dataBase.filter((ele)=>{
      return ele.id !== id;
    })
    addDataToDOM();
  }
}



// eventlistener
// to show popup
addNoteEle.addEventListener('click',()=>{
  popUpContainer.style.display = "flex";
})

// to add data to db
addBtn.addEventListener('click',()=>{
  if(isEditable){

  }else{
    addNotes();
  }
})

closeBtn.addEventListener('click',()=>{
  popUpContainer.style.display = "none";
})

// init
init();