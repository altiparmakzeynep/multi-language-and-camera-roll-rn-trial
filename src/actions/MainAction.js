export const GET_PHOTOS              = "get_photos";

export const getPhotosFromCamereRoll = (value) => {
    return{
        type: GET_PHOTOS,
        payload: value
    }
}