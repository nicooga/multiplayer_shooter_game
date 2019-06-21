import http from 'http'
import WebSocket from 'ws'

export default class ClientMock extends WebSocket {
  upgradeReq?: http.IncomingMessage;
  id: string = '1';
  options: any = {};
  sessionId: string = 'asdf';
  pingCount: number = 1;
  remote?: boolean;
  auth?: any;

  constructor(public address: string = 'http://example.com') {
    super(address)
  }

  // Overrode it to avoid issue while running tests
  emit() : boolean { return false }
}
