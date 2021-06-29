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
        console.log("data:" ,formData);
        axios({
            method: "POST",
            url: "http://192.168.1.6:5003/api/v1/posts",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data;',
                'Authorization': 'Bearer ' +  '0XgxIuXhEgHtpGqVPRC8HQpe4VIib3uTXOREPeqnBZLJnV4Zm4TTVTXvSgp0AQJpI9oJZcBnCb0TlHqtOR1AeDoNXaNnS4xOXuwoxXT9a9GPcki4M2OWs5PX0bvJesENUBethNxzaZr7m2rFnRAQMHfyIxq4XhS7wfIKKEAkiq1CIzOrT9RSKrmS4oHuTCQ3nJypKwwKrQ5cRcTJipi8KBa53PcwZoZkgKOxqf7Q3K8rufD6Ten89k1yIf',
            }           
        }).then((result) => {
            console.log("ddd", result);
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