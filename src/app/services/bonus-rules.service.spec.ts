import { TestBed } from '@angular/core/testing';

import { BonusRulesService } from './bonus-rules.service';

describe('BonusRulesService', () => {
    let service: BonusRulesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BonusRulesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
