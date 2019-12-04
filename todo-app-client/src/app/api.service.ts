import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private socket: Socket
  ) {
  }

  sendMessageToServer(data: any): Observable<any> {
    this.socket.emit('msgToServer', data);
    return this.socket.fromEvent('msgToServer');
  }

  getMessageFromServer(): Observable<number> {
    return this.socket.fromEvent('msgToClient');
  }
}
