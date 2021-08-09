/* eslint-disable class-methods-use-this */
import { ajax } from 'rxjs/ajax';
import { interval, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export default class Widget {
  constructor() {
    this.server = 'https://ahj-hw-4-1-rxjs-polling-back.herokuapp.com/messages/unread';
    this.messages = document.querySelector('.messages');
    this.parentEl = document.querySelector('.email-box');
  }

  init() {
    const data$ = interval(6000).pipe(
      switchMap(() => ajax(this.server).pipe(
        map((result) => result.response),
        catchError(() => of({ timestamp: new Date().toLocaleString('ru'), messages: [] })),
      )),
    );

    data$.subscribe((result) => {
      const receivedData = result || { timestamp: new Date().toLocaleString('ru'), messages: [] };
      receivedData.messages.forEach((item) => {
        this.messages.prepend(this.renderMessage(item));
      });
    });
  }

  renderMessage(message) {
    this.message = document.createElement('div');
    this.message.className = 'message';
    const timeFormat = { minute: '2-digit', hour: '2-digit' };
    const dateFormat = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const received = new Date(message.received);
    this.message.innerHTML = `
    <div class="msg-from">${message.from}</div>
    <div class="msg-subject">${this.editSubject(message.subject)}</div>
    <div class="msg-received">${received.toLocaleString('ru', timeFormat)} ${received.toLocaleString('ru', dateFormat)}</div>
    `;
    return this.message;
  }

  editSubject(text) {
    const subject = text.trim();
    if (subject.length > 15) {
      return `${subject.slice(0, 15)}...`;
    }
    return subject;
  }
}
