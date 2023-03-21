import { AffectedSkladItemType, Objednavka, SkladItem } from './types';
// import { firestore } from './../firebaseSetup';

import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
// import app, { firestore } from "../firebaseSetup";

import { firestore } from "../firebaseSetup";




export const getAllObjednavky = async () => {
    const sklad = await getDocs(collection(firestore, 'objednavky'))
    const res: Objednavka[] = []

    sklad.forEach(item => {
    
        res.push({
            sirka: item.data().sirka,
            dlzka: item.data().dlzka,
            pocet: item.data().pocet,
            sum: item.data().sum,
            vybavenie: item.data().vybavenie ? item.data().vybavenie: null,
            id: item.id
        })
    })
    console.log(res)
    return res
}

export const getObjednavkaById = async (id: string) => {
    const docRef = doc(firestore, "objednavky", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return { ...docSnap.data(), id: docSnap.id }
    } else {
        // todo nepodarilo sa najst
    }
    return null
}


export const addObjednavku = async (input: Omit<Objednavka, 'id'>) => {
    input.sum = input.dlzka * input.pocet
    const dbRef = collection(firestore, "objednavky");
    await addDoc(dbRef, input).then(dbRef => {
        console.log("Document has been added successfully");
    })
}

export const getObjednavky = async () => {
    await getAllObjednavky().then((data) => {
        return data
    })

}