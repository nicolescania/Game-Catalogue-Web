const url = 'https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd5f87c37d4mshdaefcef8649006cp11b51bjsn45883850b465',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};


try {
    const response = await fetch(url, options);
    const result = await response.json();


    for (let i = 0; i < result.length; i++) {
       console.log(result[i])
     
        let game = result[i]
        const container = document.getElementById('myContainer')


        let cards = `  <div class="card-group">
        <div class="card bg-lightDark mb-3 rounded-3">
          <img src="${game.thumbnail}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${game.title}</h5>
            <p class="card-text">${game.short_description}</p>
            <p class="card-text">${game.genre}</p>
            <p class="card-text"><small class="text-body-secondary">Relase date: ${game.release_date}</small></p>
          </div>
        </div>
        </div>
      </div>`


        container.innerHTML += cards
    }

     } catch (error) {
    console.error(error);
}



