import { Injectable } from '@angular/core';
import { Card } from '../types/card.type';

@Injectable({
    providedIn: 'root',
})
export class RulesService {
    public hasSchurke(cards: Card[]): boolean {
        return cards.some(card => card.category === 'Schurke');
    }

    public hasHeldOrVerbuendeter(cards: Card[]): boolean {
        return cards.some(card => card.category === 'Held' || card.category === 'Verbuendeter');
    }

    public addBasePoints(cards: Card[]): number {
        let result: number = 0;

        cards.forEach(card => {
            result += card.basePoints;
        });

        return result;
    }
}
