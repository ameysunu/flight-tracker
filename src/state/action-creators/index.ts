import axios from 'axios';
import {Dispatch} from 'redux';
import {ActionType} from '../action-types';
import {Action} from '../actions';

export const getAirport= (term: string) => {

    return async(dispatch:Dispatch<Action>) => {
        dispatch ({
            type: ActionType.SEARCH_FLIGHTS
        });

        try{
            const {data} = await axios.get('http://api.aviationstack.com/v1/flights?access_key=c3c26bcfa2fedb90e0a22738397d556b', {
                params: {
                    text: term
                }
            });

            const names = data.objects.map((result: any) => {
                return result.package.name;
            });

            dispatch ({
                type: ActionType.SEARCH_FLIGHTS_SUCCESS,
                payload: names
            })
        }
        catch(err){
            dispatch({
                type: ActionType.SEARCH_FLIGHTS_ERROR,
                payload: err.message
            })
        }
    }
};