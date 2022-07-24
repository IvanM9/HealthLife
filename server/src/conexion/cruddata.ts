export class Cruddata {
  private _tabla: string;
  public get tabla(): string {
    return this._tabla;
  }
  public set tabla(value: string) {
    this._tabla = value;
  }

  private _campos: string[];
  public get campos(): string[] {
    return this._campos;
  }
  public set campos(value: string[]) {
    this._campos = value;
  }

  private _valores: string[];

  public get valores(): string[] {
    return this._valores;
  }
  public set valores(value: string[]) {
    this._valores = value;
  }
}
