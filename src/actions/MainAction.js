import axios from "axios";

export const GET_PHOTOS               = "get_photos";
export const SELECT_PHOTOS            = "select_photos";
export const UPLOAD_PHOTOS            = "upload_photos";

export const getPhotosFromCamereRoll = (value) => {
    return{
        type: GET_PHOTOS,
        payload: value
    }
}
export const selectPhotos = (value) => {
    return{
        type: SELECT_PHOTOS,
        payload: value
    }
}
export const uploadPhotos = (formData) => {
    return dispatch => {
        dispatch({
            type: UPLOAD_PHOTOS 
        })
        console.log(formData);
        axios({
            method: "POST",
            url: "http://192.168.1.6:5003/api/v1/posts",
            data: formData,
            headers: {
                'Authorization': "Bearer  "  +  "D3UEv58RQ2KN89cpa6Q9kyxmctD3rlCD7nHQ5DwrGpENscSzUgH8lTLQ5I3pLBFgrF2iCJPxxgkBUh5KZBSq62aXmRSLtpSas2QfQPx4oMV1heagVImVoPbkTFMrRXtitI691TxBQ1UWxVnWqsfwPwrLIz4Vra5EiaFskJBlpy3cTtIFSeiMRTZyO8g1Z34PcW8iB6ZaWRPvaERBnFwfiTUm1uz7Cdv5FUL0uKO8hU5SbvzmlgoLwpLdpW",
            }           
        }).then((result) => {
            if(result.data.status == "success"){
                dispatch({
                    payload: result.data.data
                })
            }
        }).catch((err) => {
            console.log("err",err);
        })
    } 
}