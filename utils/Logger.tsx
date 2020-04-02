export default class Logger {
  static log(...messages: any[]): void {
    this.sendLog('log', ...messages);
  }

  static warn(...messages: any[]): void {
    this.sendLog('warn', ...messages);
  }

  static error(...messages: any[]): void {
    this.sendLog('error', ...messages);
  }

  static sendLog(handler: string, ...messages: any[]): void {
    const prependedMessage = '[RC Widget]';

    /* eslint-disable no-console */
    // @ts-ignore
    console[handler](prependedMessage, ...messages);
    /* eslint-enable no-console */
  }
}
