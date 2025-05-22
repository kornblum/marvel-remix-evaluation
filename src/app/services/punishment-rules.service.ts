import { Injectable } from '@angular/core';
import { Card, Punishment } from '../types/card.type';

@Injectable({
    providedIn: 'root',
})
export class PunishmentRulesService {
    public calculatePunishmentForEverySymbol(punishment: Punishment, card: Card[]): number {
        let punishmentPoints: number = 0;
        punishment.name.map(name => {
            const symbolForPunishment = name;
            card.map(tmpCard => {
                tmpCard.symbols?.map(symbol => {
                    if (symbol === symbolForPunishment) {
                        punishmentPoints += punishment.points;
                    }
                });
            });
        });

        return punishmentPoints;
    }

    public calculatePunishmentForEveryCategory(punishment: Punishment, card: Card[]): number {
        let punishmentPoints: number = 0;
        punishment.name.map(name => {
            const categoryForPunishment = name;
            card.map(tmpCard => {
                if (tmpCard.category === categoryForPunishment) {
                    punishmentPoints += punishment.points;
                }
            });
        });

        return punishmentPoints;
    }

    public calculatePunishmentForNeedSymbol(punishment: Punishment, card: Card[]): number {
        let punishmentPoints: number = 0;
        let needCount: number = 0;

        punishment.name.map(name => {
            const symbolForBonus = name;
            card.map(tmpCard => {
                tmpCard.symbols?.map(symbol => {
                    if (symbol === symbolForBonus) {
                        needCount += 1;
                    }
                });
            });
        });

        if (needCount < punishment.need!.count) {
            punishmentPoints = punishment.points;
        }

        return punishmentPoints;
    }
}
