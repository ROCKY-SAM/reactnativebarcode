import {READ_BAR_CODE,REMOVE_BAR_CODE,UPDATE_BAR_CODE,RESET_BAR_CODE} from '../actions/barcodes';
import Barcode from '../../models/barcode';
const initialState={
    barcodelist:[]
};

export default (state = initialState,action) =>{
    switch(action.type){
        case READ_BAR_CODE:
            const newBarcode = new Barcode(
                new Date().toString(),
                action.barcodeData.barcode,
                action.barcodeData.vendor,
                action.barcodeData.itemtype,
                action.barcodeData.price);
            return {
                ...state,
                barcodelist:state.barcodelist.concat(newBarcode)
            };
        case REMOVE_BAR_CODE:
            return{
                ...state,
                barcodelist:state.barcodelist.filter(
                    prod =>prod.id !== action.barcodeId
                )
            };

        case UPDATE_BAR_CODE:
             const updatebarCode= [];
            state.barcodelist.forEach(function (value) {
                const newBarcode = new Barcode(
                    value.id,
                    value.barcode,
                    action.barcodeData.vendor,
                    action.barcodeData.type,
                    action.barcodeData.price);
                updatebarCode.push(newBarcode);
              }); 
              return {
                ...state,
                barcodelist:updatebarCode
            };

        case RESET_BAR_CODE:
            return {...state,barcodelist:[]};
    }
    return state;
};