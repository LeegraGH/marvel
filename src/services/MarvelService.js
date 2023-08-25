

class MarvelService {

    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey="apikey=151bb1b673fe6d640a269f7e649a88b4";

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        let description=char.description?(char.description.length>180?char.description.slice(0,180)+"…":char.description):"The information about this character is not available.";

        return {
            name: char.name,
            description: description,
            thumbnail: char.thumbnail.path+'.'+char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        };
    }
}

export default MarvelService;