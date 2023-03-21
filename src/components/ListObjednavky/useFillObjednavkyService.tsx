import { useEffect, useState } from 'react';

import { Objednavka, SkladItem, Vybavenie } from '../../services/types';
import { addVybavenie } from '../../services/vybavenie';


const useFillObjednavkyService = (objednavka: Objednavka) => {

    // const [objednavka, setObjednavka] = useState<Objednavka>(emptyObjednavka)

    const emptyFill: Vybavenie = { sum: 0, isFull: false, affectedSkladItems: [] }
    const [fillObj, setFillObj] = useState<Vybavenie>(emptyFill)


    const [isFull, setIsFull] = useState<boolean>(false)
    const [affectedSklad, setAffectedSklad] = useState<string[]>([])

    useEffect(() => {
        if (objednavka.pocet > 0 && fillObj.sum === objednavka.pocet) {
            setIsFull(true)
        }
        console.log(fillObj)
    }, [fillObj])

    useEffect(() => {
        console.log(objednavka)
        if (objednavka.vybavenie) {
            let arr : string[] = []
            objednavka.vybavenie.affectedSkladItems.forEach((item)=>{
               arr.push(item.skladItemId)
            })
            setAffectedSklad(arr)
            setFillObj(objednavka.vybavenie)

        }
    }, [objednavka])

    useEffect(() => {
        console.log(affectedSklad)
    }, [affectedSklad])


    return {
        // setObjednavka: (obj: Objednavka) => {
        //     console.log(objednavka)
        //     if (objednavka.vybavenie) {
        //         setFillObj(objednavka.vybavenie)
        //     }
        //     setObjednavka(obj)
        // },
        submit: () => {
            addVybavenie(fillObj, fillObj.sum === objednavka.pocet, objednavka.id)
        },
        pridatFill: (item: SkladItem) => {
            const tempFillObj = fillObj
            const temp = tempFillObj.sum
            console.log(item)
            if (affectedSklad.includes(item.id)) return

            if ((item.pocet + temp) > objednavka.pocet) {
                // pridat len cast
                const delta = objednavka.pocet - temp

                tempFillObj.sum = temp + delta
                tempFillObj.affectedSkladItems.push({
                    amountTaken: temp + delta,
                    skladItemId: item.id
                })

            } else {
                // pridat cele
                tempFillObj.sum = temp + item.pocet
                tempFillObj.affectedSkladItems.push({
                    amountTaken: item.pocet,
                    skladItemId: item.id
                })
                //  setSum(temp + item.pocet)
            }
            // TODO chyba setAffectedSklad
            setFillObj(tempFillObj)
            setAffectedSklad([...affectedSklad, item.id])
            
        },
        fillObj,
        affectedSklad,
        isFull
    }
}
export default useFillObjednavkyService
