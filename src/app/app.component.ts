import { Component, inject, OnInit } from '@angular/core';

import { cardsValue } from './values/cards.value';
import { Card, Category } from './types/card.type';
import { RulesService } from './services/rules.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'marvel-remix-evaluation';

    public result: number = 0;

    public cards: Card[] = cardsValue;

    public activeCards: Card[] = [];

    protected MAX_LENGTH_OF_ACTIVE_CARDS: number = 7;

    private rulesService: RulesService = inject(RulesService);

    ngOnInit(): void {
        console.log(cardsValue);
    }

    public filterCardsByCategory(cards: Card[], category: Category): Card[] {
        return cards.filter(card => card.category === category);
    }

    public addCard(card: Card): void {
        if (this.activeCards.length !== this.MAX_LENGTH_OF_ACTIVE_CARDS) {
            if (!card.isChoose) {
                this.activeCards.push(card);
            }

            card.isChoose = true;
            this.doEvaluation();
        }
    }

    public removeCard(index: number, id: number): void {
        const card: Card | undefined = this.cards.find(value => value.id === id);

        if (card) {
            card.isChoose = false;
        }

        this.activeCards.splice(index, 1);
        this.doEvaluation();
    }

    public reset(): void {
        this.cards.map(card => (card.isChoose = false));
        this.activeCards = [];
    }

    public doEvaluation(): void {
        const hasSchurke: boolean = this.rulesService.hasSchurke(this.activeCards);

        if (!hasSchurke) {
            this.result = 0;
            return;
        }

        const hasHeldOrVerbuendeter: boolean = this.rulesService.hasHeldOrVerbuendeter(this.activeCards);

        if (!hasHeldOrVerbuendeter) {
            this.result = 0;
            return;
        }

        this.result = this.rulesService.addBasePoints(this.activeCards);
    }
}
