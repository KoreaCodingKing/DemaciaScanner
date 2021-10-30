import axios from "axios";

export const getRotationChamp = async() => {
    return await axios.post('http://localhost:3001/rotationchamp');
}

export default getRotationChamp();