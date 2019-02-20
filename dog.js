let div = document.querySelector(".dogList");
let subbreeddog = document.querySelector(".subbreddog");
const button = document.querySelector("#randombutton");

let myDog;
let breed;

button.addEventListener("click", function(){
  if (window.location.hash.includes("/")) {
    subBreed (window.location.hash)
  }
  else if (window.location.hash) {
    randomBreedImg(window.location.hash)
  }
  else {getRandomDog()};
});

function myFunction(){
  let url = window.location.toString();
  if (url.indexOf("#") > 0) {
    let clean_url = url.substring(0, url.indexOf("#"));
    window.history.replaceState({}, document.title, clean_url);

  }
  getRandomDog();
}

function getData(url) {
  return fetch(url)
  .then(response => response.json())
  .then(response => {return response})
  .catch(error => console.error('Error:', error));
}

function reqListener(data){
  let picture = document.querySelector("#randomdogs");
  picture.src = data.message;
}

function getRandomDog(){
  getData("https://dog.ceo/api/breeds/image/random")
  .then(res => reqListener(res))
  .catch(error => console.error("Error:", error));
}

function allBreeds (){
  getData("https://dog.ceo/api/breeds/list/all")
  .then(res => buildList(res))
  .catch(error => console.error("Error:", error));
}

function randomBreedImg(e){
  if (e === window.location.hash) {
    let str = e
      myDog = str.replace("#","");
    }
    else {myDog = e.textContent};
    getData("https://dog.ceo/api/breed/" + myDog + "/ images/random")
    .then(res => reqListener(res))
    getData("https://dog.ceo/api/breed/" + myDog +"/list")
    .then(res => getSubBreed(res));
  }

  function subBreed(e){
    if (e === window.location.hash) {
      getData("https://dog.ceo/api/breed/" + myDog + "/" + breed +  "/images/random")
    }
    else {breed = e.textContent};
    getData("https://dog.ceo/api/breed/" + myDog + "/" + breed + "/images/random")
    .then(res => reqListener(res))
    .catch(error => console.error("Error:", error));
  }

  function buildList (data){
    let obj = data.message;
    for (let key in obj) {
      let li = document.createElement("li");
      let aTag =document.createElement("a");
      aTag.textContent = (key);
      aTag.setAttribute("href", "#" + key);
      aTag.setAttribute("onClick", "randomdogs(this)");
      div.appendChild(li);
      li.appendChild(aTag);
    }
    }

    function getSubBreed(obj){
      while (subbreeddog.firstChild) {
        subbreeddog.removeChild(subbreeddog.firstChild);
      }
      let data = obj;
      let h2 = document.createElement("h2");
      h2.textContent = myDog + "sub Breeds:";
      let ulTag = document.createElement("ul");
      ulTag.setAttribute("id", "subBreedUl");
      if (data.length !== 0) {
        subbreeddog.appendChild(h2);
      }
      subbreeddog.appendChild(ulTag);
      let array;
      for (let key in data) {
        array = data[key];
      }
      for (let i = 0; i < array.length; i++) {
        let li = document.createElement("li");
        let Atag = document.createElement("a");
        Atag.setAttribute("href", "#" + myDog + "/" + array[i]);
        Atag.setAttribute("onClick", "subBreed(this)");
        Atag.textContent = (array[i]);
        ulTag.appendChild(li);
        li.appendChild(aTag);

      }
    }

    allBreeds();
    getRandomDog();
