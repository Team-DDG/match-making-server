import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase';

@Injectable()
export class TestUtilService {
  public async makeToken(email: string, password: string): Promise<string> {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return firebase.auth().currentUser.getIdToken();
  }

  public makeElementComparable(param1: {}, param2: {}, deleteKey: string[]): {}[] {
    const data1: object = { ...param1 };
    const data2: object = { ...param2 };
    deleteKey.forEach((e: string) => {
      Reflect.deleteProperty(data1, e);
      Reflect.deleteProperty(data2, e);
    });
    return [data1, data2];
  }
}
