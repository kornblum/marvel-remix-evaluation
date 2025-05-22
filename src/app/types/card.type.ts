export type Category = 'Ort' | 'Schurke' | 'Held' | 'Ausruestung' | 'Verbuendeter' | 'Manoever' | 'Zustand';
export type CardSymbol =
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

export interface Bonus {
    readonly points: number;
    readonly type: 'CATEGORY' | 'SYMBOL' | 'CARD';
    readonly name: CardSymbol[] | Category[] | string[];
    readonly addSymbol?: CardSymbol;
    readonly isPair?: boolean;
    readonly need?: {
        readonly count: number;
    };
    readonly every?: boolean;
}

export interface Punishment {
    readonly points: number;
    readonly type: 'CATEGORY' | 'SYMBOL';
    readonly name: CardSymbol[] | Category[];
    readonly need?: {
        readonly count: number;
    };
    readonly every?: boolean;
    readonly specialNeed?: string;
}

export interface Transformation {
    readonly type: 'CATEGORY' | 'SYMBOL' | 'CARD';
    readonly name: CardSymbol | Category | string;
    readonly need: {
        readonly count: number;
    };
}
export interface Card {
    readonly id: number;
    readonly basePoints: number;
    readonly transformationPoints?: number;
    readonly name: string;
    readonly category: Category;
    readonly basicSymbols?: CardSymbol[];
    symbols?: CardSymbol[];
    readonly transformationSymbols?: CardSymbol[];
    readonly specialRule?: string;
    readonly bonus?: Bonus[];
    readonly punishment?: Punishment;
    readonly transformation?: Transformation[];
    isChoose: boolean;
    isBlocked?: boolean;
    result?: number;
}
