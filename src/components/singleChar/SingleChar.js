import { Helmet } from 'react-helmet';

import { setObjFitImg } from '../../services/MarvelService';

import '../../style/single.scss';

const SingleChar = ({data}) => {
    return (
        <>
        <Helmet>
            <meta
                name="description"
                content={`Marvel Character - ${data.name}`}/>
            <title>{data.name}</title>
        </Helmet>
        <div className="single">
            <img src={data.thumbnail} alt={data.name} style={setObjFitImg(data.thumbnail)} className="single__img"/>
            <div className="single__info">
                <h2 className="single__name">{data.name}</h2>
                <p className="single__descr">{data.description}</p>
            </div>
        </div>
        </>
    )
}

export default SingleChar;