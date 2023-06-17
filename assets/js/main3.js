//Page version using https://www.freetogame.com/api-doc API

const URL = 'https://free-to-play-games-database.p.rapidapi.com/api';
mainContainer = document.getElementById('mainContainer');
keyword = document.getElementById('searchInputGame');
var gameModal = new bootstrap.Modal(document.getElementById("gameModal"), {});

getGamesList();


async function getRequest(url) {

    const config = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '431096274cmshc74c73031ad5e20p1f4224jsn22129fa0d3d9',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const result = await fetch(url, config);
        if(result.status === 200){
            const data = await result.json();
            return data;
        }else{
            return result;
        }

    } catch (error) {
        console.log(error);
    }
}

async function getGamesList(){

    data = await getRequest(`${URL}/games`);
    setGameList(data);
}

async function getGamesListByPlatform(platform) {

    url = `${URL}/games?platform=${platform}`;
    data = await getRequest(url);
    setGameList(data);
}

async function getGamesListByTag (tag){
    url = `${URL}/games?tag=${tag}`;
    data = await getRequest(url);
    setGameList(data);
}

function getPlatformIcon(platform){

    platformArray = platform.split(', ');
    platformName = (platformArray.length > 1) ? 'WEB & PC' : platform.substr(0, 3);
    if(platformName == 'Web'){
        platformIcon =`<span class="text-info">
                                <i class="fab fa-internet-explorer"></i>
                                <i class="fab fa-chrome"></i> 
                                <i class="fab fa-firefox-browser"></i>
                            </span>`;
    }else if(platformName == 'WEB & PC'){
        platformIcon =`<span class="text-info">
                                <i class="fab fa-windows text-info"></i>
                                <i class="fab fa-internet-explorer"></i>
                                <i class="fab fa-chrome"></i> 
                                <i class="fab fa-firefox-browser"></i>
                            </span>`;
    }else{
        platformIcon = '<i class="fab fa-windows text-info"></i>';
    }

    platformName = `<span class="text-bg-secondary text-dark px-1 mr-1">${platformName.toUpperCase()}</span>`;


    return [platformIcon, platformName];

}

function setGameList(games){

    mainContainer.innerHTML = '';
    games.forEach((game) => {
        let [platformIcon, platformName] = getPlatformIcon(game.platform);
        card = document.createElement('div');
        card.classList = "col-md-3";
        card.innerHTML = `
            <a href="#nolink" onclick="getGameDetail(${game.id}, '${game.platform}')" class="w-100 mb-3 text-decoration-none">
                <div class="card bg-lightDark mb-3 rounded-3">
                    <img class="rounded-top" src="${game.thumbnail}">
                    <div class="card-body">
                        <h6 class="card-title text-white">
                            ${game.title.substr(0, 20)} 
                        </h6>
                        <p class="text-secondary">${game.short_description.substr(0, 30)}...</p>
                        <p class="text-secondary">
                            ${platformIcon}
                            <small class="text-secondary float-end font-12 px-1 mt-1">
                                <span class="text-bg-secondary text-dark px-1 mr-1">${game.genre.toUpperCase()}</span> 
                                ${platformName}
                            </small> 
                        </p>
                    </div>
                </div> 
            </a>
        `;

        mainContainer.append(card);
    })

    // <span class="badge text-bg-warning">${game.platform}</span>

}

async function getGameDetail(gameId, gamePlatform){

    url = `${URL}/game?id=${gameId}`;
    data = await getRequest(url);
    console.log(data);
    gameModal.show();
    setGameDetail(data, gamePlatform);

}

keyword.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      event.preventDefault();
      searchGame();
    }
  });

async function searchGame(){

    url = `${URL}/games`;
    data = await getRequest(url);

    dataFiltered = data.filter((game) => {
        // console.log(game.title);
        // return game.title.match(/^.*flyff$/);
        return game.title.toUpperCase().indexOf(keyword.value.toUpperCase()) >= 0 ? true : false;
    })

    document.getElementById('resultLabel').innerHTML =  dataFiltered.length + ` results found: "${keyword.value}"`;
    console.log(dataFiltered);
    setGameList(dataFiltered);
    mainContainer.scrollIntoView();
}


function setGameDetail(game, gamePlatform){

    requirements = game.minimum_system_requirements;
    galery = document.getElementById('gameGallery');
    gameDescription = document.getElementById('gameDescription');
    document.getElementById('gameCover').src= `${game.thumbnail}`;
    document.getElementById('gameName').innerHTML = `${game.title}`;
    document.getElementById('gameLink').href = `${game.game_url}`;

    galery.innerHTML = '';
    game.screenshots.forEach((foto) =>{
        
        div = document.createElement('div');
        div.classList = 'col-md-4';
        img = document.createElement('img');
        img.classList = 'w-100';
        img.src = foto.image;
        div.append(img);

        galery.append(div);
    })

    

    if(gamePlatform == 'PC (Windows)'){
    gameDescription.innerHTML = `${game.short_description}`;
    document.getElementById('titleGameRequirement').style.visibility = 'visible';
        document.getElementById('gameRequirement').innerHTML = `
        <ul class="list-unstyled">
            <li><span class="fw-bold text-secondary">SO: </span>${requirements.os}</li>
            <li><span class="fw-bold text-secondary">Processor: </span>${requirements.processor}</li>
            <li><span class="fw-bold text-secondary">Memory: </span>${requirements.memory}</li>
            <li><span class="fw-bold text-secondary">Storage: </span>${requirements.storage}</li>
        </ul>`;
    }else{
        document.getElementById('gameRequirement').innerHTML = '';
        document.getElementById('titleGameRequirement').style.visibility = 'hidden';
    gameDescription.innerHTML = `${game.description}`;
}

    // document.getElementById('gameGenre').innerHTML = `${game.genre}`;
}

