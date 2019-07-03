import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/*
* Receive messages: 
        this.subscription = this.messageService.getMessage().subscribe(message => {
          if (message) {
            this.messages.push(message);
          } else {
            // clear messages when empty message received
            this.messages = [];
          }
        });
*

  Send messages:
   this.messageService.sendMessage('Message from Home Component to App Component!');
*/

@Injectable({ providedIn: 'root' })
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
