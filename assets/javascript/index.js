window.addEventListener("load", (event) => {
  menuMouseInHover()
  menuMouseOutHover()
  //   fetchUserData()
  accessLocalStorage()
  //   localStorage.clear()

  //   fetchHeadlineData()
  setTimeout(() => {
    hideSplashPage()
    showHomePage()
  }, 3000)
})

const accessLocalStorage = () => {
  const headlines = Headlines.getHeadlinesArray()

  const newsBody = document.getElementById("news-body")
  let imgUrl

  for (let item of headlines) {
    const headlineContainer = document.createElement("div")
    headlineContainer.setAttribute("class", "headline-container")
    if (item.image !== undefined) {
      console.log(item.image)
      imgUrl = item.image.thumbnail.contentUrl
    } else {
      imgUrl = "./assets/img/no-image.jpg"
    }
    const imgDiv = document.createElement("img")
    imgDiv.setAttribute("src", imgUrl)
    imgDiv.setAttribute("alt", "image")
    headlineContainer.appendChild(imgDiv)

    // insert text
    const storyTextDiv = document.createElement("div")
    storyTextDiv.setAttribute("class", "story-text-div")
    const storyText = document.createElement("div")
    storyText.setAttribute("class", "story-text")
    storyText.innerText = item.name
    storyTextDiv.appendChild(storyText)
    headlineContainer.appendChild(storyTextDiv)

    newsBody.appendChild(headlineContainer)
    // console.log("item provider:", item.provider[0].name)
    console.log("item provider:", item.name)
  }
}

const URL =
  "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw"

const fetchHeadlineData = () => {
  fetch(URL, {
    method: "GET",
    headers: {
      "x-bingapis-sdk": "true",
      "x-rapidapi-key": "66c41eb2b5msh73e529070e498c5p13b8b5jsnca0466f826e3",
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((data) => assignHeadlines(data.value))
    .catch((err) => {
      console.error(err)
    })
}

let headlinesArray = []

const assignHeadlines = (headlinesData) => {
  Headlines.addHeadLinesArray(headlinesData)
}

const hideSplashPage = () => {
  const splashPage = document.getElementById("splash-page-container")
  splashPage.classList.add("splash-page-hide")
}

const showHomePage = () => {
  const homePage = document.getElementById("home-page")
  homePage.classList.add("home-page-show")
}

// const fetchUserData = () => {
//   fetch("http://localhost:3000/api/v1/favorites").then((resp) =>
//     resp.json().then((data) => console.log(data))
//   )
// }

const menuMouseInHover = () => {
  const menuDiv = document.getElementById("menu-div")
  menuDiv.addEventListener("mouseover", () => {
    for (let item of menuDiv.children) {
      item.classList.add("menu-hover")
    }
  })
}

const menuMouseOutHover = () => {
  const menuDiv = document.getElementById("menu-div")
  menuDiv.addEventListener("mouseleave", () => {
    for (let item of menuDiv.children) {
      item.classList.remove("menu-hover")
    }
  })
}

// Headlines Class
class Headlines {
  static getHeadlinesArray() {
    let headlinesArray

    if (localStorage.getItem("headlinesArray") === null) {
      headlinesArray = []
    } else {
      // JSON.parse converts a string into an object
      headlinesArray = JSON.parse(localStorage.getItem("headlinesArray"))
    }
    return headlinesArray
  }

  static addHeadLinesArray(headlinesData) {
    // JSON stringify converts an object to a string
    localStorage.setItem("headlinesArray", JSON.stringify(headlinesData))
  }

  // Remove selections
  static removeHeadlines(index) {
    const headlines = Headlines.getHeadlinesArray()
    headlines = []
    localStorage.setItem("headlinesArray", JSON.stringify(headlines))
  }
}
