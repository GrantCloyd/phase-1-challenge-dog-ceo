const breedDropDown = document.querySelector("#breed-dropdown")
breedDropDown.addEventListener("change", filterBreeds)

function getData(stringURL) {
   return fetch(`https://dog.ceo/api/breeds/${stringURL}`)
      .then(resp => resp.json())
      .then(data => data)
}

function createDogStuff(dog, type) {
   if (type === "img") {
      const imageLoc = document.querySelector("#dog-image-container")
      let dogImage = document.createElement("img")
      dogImage.src = dog
      imageLoc.append(dogImage)
   }
   if (type === "li") {
      const ulLoc = document.querySelector("#dog-breeds")
      let li = document.createElement("li")
      li.innerHTML = dog
      li.addEventListener("click", () => (li.style.color = "teal"))
      ulLoc.append(li)
   }
}

// a filter with a string variable through interpolation
// that takes the value of the button -- that would probably mean you don't need a switch case at all

function filterBreeds(e) {
   let value = e.target.value
   const dogSearch = document.querySelector("#dog-breeds")
   dogSearch.innerHTML = ""
   getData("list/all").then(data => {
      let dogNameObj = data.message
      dogNameArr = Object.keys(dogNameObj)
      dogNameArr.filter(dog => dog.startsWith(`${value}`)).map(dog => createDogStuff(dog, "li"))
   })
}

function init() {
   getData("image/random/4").then(data => {
      let dogArr = Array.from(data.message)
      dogArr.map(dog => createDogStuff(dog, "img"))
   })
   getData("list/all").then(data => {
      let dogNameObj = data.message
      for (dog in dogNameObj) {
         createDogStuff(dog, "li")
      }
   })
}

init()
