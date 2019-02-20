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
    let clean = url.substring(0, url.indexOf("#"));
    window.history.replaceState({}, document.title, clean);

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
    getData("https://dog.ceo/api/breeds/" + myDog + "/ image/random")
    .then(res => reqListener(res))
    getData("https://dog.ceo/api/breeds/" + myDog +"/list")
    .then(res => getSubBreed(res));
  }

  function subBreed(e){
    if (e === window.location.hash) {
      getData("https://dog.ceo/api/breeds/" + myDog + "/" + breed +  "/image/random")
    }
    else {breed = e.textContent};
    getData("https://dog.ceo/api/breeds/" + myDog + "/" + breed + "/image/random")
    .then(res => reqListener(res))
    .catch(error => console.error("Error:", error));
  }

  function buildList (data){
    let obj = data.message;
    for (let key in obj) {
      let li = document.createElement("li");
      let a =document.createElement("a");
      a.textContent = (key);
      a.setAttribute("href", "#" + key);
      a.setAttribute("onClick", "randomdogs(this)");
      div.appendChild(li);
      li.appendChild(a);
    }
    }

    function getSubBreed(obj){
      while (subbreeddog.firstChild) {
        subbreeddog.removeChild(subbreeddog.firstChild);
      }
      let data = obj;
      let h2 = document.createElement("h2");
      h2.textContent = myDog + "sub Breeds:";
      let ul = document.createElement("ul");
      ul.setAttribute("id", "subBreedUl");
      if (data.length !== 0) {
        subbreeddog.appendChild(h2);
      }
      subbreeddog.appendChild(ul);
      let array;
      for (let key in data) {
        array = data[key];
      }
      for (let i = 0; i < array.length; i++) {
        let li = document.createElement("li");
        let element = document.createElement("a");
        element.setAttribute("href", "#" + myDog + "/" + array[i]);
        element.setAttribute("onClick", "subBreed(this)");
        element.textContent = (array[i]);
        ul.appendChild(li);
        li.appendChild(a);

      }
    }

    allBreeds();
    getRandomDog();
