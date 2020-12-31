window.addEventListener("load", (event) => {
  // localStorage.clear()
  clearNewBodyHtml()
  // fetchHeadlineData()
  accessLocalStorage()

  navbarExpandListener()
  menuOnClick()
  bookMarkListener()

  showLoginListener()
  //   fetchUserData()

  // searchIconListener()
  // closeSearchWindowListener()

  setTimeout(() => {
    hideSplashPage()
    showHomePage()
  }, 3000)
})

// const closeSearchWindowListener = () => {
//   const closeSearchWindow = document.getElementById("search-window-close")
//   closeSearchWindow.addEventListener("click", () => {
//     const searchWindow = document.getElementById("search-window")
//     searchWindow.classList.remove("search-window-expand")
//   })
// }

// const searchIconListener = () => {
//   const searchIcon = document.getElementById("nav-search-icon")
//   searchIcon.addEventListener("click", () => {
//     const searchWindow = document.getElementById("search-window")
//     searchWindow.classList.add("search-window-expand")
//   })
// }

const showLoginListener = () => {
  const loginDiv = document.getElementById("login")
  loginDiv.addEventListener("click", () => {
    hideNewBody()
    closeNavbarExpansion()
    resetMenu()
  })
}

const resetMenu = () => {
  const menuDiv = document.getElementById("menu-div")
  for (let item of menuDiv.children) {
    item.classList.toggle("menu-hover")
  }
}

const closeNavbarExpansion = () => {
  const navBar = document.getElementById("navbar")
  navBar.classList.remove("navbar-expand")
}

const hideNewBody = () => {
  const newsBodyDiv = document.getElementById("news-body")
  newsBodyDiv.classList.add("news-body-hide")
}

const bookMarkListener = () => {
  bookMarkDivs = document.getElementsByClassName("bookmark-div")
  for (let item of bookMarkDivs) {
    item.addEventListener("click", (e) => {
      showBookmarkSelected(item)
      const markedStoryId = e.target.dataset.id
      findStory(markedStoryId)
    })
  }
}

const showBookmarkSelected = (item) => {
  item.classList.toggle("bookmark-div-selected")
}

const navbarExpandListener = () => {
  const menuDiv = document.getElementById("menu-div")
  menuDiv.addEventListener("click", () => {
    const navBar = document.getElementById("navbar")
    navBar.classList.toggle("navbar-expand")
  })
}

const menuOnClick = () => {
  const menuDiv = document.getElementById("menu-div")
  menuDiv.addEventListener("click", () => {
    for (let item of menuDiv.children) {
      item.classList.toggle("menu-hover")
    }
  })
}

const clearNewBodyHtml = () => {
  const newsBody = document.getElementById("news-body")
  newsBody.innerText = ""
}

const accessLocalStorage = () => {
  const headlines = Headlines.getHeadlinesArray()

  const newsBody = document.getElementById("news-body")
  let imgUrl

  for (let item in headlines) {
    const headlineContainer = document.createElement("div")
    headlineContainer.setAttribute("class", "headline-container")
    if (item == 0) {
      headlineContainer.setAttribute("id", "headline-container-first")
    }
    if (headlines[item].image !== undefined) {
      imgUrl = headlines[item].image.thumbnail.contentUrl
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
    const date = headlines[item].datePublished

    const event = new Date(date)
    let stringEvent = event.toString()

    stringEvent = stringEvent.split(" ").slice(0, 4).join(" ")

    // date-bookmark-div
    const dateBookMarkDiv = document.createElement("div")
    dateBookMarkDiv.setAttribute("class", "date-bookmark-div")

    // bookmark
    const bookMarkDiv = document.createElement("div")
    bookMarkDiv.setAttribute("class", "bookmark-div")
    bookMarkDiv.setAttribute("data-id", item)

    const dateDiv = document.createElement("div")
    dateDiv.setAttribute("class", "date-div")
    dateDiv.innerText = `Date: ${stringEvent}`

    // put date and book mark into date-bookmark-div
    dateBookMarkDiv.appendChild(dateDiv)
    dateBookMarkDiv.appendChild(bookMarkDiv)

    const borderDiv = document.createElement("div")
    borderDiv.setAttribute("class", "border-div")

    storyText.innerText = headlines[item].name.substring(0, 70) + "..."
    const provider = document.createElement("div")
    provider.setAttribute("class", "provider")
    provider.innerText = `Source: ${headlines[item].provider[0].name}`
    storyTextDiv.appendChild(dateBookMarkDiv)
    storyTextDiv.appendChild(storyText)
    storyTextDiv.appendChild(provider)
    headlineContainer.appendChild(storyTextDiv)

    newsBody.appendChild(headlineContainer)
    newsBody.appendChild(borderDiv)
  }
}

const configFile = config.MY_KEY
const URL =
  "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw"

const fetchHeadlineData = () => {
  fetch(URL, {
    method: "GET",
    headers: {
      "x-bingapis-sdk": "true",
      "x-rapidapi-key": configFile,
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

const findStory = (markedStoryId) => {
  const headlines = Headlines.getHeadlinesArray()
  let headLinesObj
  for (let item in headlines) {
    if (item === markedStoryId) {
      headLinesObj = headlines[item]
    }
  }
  // Assign image Url
  let imageUlr
  if (headLinesObj.image !== null) {
    imageUrl = headLinesObj.image.thumbnail.contentUrl
  } else {
    imageUlr = "./assets/img/no-image.jpg"
  }

  // Create config object
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      credentials: "same-origin",
    },
    body: JSON.stringify({
      title: headLinesObj.name,
      date_published: headLinesObj.datePublished,
      description: headLinesObj.description,
      image: imageUrl,
      provider: headLinesObj.provider[0].name,
      url: headLinesObj.url,
    }),
  }
  postRequestFavorite(configObj)
}

const postRequestFavorite = (configObj) => {
  // console.log(configObj.body)
  const apiUrl = "http://localhost:3000/api/v1/favorites"
  fetch(apiUrl, configObj)
    .then((response) => response.json())
    .then((data) => console.log(data.data.attributes))
}

// const fetchUserData = () => {
//   fetch("http://localhost:3000/api/v1/favorites").then((resp) =>
//     resp.json().then((data) => console.log(data))
//   )
// }

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
