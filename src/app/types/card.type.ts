export type Category = 'Ort' | 'Schurke' | 'Held' | 'Ausruestung' | 'Verbuendeter' | 'Manoever' | 'Zustand';
export type Symbol =
    | 'Tech'
    | 'Intel'
    | 'Staerke'
    | 'Agilitaet'
    | 'Flug'
    | 'Reichweite'
    | 'Wakanda'
    | 'Asgard'
    | 'Mutant'
    | 'Gamma'
    | 'Wuerdig'
    | 'Urban'
    | 'Boss';

export interface Card {
    readonly id: number;
    readonly basePoints: number;
    readonly transformationPoints?: number;
    readonly name: string;
    readonly category: Category;
    readonly symbols?: Symbol[];
    readonly transformationSymbols?: Symbol[];
    isChoose: boolean;
}
