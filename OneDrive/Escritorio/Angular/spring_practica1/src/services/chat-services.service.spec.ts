import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat-services.service';

describe('ChatServicesService', () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
