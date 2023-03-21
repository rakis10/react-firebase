import { Vybavenie } from './types';
// import { firestore } from './../firebaseSetup';

import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
// import app, { firestore } from "../firebaseSetup";

import { firestore } from "../firebaseSetup";

export const getAllVybavenie = async () => {
    const vybavenie = await getDocs(collection(firestore, 'vybavenie'))
    const res: Vybavenie[] = []

    vybavenie.forEach(item => {
        console.log(item)
        // let affectedItems: AffectedSkladItemType[] = []
        // item.data().affectedSkladItems.forEach(element => {
        //     affectedItems.push({
        //         skladItemId: element.skladItemId,
        //         amountTaken: element.amountTaken
        //     })
        // })
        // res.push({
        //     sum: item.data().sum,
        //     isFull: item.data().isFull,
        //     affectedSkladItems: item.data().affectedSkladItems
        // })
    })

    return res
}

export const addVybavenie = async (input: Vybavenie, isFull: boolean, objednavkaId: string) => {
    // jedno vybavenie by malo mat prave jedno objednavku, rozsirit objednavku?
    input.isFull = isFull


    const docRef = doc(firestore, "objednavky", objednavkaId);
    await updateDoc(docRef, {
        vybavenie: input
    }).then(ref => {
        console.log(ref)
    }).catch(error => {
        console.log('error ' + error)
    })

    // const dbRef = collection(firestore, "objednavky");
    // await addDoc(dbRef, input).then(dbRef => {
    //     console.log("Document has been added successfully");
    // })
}