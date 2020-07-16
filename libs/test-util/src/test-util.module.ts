import { config } from '@app/config';
import { Module } from '@nestjs/common';
import * as firebase from 'firebase';
import { TestUtilService } from './test-util.service';

@Module({
  exports: [TestUtilService],
  providers: [TestUtilService],
})
export class TestUtilModule {
  public constructor() {
    firebase.initializeApp(config.firebaseConfig);
  }
}
