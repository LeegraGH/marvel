import error from './error.gif';

import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <div>
            <img src={error} alt="error" className='error'/>
        </div>
    )
};

export default ErrorMessage;