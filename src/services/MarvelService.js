import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey="apikey=151bb1b673fe6d640a269f7e649a88b4";
    const _offsetBase=0;

    const getAllCharacters = async (offset=_offsetBase) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return {total: res.data.total, newChars: res.data.results.map(_transformCharacter)};
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        let description=char.description?(char.description.length>180?char.description.slice(0,180)+"…":char.description):"The information about this character is not available.";

        return {
            id: char.id,
            name: char.name,
            description: description,
            thumbnail: char.thumbnail.path+'.'+char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        };
    }

    return {loading, error, getAllCharacters, getCharacter, clearError};
}

export const setObjFitImg = (thumbnail) => {
    let styleImg={"objectFit": "cover"};
    if (thumbnail==="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
        styleImg={"objectFit": "initial"};
    }
    return styleImg;
}


export default useMarvelService;