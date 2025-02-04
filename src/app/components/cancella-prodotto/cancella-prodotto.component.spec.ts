import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellaProdottoComponent } from './cancella-prodotto.component';

describe('CancellaProdottoComponent', () => {
  let component: CancellaProdottoComponent;
  let fixture: ComponentFixture<CancellaProdottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancellaProdottoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancellaProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
