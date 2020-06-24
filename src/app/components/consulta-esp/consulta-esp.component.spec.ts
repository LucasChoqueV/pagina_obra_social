import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEspComponent } from './consulta-esp.component';

describe('ConsultaEspComponent', () => {
  let component: ConsultaEspComponent;
  let fixture: ComponentFixture<ConsultaEspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaEspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
