import { VolneItem } from "../components/types";
import { getAllSkladFilter } from "./sklad";
import { SkladItem } from "./types";



export function volneTableFilterPreprocess(dlzka: number, sirka: number)  {
    let volneItems: SkladItem[] = []
    getAllSkladFilter(dlzka, sirka).then((data) => {
        volneItems = data
        return volneItems
    })
}
export function volneTablePreprocess(data: SkladItem[]) {
    let volneItems: VolneItem[] = []
    data.map((item) => {
        const found = volneItems.find((volny) => volny.sirka === item.sirka)
        if (found) {
            // ako lepsie?
            const sto = item.dlzka === 100 ? item.pocet : 0
            const stopade = item.dlzka === 150 ? item.pocet : 0
            const pade = item.dlzka === 50 ? item.pocet : 0
            volneItems.splice(volneItems.indexOf(found), 1, {
                stoKs: found.stoKs + sto,
                stopadeKs: found.stopadeKs + stopade,
                padeKs: found.padeKs + pade,
                sirka: found.sirka,
                sumMetrov: found.sumMetrov + item.sum,
            });
            
        } else {
            volneItems.push({
                stoKs: item.dlzka === 100 ? item.pocet : 0,
                stopadeKs: item.dlzka === 150 ? item.pocet : 0,
                padeKs: item.dlzka === 50 ? item.pocet : 0,
                sirka: item.sirka,
                sumMetrov: item.sum
            })
        }
    })
    return volneItems
}
export function otvoreneObjednavkyPreprocess(data: SkladItem[]) {
    let volneItems: VolneItem[] = []
    data.map((item) => {
        const found = volneItems.find((volny) => volny.sirka === item.sirka)
        if (found) {
            // ako lepsie?
            const sto = item.dlzka === 100 ? item.pocet : 0
            const stopade = item.dlzka === 150 ? item.pocet : 0
            const pade = item.dlzka === 50 ? item.pocet : 0
            volneItems.splice(volneItems.indexOf(found), 1, {
                stoKs: found.stoKs + sto,
                stopadeKs: found.stopadeKs + stopade,
                padeKs: found.padeKs + pade,
                sirka: found.sirka,
                sumMetrov: found.sumMetrov + item.sum,
            });
            
        } else {
            volneItems.push({
                stoKs: item.dlzka === 100 ? item.pocet : 0,
                stopadeKs: item.dlzka === 150 ? item.pocet : 0,
                padeKs: item.dlzka === 50 ? item.pocet : 0,
                sirka: item.sirka,
                sumMetrov: item.sum
            })
        }
    })

    return volneItems
}