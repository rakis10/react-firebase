import { SkladItem } from './types';
// import { firestore } from './../firebaseSetup';

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
// import app, { firestore } from "../firebaseSetup";

import { firestore } from "../firebaseSetup";
import { getAllObjednavky } from './objednavky';

export const getAllSklad = async () => {
    const sklad = await getDocs(collection(firestore, 'sklad'))
    const res: SkladItem[] = []

    sklad.forEach(item => {
        res.push({
            sirka: item.data().sirka,
            dlzka: item.data().dlzka,
            pocet: item.data().pocet,
            sum: item.data().sum,
            id: item.id
        })
    })

    return res
}
export const getAllSkladFilter = async (dlzka: number, sirka: number) => {
    const q = query(collection(firestore, "sklad"), where("dlzka", "==", dlzka),  where("sirka", "==", sirka));
    const sklad = await getDocs(q)
    
    const res: SkladItem[] = []

    sklad.forEach(item => {

        res.push({
            sirka: item.data().sirka,
            dlzka: item.data().dlzka,
            pocet: item.data().pocet,
            sum: item.data().sum,
            id: item.id
        })
    })

    return res
}


export const getSumSklad = async () => {
    let sum = 0
    await getAllSklad().then((data) => {
        data.forEach((item) => {
            sum += item.sum
        })
    })
    let sumObjednavky = 0
    await getAllObjednavky().then((data) => {
        data.forEach((item) => {
            sumObjednavky += item.pocet
        })
    })

    return sum - sumObjednavky
}

export const addSklad = async (input: Omit<SkladItem, 'id'>) => {
    input.sum = input.dlzka * input.pocet
    const dbRef = collection(firestore, "sklad");
    await addDoc(dbRef, input).then(dbRef=>{
        console.log("Document has been added successfully");
    })
}
