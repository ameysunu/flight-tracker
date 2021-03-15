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
            const {data} = await axios.get(`http://airlabs.co/api/v7/airlines?api_key=e7ef6eb3-f981-41ab-81db-bbd90e3d5f7e`, {
                params:{
                    name:term,
                }
              
            });

            const names = data.response.map((result: any) => {
                return result.name;
            });

            dispatch ({
                type: ActionType.SEARCH_FLIGHTS_SUCCESS,
                payload: names, 
            })
            console.log(data);
        }
        catch(err){
            dispatch({
                type: ActionType.SEARCH_FLIGHTS_ERROR,
                payload: err.message
            })

            console.log(err);
        }
    }
};