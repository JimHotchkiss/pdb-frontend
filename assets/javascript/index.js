window.addEventListener("load", (event) => {
  // localStorage.clear()
  // clearNewBodyHtml()
  // fetchHeadlineData()

  // checkUserLogin()

  navbarExpandListener()
  menuOnClick()
  displayLoginOrLogout()

  favoritesListener()

  showLoginListener()
  showCreateUserListener()
  userLoginListener()
  userLogoutListener()
  createUserListener()
  populateDOMWithHeadlines()
  //   fetchUserData()

  hideSplashPage()
  showHomePage()
})

const displayLoginOrLogout = () => {
  const currentUser = User.getUserLogin()
  if (currentUser !== null) {
    const loginDiv = document.getElementById("login")
    loginDiv.classList.add("login-text-hide")
    const logoutDiv = document.getElementById("logout")
    logoutDiv.classList.remove("logout-text-hide")
  } else {
    const loginDiv = document.getElementById("login")
    loginDiv.classList.remove("login-text-hide")
    const logoutDiv = document.getElementById("logout")
    logoutDiv.classList.add("logout-text-hide")
  }
}

const favoritesListener = () => {
  const favoriteDiv = document.getElementById("favorites")
  favoriteDiv.addEventListener("click", () => {
    currentUser()
  })
}

const showCreateUserListener = () => {
  const registerOptionDiv = document.getElementById("register-option-div")
  registerOptionDiv.addEventListener("click", () => {
    hideLogin()
    showRegisterUserDiv()
  })
}

const showRegisterUserDiv = () => {
  const signUpDiv = document.getElementById("signup-div")
  signUpDiv.classList.add("signup-div-show")
}

userLogoutListener = () => {
  const logout = document.getElementById("logout")
  logout.addEventListener("click", () => {
    const logoutObj = {
      method: "DELETE",
      credentials: "same-origin",
    }
    logoutUser(logoutObj)
  })
}

const userLoginListener = (e) => {
  const submitForm = document.getElementById("login-form-submit")
  const loginForm = document.getElementById("login-form")
  submitForm.addEventListener("click", (e) => {
    e.preventDefault()

    const loginObj = {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: loginForm.username.value,
        password: loginForm.password.value,
      }),
    }

    loginUser(loginObj)
  })
}

const hideLogin = () => {
  const loginDiv = document.getElementById("login-div")
  loginDiv.classList.remove("login-div-show")
}

const createUserListener = () => {
  const signUpForm = document.getElementById("signup-form")
  const signUpFormSubmit = document.getElementById("signup-form-submit")

  signUpFormSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    const configObj = {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: signUpForm.username.value,
        password: signUpForm.password.value,
        password_confirmation: signUpForm.password_confirmation.value,
      }),
    }
    createUserFetch(configObj)
  })
}

const loginUser = (loginObj) => {
  const loginUrl = "http://localhost:3000/api/v1/users/login"

  fetch(loginUrl, loginObj)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error)
      } else {
        console.log(data)
        User.addUserLogin(data)
        User.addUserData(data)
        alert(`Welcome, ${data.user.username}. You're logged in.`)
        hideLogin()
        showNewsBody()
        clearLoginFromData()
        displayLoginOrLogout()
      }
    })
}

const logoutUser = (logoutConfig) => {
  const logoutUrl = "http://localhost:3000/api/v1/users/logout"

  fetch(logoutUrl, logoutConfig)
    .then((response) => response.json())
    .then((data) => {
      User.removeUserData()
      alert(data.notice)
      displayLoginOrLogout()
    })
}

const createUserFetch = (configObj) => {
  const apiUrl = "http://localhost:3000/api/v1/users"
  fetch(apiUrl, configObj)
    .then((response) => response.json())
    .then((data) => {
      if (data.username) {
        alert(`This username ${data.username}`)
        showLogin()
      } else if (data.password_confirmation) {
        alert("The passwords provided don't match")
      } else {
        showNewsBody(data)
        deleteUserFormInfo()
        hideUserRegistration()
      }
    })
    .catch((error) => console.log(error))
}

const hideUserRegistration = () => {
  const signUpDiv = document.getElementById("signup-div")
  signUpDiv.classList.remove("signup-div-show")
}

const deleteUserFormInfo = () => {
  const userForm = document.getElementById("login-form")

  console.log(userForm)
  ;(userForm.username.value = ""),
    (userForm.password.value = ""),
    (userForm.password_confirmation.value = "")
}

const clearLoginFromData = () => {
  const loginForm = document.getElementById("login-form")
  ;(loginForm.username.value = ""), (loginForm.password.value = "")
}

const showNewsBody = () => {
  const newsBodyDiv = document.getElementById("news-body")
  newsBodyDiv.classList.remove("news-body-hide")
}

const showLoginListener = () => {
  const loginDiv = document.getElementById("login")
  loginDiv.addEventListener("click", () => {
    hideNewsBody()
    closeNavbarExpansion()
    resetMenu()
    showLogin()
  })
}

const showLogin = () => {
  const loginDiv = document.getElementById("login-div")
  loginDiv.classList.add("login-div-show")
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

const hideNewsBody = () => {
  const newsBodyDiv = document.getElementById("news-body")
  newsBodyDiv.classList.add("news-body-hide")
}

const bookMarkListener = () => {
  const bookmarkDivs = document.getElementsByClassName("bookmark-div")
  for (let item of bookmarkDivs) {
    item.addEventListener("click", () => {
      const dataId = item.dataset.id
      findStory(dataId)
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

const populateDOMWithHeadlines = (data) => {
  const headlinesData = Headlines.getHeadlinesArray()
  const newsBody = document.getElementById("news-body")
  let imgUrl

  for (let item in headlinesData) {
    const headlineContainer = document.createElement("div")
    headlineContainer.setAttribute("class", "headline-container")
    if (item == 0) {
      headlineContainer.setAttribute("id", "headline-container-first")
    }
    if (headlinesData[item].image !== undefined) {
      imgUrl = headlinesData[item].image.thumbnail.contentUrl
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
    const date = headlinesData[item].datePublished

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

    storyText.innerText = headlinesData[item].name.substring(0, 70) + "..."
    const provider = document.createElement("div")
    provider.setAttribute("class", "provider")
    provider.innerText = `Source: ${headlinesData[item].provider[0].name}`
    storyTextDiv.appendChild(dateBookMarkDiv)
    storyTextDiv.appendChild(storyText)
    storyTextDiv.appendChild(provider)
    headlineContainer.appendChild(storyTextDiv)

    newsBody.appendChild(headlineContainer)
    newsBody.appendChild(borderDiv)
  }
  bookMarkListener()
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
    // for developoment, populate local storage, to conserve fetch request to api
    .then((data) => assignHeadlines(data.value))
    .catch((err) => {
      console.error(err)
    })
}

// let headlinesArray = []
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
  console.log(headlines)
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
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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
    .then((data) => console.log(data))
}

// const fetchUserData = () => {
//   fetch("http://localhost:3000/api/v1/favorites").then((resp) =>
//     resp.json().then((data) => console.log(data))
//   )
// }

// User class
class User {
  // Add user login
  static addUserLogin(userData) {
    localStorage.setItem("user_id", JSON.stringify(userData.user_id))

    // JSON stringify converts an object to a string
    // localStorage.setItem("user_id", JSON.stringify(userId))
  }

  static addUserData(userData) {
    localStorage.setItem("username", JSON.stringify(userData.user.username))
  }

  static removeUserData() {
    let currentUser = User.getUserLogin()
    console.log(currentUser)
    currentUser = null
    localStorage.setItem("user_id", JSON.stringify(currentUser))
  }

  static getUserLogin() {
    let currentUserId

    if (localStorage.getItem("user_id") === null) {
      currentUserId = null
    } else {
      // JSON.parse converts a string into an object
      currentUserId = JSON.parse(localStorage.getItem("user_id"))
    }
    return currentUserId
  }

  static getUserData() {
    let currentUserData

    if (localStorage.getItem("username") === null) {
      currentUserData = null
    } else {
      // JSON.parse converts a string into an object
      currentUserData = JSON.parse(localStorage.getItem("username"))
    }
    return currentUserData
  }
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
