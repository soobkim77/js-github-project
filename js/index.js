let search = document.querySelector("#search")
let selSubmit = document.getElementsByName("submit")
selSubmit.forEach(element => element.addEventListener('click', submitSearch))


//fetch request
function submitSearch(e){
    e.preventDefault();
    let userList = document.querySelector("#user-list")
    userList.innerHTML = ""
    let userInput = search.value
    let userUrl = `https://api.github.com/search/users?q=${userInput}`
    let configObj = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
    }
    fetch(userUrl, configObj)
    .then(resp => resp.json())
    .then(results => {
        let resultArr = Object.values(results.items)
        resultArr.forEach(result => buildSearchResults(result))
    })
}

function buildSearchResults(result){
    //create elements
    let userList = document.querySelector("#user-list")
    let login = document.createElement("li")
    let avatar = document.createElement("img")
    let profileLink = document.createElement("li")
    let profileUrl = document.createElement("a")
    //set element attributes
    login.textContent = `/${result.login}`
    avatar.height = 20
    avatar.width = 20
    avatar.src = result.avatar_url
    profileUrl.href = result.html_url
    profileUrl.target = "_blank"
    profileUrl.textContent = `Github/${result.login}`
    //append elements
    profileLink.appendChild(profileUrl)
    userList.append(login, profileLink, avatar)
    //event listener for displaying repos
    login.addEventListener('click', function(){
        let reposList = document.querySelector("#repos-list")
        reposList.innerHTML = ""
        let reposUrl = `https://api.github.com/users/${result.login}/repos`
        let configObj = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json"
            }
        }
        fetch(reposUrl, configObj)
        .then(resp => resp.json())
        .then(results => {
            results.forEach(result => buildRepos(result))
        })
})}

function buildRepos(result){
    let reposList = document.querySelector("#repos-list")
    // reposList.innerHTML = ""
    let li = document.createElement("li")
    li.textContent = result.name
    reposList.appendChild(li)
}