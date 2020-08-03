import { User } from '@app/entity';
import { GetLolRes, PatchUserLolDto } from '@app/type';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as axios from 'axios';
import { AxiosResponse } from 'axios';
import { Node, parse } from 'node-html-parser';
import { Repository } from 'typeorm';

@Injectable()
export class LolService {
  @InjectRepository(User)
  private readonly userRepo: Repository<User>;

  public async getLol(param: string, isParamId: boolean): Promise<GetLolRes> {

    const summonerName: string = isParamId ? (await this.userRepo.findOne(param)).summonerName : param;

    const { data: summonerData }: AxiosResponse = await axios.default
      .get(encodeURI(`https://www.op.gg/summoner/userName=${summonerName}?l=ko_KR`), {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });

    const root: Node = parse(summonerData).childNodes[2].childNodes[4].childNodes[1]
      .childNodes[4].childNodes[1].childNodes[1];

    if (root.childNodes[1]['classNames'][0] === 'Title') {
      throw new NotFoundException();
    }

    const res: GetLolRes = new GetLolRes();

    const header: Node = root.childNodes[1];

    // icon {

    res.icon = 'https:';
    header.childNodes[5].childNodes[1].childNodes.forEach((e: Node) => {
      if (e['tagName'] === 'img') {
        res.icon = res.icon.concat(e['rawAttrs'].split('"')[1]);
      }
    });
    if (res.icon === 'https:') {
      res.icon = res.icon.concat(header.childNodes[3].childNodes[1].childNodes[1]['rawAttrs'].split('"')[1]);
    }

    // level

    header.childNodes.forEach((e: Node) => {
      if (e['classNames'] && e['classNames'][0] === 'Face') {
        e.childNodes[1].childNodes.forEach((e_2: Node) => {
          if (e_2['classNames'] && e_2['classNames'][0] === 'Level') {
            res.level = parseInt(e_2.childNodes[0].rawText);
          }
        });
      }
    });

    // mosts

    if (root.childNodes[9].childNodes[3].childNodes[1]
      .childNodes[5]['classNames'][0] !== 'opgg__notice--left') {
      const most: Node = root.childNodes[9].childNodes[3].childNodes[1]
        .childNodes[5].childNodes[3].childNodes[1]
        .childNodes[1];

      most.childNodes.forEach((e: Node, i: number) => {
        if (1 === i % 2 && i < 6) {
          res.mosts.push({
            evaluation: e.childNodes[5].childNodes[1].childNodes[1]
              .childNodes[0].rawText,
            gameCount: parseInt(e.childNodes[7].childNodes[3].childNodes[0].rawText.split(' ')[0]),
            image: `https:${e.childNodes[1].childNodes[1].childNodes[1]['rawAttrs'].split('"')[1]}`,
            name: e.childNodes[1]['rawAttrs'].split('"')[3].trim(),
            winRate: parseInt(e.childNodes[7].childNodes[1].childNodes[0].rawText.trim().split('%')[0]),
          });
        }
      });
    }

    // rank

    const rank: Node = root.childNodes[9].childNodes[3].childNodes[1];

    if (!root.childNodes[9].childNodes[3].childNodes[1].childNodes[1].childNodes[1]['classNames'][1]) {
      res.soloRank = {
        image: `https:${rank.childNodes[1].childNodes[1].childNodes[1]
          .childNodes[1]['rawAttrs'].split('"')[1]}`,
        name: rank.childNodes[1].childNodes[1].childNodes[3]
          .childNodes[3].childNodes[0].rawText,
      };
    }

    if (!root.childNodes[9].childNodes[3].childNodes[1].childNodes[3].childNodes[3]['classNames'][1]) {
      res.flexRank = {
        image: `https:${rank.childNodes[3].childNodes[1]['rawAttrs'].split('"')[1]}`,
        name: rank.childNodes[3].childNodes[3].childNodes[3]
          .childNodes[0].rawText.trim(),
      };
    }

    // summonerName

    header.childNodes.forEach((e: Node) => {
      if (e['classNames'] && e['classNames'][0] === 'Profile') {
        e.childNodes[1].childNodes.forEach((e_2: Node) => {
          if (e_2['classNames'] && e_2['classNames'][0] === 'Name') {
            res.summonerName = e_2.childNodes[0].rawText;
          }
        });
      }
    });

    // evaluation

    if (root.childNodes[9].childNodes[3].childNodes[3]
        .childNodes[1].childNodes[3].childNodes[1]['rawAttrs'].split('"')[1]
      !== 'Box ErrorMessage') {
      res.evaluation = root.childNodes[9].childNodes[3].childNodes[3]
        .childNodes[1].childNodes[3].childNodes[3]
        .childNodes[1].childNodes[1].childNodes[3]
        .childNodes[3].childNodes[3].childNodes[1]
        .childNodes[0].rawText;
    }

    return res;
  }

  public async patchUserLol(id: string, payload: PatchUserLolDto): Promise<void> {
    let numOfUser: number = await this.userRepo.count({ id });

    if (1 > numOfUser) {
      throw new NotFoundException();
    }

    numOfUser = await this.userRepo.count(payload);

    if (0 < numOfUser) {
      throw new ConflictException();
    }

    await this.userRepo.update(id, payload);
  }
}
