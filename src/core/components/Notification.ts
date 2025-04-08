import { Component } from './Component';

export class Notification extends Component {
  get typeOf(): string {
    return 'notification';
  }
}
