import { Injectable } from '@angular/core';
import { Bonus, Card, CardSymbol, Category } from '../types/card.type';

@Injectable({
    providedIn: 'root',
})
export class BonusRulesService {
    public calculateBonusForPair(bonus: Bonus, card: Card[]): number {
        let bonusPoints: number = 0;

        const pairSymbol: string[] = [];

        card.map(tmpCard => {
            tmpCard.symbols?.map((value: CardSymbol) => {
                bonus.name.map((bonusSymbol: string) => {
                    if (bonusSymbol === value) {
                        pairSymbol.push(bonusSymbol);
                    }
                });
            });
        });

        console.log('isPair');
        console.log(pairSymbol);
        if (pairSymbol.length > 1) {
            const counts: Record<string, number> = {};

            for (let i = 0; i < pairSymbol.length; i++) {
                counts[pairSymbol[i]] = counts[pairSymbol[i]] + 1 || 1;
            }

            let lowestPairValue: number = 0;
            Object.entries(counts).forEach(([key, value]) => {
                if ((value > lowestPairValue && lowestPairValue === 0) || value <= lowestPairValue) {
                    lowestPairValue = value;
                }
            });

            if (lowestPairValue !== 0) {
                bonusPoints = lowestPairValue * bonus.points;
            }
        }

        return bonusPoints;
    }

    public calculateBonusForEverySymbol(bonus: Bonus, card: Card[]): number {
        let bonusPoints: number = 0;
        bonus.name.map(name => {
            const symbolForBonus = name;
            card.map(tmpCard => {
                tmpCard.symbols?.map(symbol => {
                    if (symbol === symbolForBonus) {
                        bonusPoints += bonus.points;
                    }
                });
            });
        });

        return bonusPoints;
    }

    public calculateBonusForEveryDifferenceSymbol(bonus: Bonus, card: Card[]): number {
        const allDifferenceSymbol: CardSymbol[] = [];
        card.map(tmpCard => {
            tmpCard.symbols?.map(value => {
                if (!allDifferenceSymbol.includes(value)) {
                    allDifferenceSymbol.push(value);
                }
            });
        });

        return bonus.points * allDifferenceSymbol.length;
    }

    public calculateBonusForNeedCard(bonus: Bonus, card: Card[]): number {
        let bonusPoints: number = 0;
        let hasNeededCard: boolean = false;

        card.map(tmpCard => {
            bonus.name?.map(symbol => {
                if (symbol === tmpCard.name) {
                    hasNeededCard = true;
                }
            });
        });

        if (hasNeededCard) {
            bonusPoints = bonus.points;
        }

        return bonusPoints;
    }

    public calculateBonusForNeedSymbol(bonus: Bonus, card: Card[]): number {
        let bonusPoints: number = 0;
        let needCount: number = 0;

        bonus.name.map(name => {
            const symbolForBonus = name;
            card.map(tmpCard => {
                tmpCard.symbols?.map(symbol => {
                    if (symbol === symbolForBonus) {
                        needCount += 1;
                    }
                });
            });
        });

        if (needCount >= bonus.need!.count) {
            bonusPoints = bonus.points;
        }
        return bonusPoints;
    }

    public calculateBonusForNeedCategory(bonus: Bonus, card: Card[]) {
        let bonusPoints: number = 0;
        let needCount: number = 0;

        bonus.name.map(name => {
            const categoryForBonus = name;
            card.map(tmpCard => {
                if (tmpCard.category === categoryForBonus) {
                    needCount += 1;
                }
            });
        });

        if (needCount >= bonus.need!.count) {
            bonusPoints = bonus.points;
        }
        return bonusPoints;
    }
}
