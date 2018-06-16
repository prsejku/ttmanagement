import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  //runs before every test
    beforeEach(() => {
      //set up
        service = new MessageService()
    });

  //runs after every test
    afterEach(() => {
      //tear down
      //perform clear up activity

    });

  //testing method add
   it('should check if new message is added to the array', () => {
     //Arrange
       const newMessage = 'Hallo Verena';

     //Act
       service.add(newMessage);

     //Assert
       expect(service.messages).toContain('Hallo Verena');
   });

  //testing method clear
    it('should check method clear', () => {
      //Arrange
        const newMessage = 'Hallo Verena';
        const newMessage1 = 'Test1';
        const newMessage2 = 'Test2';
        service.add(newMessage);
        service.add(newMessage1);
        service.add(newMessage2);

      //Act
        service.clear();

      //Assert
        expect(service.messages).toEqual([]);
    });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
