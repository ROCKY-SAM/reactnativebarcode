import {LEANDING_BAR_CODE,REMOVE_LENDING_BAR_CODE,RESET_LENDING_BAR_CODE} from '../actions/lending';
import Leading from '../../models/lending';

const initialState={
    lendingList:[]
};

export default(state=initialState,action) =>{
    switch(action.type){
        case LEANDING_BAR_CODE:
            const newLending = new Leading(
                new Date().toString(),
                action.scanData.barcode,
                action.scanData.givingUser,
                action.scanData.buyUserName,
                action.scanData.buyUserEpf,
                action.scanData.location,
                action.scanData.remark,
                new Date().toString()
            );
            return {
                ...state,
                lendingList:state.lendingList.concat(newLending)
            };

        case REMOVE_LENDING_BAR_CODE:
            return{
                ...state,
                lendingList:state.lendingList.filter(
                    prod=>prod.id !== action.removeId
                )
            };
        case RESET_LENDING_BAR_CODE:
            return {...state,lendingList:[]};
    }
    return state;
};