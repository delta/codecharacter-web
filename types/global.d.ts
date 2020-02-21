// tslint:disable-next-line
/** Global definitions for development **/

// for style loader
declare module '*.css' {
  // tslint:disable-next-line
  const styles: any;
  export = styles;
}

// tslint:disable-next-line
declare namespace global {
  // tslint:disable-next-line
  namespace NodeJS {
    export interface Global {
      Response:Response
      Request:Request
      Headers:Headers
      // tslint:disable-next-line
      fetch:any
    } 
  }
}
// Omit type https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
