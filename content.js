const getTwitterUsername = () => {
  const path = window.location.pathname
  const pathArray = path.split("/")
  const username = pathArray[1]
  return username
}

const getTwitterName = () => {
  const nameSelector = "div[data-testid='primaryColumn'] h2"
  const name = document.querySelector(nameSelector).textContent
  return name
}

const addShowcaseProfileButton = () => {
  const username = getTwitterUsername()
  const name = getTwitterName()
  console.log(name)
  if (username) {
    console.log(username)
    const showCaseRes = fetch(
      `https://cache.showwcase.com/search?term=${name}`
    ).then((res) => res.json())
    showCaseRes.then((res) => {
      const user = res[0]
      if (user && user.displayName.includes(name)) {
        const button = document.createElement("a")
        button.innerHTML = "Showwcase Profile"

        button.setAttribute("href", `https://showwcase.com/${user.username}`)
        // design it like twitter button
        button.setAttribute(
          "style",
          "background-color: #1da1f2; color: white; padding: 10px; border-radius: 20px; font-size: 14px; font-weight: bold; text-decoration: none; margin-right: 10px; font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji; display: block; transform: translateY(-10px);"
        )
        const buttonContainer = document.createElement("div")
        buttonContainer.appendChild(button)
        const profileContainer = document.querySelector(".r-1h0z5md")
        profileContainer.prepend(buttonContainer)
        // end loop
      }
    })
  } else {
    console.log("No username found")
  }
}

// wait till the react loads and then add the button
setTimeout(() => {
  addShowcaseProfileButton()
}, 5000)

// add the button on every page change (react router) (twitter)
window.addEventListener("popstate", () => {
  setTimeout(() => {
    addShowcaseProfileButton()
  }, 5000)
})
