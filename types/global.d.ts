/* Global definitions for development */

// for style loader
declare module '*.css' {
  // tslint:disable-next-line:no-any
  const styles: any;
  export = styles;
}

// Omit type https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
