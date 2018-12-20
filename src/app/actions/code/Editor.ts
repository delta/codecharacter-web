import { action } from 'typesafe-actions';

export namespace EditorActions {
  export enum Type {
    UPDATE_CODE = 'UPDATE_CODE',
  }

  export const updateCode = (code: string) =>
    action(Type.UPDATE_CODE, {
      code,
    });
}
