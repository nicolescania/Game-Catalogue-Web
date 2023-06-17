//Page version using https://rawg.io API

const URL = 'https://api.rawg.io/api';
const KEY = 'fb48dfa6530647a0af4ecd764c927903';
const gameContainer = document.getElementById('mainContainer')
const platformContainer = document.getElementById('platformContainer')

let gamePage = 0;

const getRequest = async(url) => {

    url = url.includes('?') ? `${url}&key=${KEY}` : `${url}?key=${KEY}`;
    try {
        const result = await fetch(url);
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

const getGamesList = async() => {

    gamePage++;
    url = `${URL}/games?page=${gamePage}`;
    data = await getRequest(url);
    setGameList(gameContainer, data.results);
}

const getGamesListByPlatform = async(container, platform) => {

    url = `${URL}/games`;
    data = await getRequest(url);
    setGameList(gameContainer, data.results);
}

const getPlatformList = async() => {

    url = `${URL}/platforms/lists/parents`;
    data = await getRequest(url);
    setPlatformList(platformContainer, data.results);
    
}

const setPlatformList = async(container, platforms) => {
    platforms.map((platform) => {
        card = document.createElement('div');
        card.classList = "col-md-12 my-2";
        card.innerHTML = `
            <div class="list-group w-100">
                <a href="#" class="list-group-item bg-lightDark list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0">
                    <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>
                        <h6 class="mb-0 text-white">${platform.name}</h6>
                        <p class="mb-0 opacity-75 text-white">Some placeholder content in a paragraph.</p>
                    </div>
                    <small class="text-white text-nowrap"><span class="badge bg-warning rounded-pill">14</span></small>
                    </div>
                </a>
            </div> 
        `;

        container.append(card);
    })
}


const setGameList = (container, games) => {

    container.innerHTML = "";
    games.map((game) => {
        card = document.createElement('div');
        card.classList = "col-md-4";
        card.innerHTML = `
            <div class="card bg-lightDark mb-3 rounded-3">
                <div class="bg-image rounded-top" style="background-image:url(${game.background_image})"></div>
                <div class="card-body">
                    <span class="badge text-bg-warning">${game.parent_platforms[0].platform.name}</span>
                    <span class="badge text-bg-warning">${game.parent_platforms[1].platform.name}</span>
                    <span class="border border-info text-info float-end px-2"><i class="fas fa-star"></i> ${game.rating}</span>
                    <h5 class="card-title text-white mt-3">${game.name}</h5>
                </div>
            </div> 
        `;

        container.append(card);
    })
}

getGamesList();
getPlatformList(document.getElementById('platformContainer'));

