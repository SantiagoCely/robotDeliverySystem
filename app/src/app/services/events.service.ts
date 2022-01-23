import { Injectable } from '@angular/core';
import { /*Subject, Subscription,*/ BehaviorSubject} from 'rxjs';


@Injectable({providedIn: 'root'})
export class EventsService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor (){}
  changeMessage(message: string){
    this.messageSource.next(message)
  }
  /*
  private channels: { [key: string]: Subject<any>; } ={};

  subscribe(topic: string, observer: (_: any) => void): Subscription {
    if (!this.channels[topic]){
      this.channels[topic] = new Subject<any>();
    }
    return this.channels[topic].subscribe(observer);
  }

  publish(topic: string, data?: any): void {
        const subject = this.channels[topic];
        if (!subject) {
            // Or you can create a new subject for future subscribers
            return;
        }

        subject.next(data);
  }

  destroy(topic: string): null {
        const subject = this.channels[topic];
        if (!subject) {
            return;
        }

        subject.complete();
        delete this.channels[topic];
  }

*/
}
