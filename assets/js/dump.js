const getGameList = async() => {
    const gamesList = await getRequest(URL + '/games');
    setGames(gamesList);
}


const gamesByPlataform = async(platform) => {




    if (platform == 'pc') {
        const gamesListpc = await getRequest(URL + '/games?platform=pc');

        setGames(gamesListpc);       
    } 

    else if (platform == 'web') {
    const gamesListweb = await getRequest(URL + '/games?platform=browser');
        setGames(gamesListweb);
       
    } 

    return platform;




}