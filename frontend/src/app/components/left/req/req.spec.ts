import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Req } from './req';

describe('Req', () => {
  let component: Req;
  let fixture: ComponentFixture<Req>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Req]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Req);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
