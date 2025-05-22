import { Injectable } from '@angular/core';

import { Bonus, Card, Punishment, Transformation } from '../types/card.type';
import { BonusRulesService } from './bonus-rules.service';
import { PunishmentRulesService } from './punishment-rules.service';

@Injectable({
    providedIn: 'root',
})
export class RulesService {
    public constructor(
        private readonly bonusRulesService: BonusRulesService,
        private readonly punishmentRulesService: PunishmentRulesService
    ) {}

    public hasSchurke(cards: Card[]): boolean {
        return cards.some(card => card.category === 'Schurke');
    }

    public hasHeldOrVerbuendeter(cards: Card[]): boolean {
        return cards.some(card => card.category === 'Held' || card.category === 'Verbuendeter');
    }

    public hasHeroTransformation(transformation: Transformation[], card: Card[]): boolean {
        let needCount: number = 0;
        let hasTransformation: boolean = false;

        transformation.map(tmpTransformation => {
            if (!hasTransformation) {
                card.map(tmpCard => {
                    if (tmpTransformation.type === 'SYMBOL') {
                        tmpCard.symbols?.map(symbol => {
                            if (symbol === tmpTransformation.name) {
                                needCount += 1;
                            }
                        });
                    }

                    if (tmpTransformation.type === 'CARD' && tmpTransformation.name === tmpCard.name) {
                        needCount += 1;
                    }
                });

                hasTransformation = needCount >= tmpTransformation.need.count;
            }
        });

        return hasTransformation;
    }

    public calculateBonus(bonus: Bonus[], card: Card[]): number {
        let bonusPoints: number = 0;

        bonus.map((bonus: Bonus) => {
            if (bonus.every) {
                if (bonus.type === 'SYMBOL') {
                    if (bonus.name.length > 0) {
                        bonusPoints = this.bonusRulesService.calculateBonusForEverySymbol(bonus, card);
                    } else {
                        bonusPoints = this.bonusRulesService.calculateBonusForEveryDifferenceSymbol(bonus, card);
                    }
                }
            }

            if (bonus.need) {
                if (bonus.type === 'SYMBOL') {
                    bonusPoints = this.bonusRulesService.calculateBonusForNeedSymbol(bonus, card);
                }

                if (bonus.type === 'CATEGORY') {
                    bonusPoints = this.bonusRulesService.calculateBonusForNeedCategory(bonus, card);
                }

                if (bonus.type === 'CARD') {
                    bonusPoints = this.bonusRulesService.calculateBonusForNeedCard(bonus, card);
                }
            }

            if (bonus.isPair) {
                if (bonus.type === 'SYMBOL') {
                    bonusPoints = this.bonusRulesService.calculateBonusForPair(bonus, card);
                }
            }
        });

        return bonusPoints;
    }

    public calculatePunishment(punishment: Punishment, card: Card[]): number {
        let punishmentPoints: number = 0;
        if (punishment.need) {
            if (punishment.type === 'SYMBOL') {
                punishmentPoints = this.punishmentRulesService.calculatePunishmentForNeedSymbol(punishment, card);
            }
        }

        if (punishment.every) {
            if (punishment.type === 'SYMBOL') {
                punishmentPoints = this.punishmentRulesService.calculatePunishmentForEverySymbol(punishment, card);
            }

            if (punishment.type === 'CATEGORY') {
                punishmentPoints = this.punishmentRulesService.calculatePunishmentForEveryCategory(punishment, card);
            }
        }

        return punishmentPoints;
    }
}
