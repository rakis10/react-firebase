export type SkladItem = {
    sirka: number
    dlzka: number
    pocet: number
    sum: number
    id: string
}

export type Objednavka = {
    sirka: number
    dlzka: number
    pocet: number
    sum: number
    id: string
    vybavenie? : Vybavenie
}

export type Vybavenie = {
    sum: number
    affectedSkladItems: AffectedSkladItemType[]
    isFull?: boolean
}
export type AffectedSkladItemType = {
    skladItemId: string
    amountTaken: number
}
export enum ObjednavkaStav {
    'NOVA',
    'NAPLNENA'
}