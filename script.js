const form = document.querySelector("form");
let url = "https://source.unsplash.com/1920x1080/?";
const renderImageWrap = document.querySelector(".render-image-wrap");

const body = document.body
let spin = document.createElement("div");
spin.className = 'spin';


form.addEventListener("submit", submitForm, false )

function submitForm(e) {
  e.preventDefault()
  loadSpinner();
  let formData = new FormData(form);
  let image = formData.get("search");
  getImageData(image);
  form.reset();

}

async function getImageData(img) {
try {
  let res = await fetch(url + img);
  let src = res.url
  createImage(img, src);
} catch(error) {
  console.warn(error);
}

}
function createImage(imgName, imgUrl) {
  const imageContainer = document.createElement("div");
  const imageTag = document.createElement("img");
  const deleteImg = document.createElement("spa");
  const a = document.createElement("a");

  deleteImg.setAttribute("onclick", "deleteImg(this)");
  deleteImg.innerHTML = "&Cross";
  deleteImg.className = "deleteImg";

  a.className = "link";
  a.href = imgUrl


  imageTag.title = imgName;
  imageTag.src = imgUrl;
  imageContainer.className = 'render-image';
  imageContainer.dataset.query = imgName

 imageTag.onload = e =>  {
 closeSpinner();
 renderImageWrap.appendChild(imageContainer)
 imageContainer.appendChild(a)
 a.appendChild(imageTag)
 open_Close_Modal(a)
 imageContainer.appendChild(deleteImg)

 } 

}

function deleteImg(img) {
  img.parentElement.remove()
}

function open_Close_Modal(img) {
  let modal = document.querySelector(".modal");

  
img.onclick = e => {
  e.preventDefault()
  let src = e.target.src;
  modal.parentElement.classList.add("zoom");
  modal.classList.add("zoom");
  modal.children[0].src = src;
  createDowloadBtn(modal, src)
}

modal.onclick = e => {
  if(modal.classList.contains("zoom")) {
    modal.children[1].remove();
    modal.classList.remove("zoom");
    modal.parentElement.classList.remove("zoom")
  } else {
    createDowloadBtn(modal, modal.children[0].src)
  }


}



}

function createDownloadBtn(modal, link) {
  let download = document.createAttribute("a");
  let icon = document.createElement("i");

  let str = /\?./g
  let regex = link.replace(str, "")


  download.className = "download";
  download.document = "your-image.jpg";
  download.setAttribute("href", regex);
  download.setAttribute("target", "_blank");
  icon.className = "fas fa-download fa-4x";


  download.appendChild(icon);
  modal.appendChild(download);



}

function loadSpinner() {
  body.appendChild(spin)
}



function closeSpinner() {
  spin.classList.add("hide");
}


