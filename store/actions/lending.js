export const LEANDING_BAR_CODE = 'LEANDING_BAR_CODE';
export const REMOVE_LENDING_BAR_CODE = 'REMOVE_LENDING_BAR_CODE';
export const RESET_LENDING_BAR_CODE = 'RESET_LENDING_BAR_CODE';
export const leadingBarCode=(barcode, givingUser, buyUserName, buyUserEpf, location, remark)=>{
    return{
        type:'LEANDING_BAR_CODE',
        scanData:{
            barcode:barcode,
            givingUser:givingUser,
            buyUserName:buyUserName,
            buyUserEpf:buyUserEpf,
            location:location,
            remark:remark
        }
    };
};

export const removeLendingBarCode = removeId =>{
    return {
        type:REMOVE_LENDING_BAR_CODE,
        removeId:removeId
    }
};

export const resetLendingBarCode = () =>{
    return {
        type:RESET_LENDING_BAR_CODE
    };
};