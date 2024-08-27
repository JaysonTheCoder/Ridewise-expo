import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
export const saveUserCredentials = async function( uid, username, password, collectionName ) {
    try {
        await setDoc(doc(db, collectionName, uid), {
            username: username,
            password: password,
            createdAt: new Date()
        })
        console.log('User credentials stored success!');
        
    }catch(err) {
        console.log('Error storing credentials: ', err)
    }
}
export const getDocumentData = async function(uid, collectionName ) {
    const useRef = doc(db, collectionName, uid)
    const userSnap = await getDoc(useRef)

    if(userSnap.exists()) {
        const { username , password } = userSnap.data()
        let data = {
            username: username,
            password: password
        }
        return data
    } else {
        console.log('No data found!');
        return null
    }
}
export const updateData = async function( uid, newData_, documentName) {
    const useRef = doc(db, documentName, uid)
    await updateDoc(userRef, {
        newData_
    })
}
