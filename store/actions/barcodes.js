export const READ_BAR_CODE = 'READ_BAR_CODE';
export const REMOVE_BAR_CODE = 'REMOVE_BAR_CODE';
export const UPDATE_BAR_CODE = 'UPDATE_BAR_CODE';
export const RESET_BAR_CODE = 'RESET_BAR_CODE';
export const addBarCode = (barcode,vendor,itemtype,price) =>{
    return {type:READ_BAR_CODE,
        barcodeData:{
            barcode:barcode,
            vendor:vendor,
            itemtype:itemtype,
            price:price
        }
    };
};
export const removeBarCode = barcodeId =>{
    return {
        type:REMOVE_BAR_CODE,
        barcodeId:barcodeId
    }
};
export const updateBarCode = (vendor,type,price) =>{
    return {
        type:UPDATE_BAR_CODE,
        barcodeData:{
            vendor:vendor,
            type:type,
            price:price
        } 
    };   
};
export const resetBarCode = () =>{
    return {
        type:RESET_BAR_CODE
    };
};