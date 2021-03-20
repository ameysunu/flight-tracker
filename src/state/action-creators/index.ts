import axios from 'axios';
import {Dispatch} from 'redux';
import {ActionType, AirlineActionType} from '../action-types';
import {Action, AirlineAction} from '../actions';

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
                if(result.iata_code === null){
                    return result.name;
                }else
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

export const getAirline= (airline_name: string) => {

    return async(dispatch:Dispatch<AirlineAction>) => {
        dispatch ({
            type: AirlineActionType.SEARCH_AIRLINE
        });

        try{
            const {data} = await axios.get(`http://api.aviationstack.com/v1/airlines?access_key=be060a85548396ee928032ca22cf7a77`, {
                params:{
                    airline_name:airline_name,
                }
              
            });
            
            const iata = data.data.map((result: any) => {
                return result.iata_code;
            });
    
           const city = data.data.map((result: any) => {
                return result.country_name;
            });
    
            const fleet = data.data.map((result: any) => {
                return result.fleet_size;
            });
    
            const callsign = data.data.map((result: any) => {
                return result.callsign;
            });

            dispatch ({
                type: AirlineActionType.SEARCH_AIRLINE_SUCCESS,
                payload: {
                    iata: iata,
                    city: city,
                    fleet: fleet,
                    callsign: callsign
                }, 
            })
            console.log(data);
        }
        catch(err){
            dispatch({
                type: AirlineActionType.SEARCH_AIRLINE_ERROR,
                payload: err.message
            })

            console.log(err);
        }
    }
};