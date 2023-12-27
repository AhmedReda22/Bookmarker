var siteNameInput= document.getElementById("siteName");
var siteUrlInput= document.getElementById("siteUrl");
var closeBtn= document.getElementById("closeBtn")

var sitesList=[];
if(localStorage.getItem("sites")){
    sitesList=JSON.parse(localStorage.getItem("sites"));
    displaySites();
}


document.getElementById("box").style.display = "none"; 
function submit(){
    if (check(siteNameInput.value) && check2(siteUrlInput.value)) {
        addSites();
        displaySites();
        clearSites();
        resetStyles()
    } else {
        document.getElementById("box").style.display = "flex"; 
        
    }
}

function addSites(){
    var sites={
        name:siteNameInput.value,   
        url:siteUrlInput.value
    }
    sitesList.push(sites);
    localStorage.setItem("sites",JSON.stringify(sitesList));
}

function displaySites(){
    var cartona="";
    for(var i=0; i<sitesList.length;i++){
        cartona+=`
        <tr>
        <td>${i}</td>
        <td>${sitesList[i].name}</td>
        <td>
          <button class="visit-btn btn border-0 btn-success">
            <i class="fa-solid fa-eye"></i> <a href="${sitesList[i].url}" target="_blank">Visit</a>
          </button>
        </td>
        <td>
          <button class="update-btn btn border-0 btn-warning" onclick="updateSites(${i})">
          <i class="fa-regular fa-pen-to-square"></i> Update
          </button>
        </td>
        <td>
          <button class="delete-btn btn border-0 btn-danger" onclick="deleteSites(${i})">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </td>
      </tr>    
        `
    }
    document.getElementById("tbody").innerHTML=cartona;
}

function clearSites(){
    siteNameInput.value="";
    siteUrlInput.value="";
}

function deleteSites(index){
    sitesList.splice(index,1);
    localStorage.setItem("sites",JSON.stringify(sitesList));
    displaySites();
}

var sitesIndex=0;
function updateSites(index){
    sitesIndex=index;
    siteNameInput.value=sitesList[index].name;
    siteUrlInput.value=sitesList[index].url;
    window.scrollTo(0,0);
    document.getElementById("update").style.display="block";
    document.getElementById("submit").style.display="none";
}

function showUpdate(){
    document.getElementById("update").style.display="none";
    document.getElementById("submit").style.display="block";
    sitesList[sitesIndex].name=siteNameInput.value;
    sitesList[sitesIndex].url=siteUrlInput.value;
    localStorage.setItem("sites",JSON.stringify(sitesList));
    displaySites();
    clearSites();
}

function check(word){
    var regex= /^[a-zA-Z0-9]{3,}$/
    return regex.test(word);    
}
function check2(word){
    var regex= /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
    return regex.test(word);    
}

function closeBox(){
    document.getElementById("box").style.display = "none"; 
}
function search(value){
    var cartona=``;
    for(var i=0; i<sitesList.length; i++){
        if(sitesList[i].name.toLowerCase().includes(value.toLowerCase())){
            cartona+=`
            <tr>
            <td>${i}</td>
            <td>${sitesList[i].name.replace(value,`<span>${value}</span>`)}</td>
            <td>
              <button class="visit-btn btn border-0 btn-success">
                <i class="fa-solid fa-eye"></i> <a href="${sitesList[i].url}" target="_blank">Visit</a>
              </button>
            </td>
            <td>
              <button class="update-btn btn border-0 btn-warning" onclick="updateSites(${i})">
              <i class="fa-regular fa-pen-to-square"></i> Update
              </button>
            </td>
            <td>
              <button class="delete-btn btn border-0 btn-danger" onclick="deleteSites(${i})">
                <i class="fa-solid fa-trash-can"></i> Delete
              </button>
            </td>
          </tr>    
            `
        }
    }
    document.getElementById("tbody").innerHTML=cartona;
}


siteNameInput.addEventListener("input", function() {
  if (!check(siteNameInput.value)) {
      siteNameInput.style.boxShadow = "0 0 0 0.20rem rgba(211, 8, 32, 0.5)";
      document.getElementById("iconError2").style.display = "block"; 
      document.getElementById("nameVaild").style.display = "block"; 
  } else {
      siteNameInput.style.boxShadow = "0 0 0 0.20rem #fac7b4";
      document.getElementById("iconError2").style.display = "none"; 
      document.getElementById("iconCorrect2").style.display = "block"; 
      siteNameInput.style.boxShadow = "0 0 0 0.20rem rgba(25, 135, 84, 0.6)";
      document.getElementById("nameVaild").style.display = "none"; 
  }
});

siteUrlInput.addEventListener("input", function() {
  if (!check2(siteUrlInput.value)) {
      siteUrlInput.style.boxShadow = "0 0 0 0.20rem rgba(211, 8, 32, 0.5)";
      document.getElementById("iconError").style.display = "block"; 
      document.getElementById("urlVaild").style.display = "block"; 
  } else {
      siteUrlInput.style.boxShadow = "0 0 0 0.20rem #fac7b4";
      document.getElementById("iconError").style.display = "none"; 
      document.getElementById("iconCorrect").style.display = "block"; 
      siteUrlInput.style.boxShadow = "0 0 0 0.20rem rgba(25, 135, 84, 0.6)";
      document.getElementById("urlVaild").style.display = "none"; 
  }
});

function resetStyles() {
  siteNameInput.style.boxShadow = "0 0 0 0.20rem #fac7b4";
  siteUrlInput.style.boxShadow = "0 0 0 0.20rem #fac7b4";
  document.getElementById("iconError2").style.display = "none";
  document.getElementById("iconCorrect2").style.display = "none";
  document.getElementById("iconError").style.display = "none";
  document.getElementById("iconCorrect").style.display = "none";
  document.getElementById("nameVaild").style.display = "none";
  document.getElementById("urlVaild").style.display = "none";
}

