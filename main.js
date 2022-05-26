const searchButton = document.getElementById("search");
const apiUrl = "https://api.github.com/users/";

async function getProfile(name) {
  const respone = await fetch(apiUrl + name);
  const data = await respone.json();
  return data;
}

async function getTopRepos(name) {
  const respone = await fetch(apiUrl + name + "/repos");
  const repos = await respone.json();

  let highestToLowest = repos.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );

  const topRepos = [];
  for (let i = 0; i < 4; i++) {
    if (highestToLowest[i] !== null) {
      topRepos.push(highestToLowest[i]);
    }
  }

  return topRepos;
}

searchButton.onclick = async () => {
  const user = document.getElementById("input").value;
  const data = await getProfile(user);
  const topRepos = await getTopRepos(user);
  createDomElements(data, topRepos);
};

function createDomElements(data, topRepos) {
  const name = data.login;
  const avatar_url = data.avatar_url;
  const followers = data.followers;
  const repositories = data.public_repos;

  const oldContainer = document.getElementsByClassName("profileContainer")[0];

  if (oldContainer != null) {
    oldContainer.remove();
  }

  const container = document.createElement("div");
  container.classList.add("profileContainer");
  container.classList.add("container");

  //img and name

  const avatar = document.createElement("img");
  avatar.src = avatar_url;
  avatar.id = "avatar";
  container.appendChild(avatar);

  const h3 = document.createElement("h3");
  h3.innerHTML = name;
  container.appendChild(h3);

  //stats

  const statsDiv = document.createElement("div");
  statsDiv.classList.add("stats");
  //followers
  const followersDiv = document.createElement("div");
  followersDiv.classList.add("followers");

  const followerCount = document.createElement("span");
  followerCount.classList.add("count");
  followerCount.innerText = followers;
  followersDiv.appendChild(followerCount);

  const followerLabel = document.createElement("p");
  followerLabel.classList.add("count-name");
  followerLabel.innerHTML = "followers";
  followersDiv.appendChild(followerLabel);

  statsDiv.appendChild(followersDiv);

  //repos
  const repositoriesDiv = document.createElement("div");
  repositoriesDiv.classList.add("repositories");

  const repositoriesCount = document.createElement("span");
  repositoriesCount.classList.add("count");
  repositoriesCount.innerText = repositories;
  repositoriesDiv.appendChild(repositoriesCount);

  const repositoriesLabel = document.createElement("p");
  repositoriesLabel.classList.add("count-name");
  repositoriesLabel.innerHTML = "repositories";
  repositoriesDiv.appendChild(repositoriesLabel);

  statsDiv.appendChild(repositoriesDiv);

  container.appendChild(statsDiv);

  const hr = document.createElement("hr");

  container.appendChild(hr);

  //top repos

  const h4 = document.createElement("h4");
  h4.innerHTML = "Top repositories";
  container.appendChild(h4);

  const topRepoDiv = document.createElement("div");
  topRepoDiv.classList.add("top-repositories");

  topRepos.forEach((element) => {
    const repoDiv = document.createElement("div");
    repoDiv.classList.add("repo");

    const aTag = document.createElement("a");
    aTag.innerHTML = element.name;
    aTag.href = element.html_url;
    repoDiv.appendChild(aTag);

    const starSpan = document.createElement("span");
    starSpan.innerHTML = element.stargazers_count + " stars";
    repoDiv.appendChild(starSpan);

    const hr = document.createElement("hr");

    topRepoDiv.appendChild(repoDiv);
    topRepoDiv.appendChild(hr);
  });

  container.appendChild(topRepoDiv);

  const main = document.getElementById("main");
  main.appendChild(container);
}

{
  /* <div class="profileContainer container">
<img id="avatar" src="https://avatars.githubusercontent.com/u/65417797?v=4" alt="">
<h3>Github username</h3>

<div class="stats">
    <div class="followers">
        <span class="count">200</span>
        <p class="count-name">Followers</p>
    </div>
    <div class="repositories">
        <span class="count">200</span>
        <p class="count-name">repositories</p>
    </div>
</div>

<hr>

<h4>Top repositories</h4>
<div class="top-repositories">
    <div class="repo">
        <a href="">Repo 1</a>
        <span>12 Stars</span>
    </div>
    <hr>

    <div class="repo">
        <a href="">Repo 2</a>
        <span>12 Stars</span>
    </div>
    <hr>

    <div class="repo">
        <a href="">Repo 3</a>
        <span>12 Stars</span>
        
    </div>
    <hr>

    <div class="repo">
        <a href="">Repo 4</a>
        <span>12 Stars</span>
    </div>
</div>
</div> */
}
