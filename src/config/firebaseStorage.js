import { storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"


const uploadFile = (file) => {
    return new Promise ((resolve, reject) => {
        const extension = file.type.split("/")[1]
        const nameUUID = v4()

        const storageReference = ref(storage, `prodPics/${nameUUID}.${extension}`)
        const savedFile = uploadBytesResumable(storageReference, file)
        savedFile.on('state_changed',
            () => {},
            (error) => { reject(error)},
            () => {
                getDownloadURL(storageReference)
                .then((url) => {
                    resolve(url)
                })
            }    
        )
    })
}

export {
    uploadFile
}