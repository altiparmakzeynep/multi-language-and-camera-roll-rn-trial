export const GET_PHOTOS               = "get_photos";
export const SELECT_PHOTOS            = "selec_photos";

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