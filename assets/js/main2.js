const URL = 'https://free-to-play-games-database.p.rapidapi.com/api';

const getRequest = async(url) => {

    console.log(url);
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

const getGamesList = async(container) => {

    url = `${URL}/games`;
    data = await getRequest(url);
    if (data) {
        setGameList(container, data);
    }
}

const setGameList = (container, games) => {
    games.map((game) => {
        card = document.createElement('div');
        card.classList = "col-md-4";
        console.log(game);
        card.innerHTML = `
            <div class="card bg-lightDark mb-3 rounded-3">
                <img class="rounded-top" src="${game.thumbnail}">
                <div class="card-body">
                    <span class="badge text-bg-warning">${game.platform}</span>
                    <span class="border border-info text-info float-end px-2">${game.genre}</span>
                    <h5 class="card-title text-white mt-3">${game.title}</h5>
                </div>
            </div> 
        `;

        container.append(card);
    })
}

container = document.getElementById('mainContainer')
getGamesList(container);