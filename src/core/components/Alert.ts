import { Component } from './Component';

export class Alert extends Component {
  get typeOf(): string {
    return 'alert';
  }
}
