import { TestBed } from '@angular/core/testing';

import { PunishmentRulesService } from './punishment-rules.service';

describe('PunishmentRulesService', () => {
    let service: PunishmentRulesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PunishmentRulesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
