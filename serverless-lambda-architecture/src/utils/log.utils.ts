export class AppLogger {
  private static format(context: string, ...messages: any[]) {
    const message = messages.flat().reduce((marr, msg) => {
      try {
        marr.push(JSON.stringify(msg));
      } catch {
      } finally {
        return marr;
      }
    }, []);

    return `${new Date().toUTCString()} :: ${context} :: ${message}`;
  }

  static log(context: string, ...messages: any[]) {
    console.log(AppLogger.format(context, messages));
  }

  static error(context: string, ...messages: any[]) {
    console.error(AppLogger.format(context, messages));
  }
}
