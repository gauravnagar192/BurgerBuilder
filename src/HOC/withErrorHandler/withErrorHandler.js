import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';

const withErrorHandler = (WrapperedComponent, axios) => {
    return (props)  => {
        let [state , setState] = useState({
            error: null
        });


        useEffect(() => {
            let reqInterceptors = axios.interceptors.request.use(req => {
                setState({error: null})
                return req;
            })
            let resInterceptors =  axios.interceptors.response.use(res => res, err => {
                setState({error:err})
            })

            return () => {
                axios.interceptors.request.eject(reqInterceptors);
                axios.interceptors.response.eject(resInterceptors);
            }
        },[])

        function errorConfirmedHandler(){
            setState({error: null})
        }

        return(
            <Aux>
                <Modal show={state.error} clicked={errorConfirmedHandler}>
                    {state.error ? state.error.message : null}
                </Modal>
                <WrapperedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;