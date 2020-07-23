import { Keyword } from '@app/entity';
import { GetKeywordRes } from '@app/type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';

@Injectable()
export class KeywordService {
  @InjectRepository(Keyword)
  private readonly keywordRepo: Repository<Keyword>;

  public async getKeyword(): Promise<GetKeywordRes[]> {
    return (await this.keywordRepo.find()).map((eKeyword: Keyword): GetKeywordRes => {
      ['users'].map((e: string) => Reflect.deleteProperty(eKeyword, e));
      return eKeyword;
    });
  }

  // only use in test

  public async postKeywords(keywords: string[]): Promise<void> {
    await Promise.all(keywords.map(async (e: string): Promise<InsertResult> =>
      this.keywordRepo.insert({ keyword: e })));
  }

  public async deleteKeywords(ids: number[]): Promise<void> {
    await Promise.all(ids.map(async (e: number): Promise<DeleteResult> =>
      this.keywordRepo.delete(e)));
  }
}
