import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEspecialistaComponent } from './gestion-especialista.component';

describe('GestionEspecialistaComponent', () => {
  let component: GestionEspecialistaComponent;
  let fixture: ComponentFixture<GestionEspecialistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEspecialistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
