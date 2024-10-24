import { pool } from "@/server.js";
import type { User } from "./userModel.js";
export const users: User[] = [];

export class UserRepository {
  private pool;
  constructor() {
    this.pool = pool;
  }

  async findAllAsync() {
    try {

      const { rows } = await this.pool.query<User[]>('SELECT * FROM tele_hunter where id <> \'0\' ORDER BY score DESC LIMIT 100 ');

      // console.log(rows); // 结果集
      return rows;
      // console.log(fields); // 额外的元数据（如果有的话）
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findAffiliateByIdAsync(id: string) {
    try {
      const { rows } = await this.pool.query('SELECT * FROM tele_hunter WHERE referrerid = $1 ORDER BY affiliateamount DESC', [id]);

      // console.log(results); // 结果集
      return rows;
      // console.log(fields); // 额外的元数据（如果有的话）
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findByIdAsync(id: string) {
    try {
      const { rows } = await this.pool.query('SELECT * FROM tele_hunter WHERE id = $1', [id]);

      console.log(rows); // 结果集
      // console.log(fields); // 额外的元数据（如果有的话）
      return rows.find((user) => user.id.toString() === id) || null;

    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async createNewUser(
    id: string,
    referrerID: string,
    parentReferrerID: string,
    affiliateAmount: number,
    subAffiliateAmount: number,
    createdAt: Date,
    updatedAt: Date,
    tgHandle: string,
  ) {
    try {
      const { rows } = await this.pool.query('INSERT INTO tele_hunter(id, referrerid, parentreferrerid, affiliateamount, subaffiliateamount, createdat, updatedat, score, tghandle) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [
        id,
        referrerID,
        parentReferrerID,
        affiliateAmount,
        subAffiliateAmount,
        createdAt,
        updatedAt,
        10000,
        tgHandle
      ]);
      console.log(rows)
    } catch (err) {
      console.log(err);
    }
  }

  async updateReferrerAffiliate(
    id: string,
    affiliateAmount: number,
    updatedAt: Date,
    score: number
  ) {
    try {
      await this.pool.query('UPDATE tele_hunter SET affiliateamount = $1, updatedat = $2, score = $3 WHERE id = $4', [affiliateAmount, updatedAt, score, id]);
    } catch (err) {
      console.log(err);
    }
  }

  async updateParentReferrerAffiliate(
    id: string,
    subAffiliateAmount: number,
    updatedAt: Date,
    score: number
  ) {
    try {
      await this.pool.query('UPDATE tele_hunter SET subaffiliateAmount = $1, updatedat = $2, score = $3 WHERE id = $4', [subAffiliateAmount, updatedAt, score, id]);
    } catch (err) {
      console.log(err);
    }
  }

  // async updateUser(
  //   id: string,
  //   pfpURL: string,
  //   tgHandle: string,
  //   referrerID: string,
  //   parentReferrerID: string,
  //   affiliateAmount: number,
  //   subAffiliateAmount: number,
  //   createdAt: Date,
  //   updatedAt: Date,
  // ) {
  //   try {
  //     const newUser = {
  //       id,
  //       pfpURL,
  //       tgHandle,
  //       referrerID,
  //       parentReferrerID,
  //       affiliateAmount,
  //       subAffiliateAmount,
  //       createdAt,
  //       updatedAt,
  //     }

  //     await this.pool.query('UPDATE tele_hunter SET ? WHERE id = ?', [newUser, id]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
