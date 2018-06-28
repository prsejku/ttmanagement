import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import {MessageService} from "../message.service";

describe('MessageComponent', () => {
    let component: MessagesComponent;
    let messageServiceSpy: jasmine.SpyObj<MessageService>;

    beforeEach(() => {
        const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
        TestBed.configureTestingModule({
            providers: [
                MessagesComponent,
                {provide: MessageService, useValue: messageSpy}
            ]});

        component = TestBed.get(MessagesComponent);
        messageServiceSpy = TestBed.get(MessageService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(messageServiceSpy).toBeTruthy();
    });
});
