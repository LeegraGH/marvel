import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey="apikey=151bb1b673fe6d640a269f7e649a88b4";
    const _offsetBase=0;

    const getAllCharacters = async (offset=_offsetBase) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return {total: res.data.total, newChars: res.data.results.map(char => _transformCharacter(char, false))};
    }

    const getCharacter = async (id, isFullDescr) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0], isFullDescr);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?${_apiKey}&name=${name}&limit=1`);
        if (res.data.results[0]) return _transformCharacter(res.data.results[0], false);
        else return null;
    }

    const getComic = async (id) => {
        const res =  await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const getAllComics = async (offset=_offsetBase) => {
        const res =  await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return {total: res.data.total, newComics: res.data.results.map(_transformComic)};
    }

    const _transformComic = (comic) => {
        const price=comic.prices[0].price===0?"Price is not available":`${comic.prices[0].price}$`;

        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || "There is no description",
            pageCount: comic.pageCount
				? `${comic.pageCount} pages`
				: "No information about the number of pages",
            language: comic.textObjects[0]?.language || "en-us",
            price: price,
            thumbnail: comic.thumbnail.path+'.'+comic.thumbnail.extension
        }
    }

    const _transformCharacter = (char, isFullDescr) => {
        let description=char.description?
        ((char.description.length>180&&!isFullDescr)?char.description.slice(0,180)+"…":char.description)
        :"The information about this character is not available.";

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

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharacterByName};
}

export const setObjFitImg = (thumbnail) => {
    let styleImg={"objectFit": "cover"};
    if (thumbnail==="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
        styleImg={"objectFit": "initial"};
    }
    return styleImg;
}


export default useMarvelService;