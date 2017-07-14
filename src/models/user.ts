/// <reference path="../types/interfaces.d.ts"/>

import { records } from '../db';

export default class User implements IUser {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public displayName: string,
    public email: string
  ) {}

  static records: Array<User> = records;

  static create = (
    id: number,
    username: string,
    password: string,
    displayName: string,
    email: string
  ): void => {
    User.records.push(new User(id, username, password, displayName, email));
  };

  static findById = (
    id: number,
    cb: (err?: any, user?: User) => void
  ): void => {
    process.nextTick(() => {
      const records = User.records;

      for (let i = 0; i < records.length; i++) {
        if (records[i].id === id) {
          return cb(null, records[i]);
        }
      }

      cb(new Error('User ' + id + ' does not exist'));
    });
  };

  static findByEmail = (
    email: string,
    cb: (err?: any, user?: User) => void
  ): void => {
    process.nextTick(() => {
      const records = User.records;

      for (let i = 0; i < records.length; i++) {
        if (records[i].email === email) {
          return cb(null, records[i]);
        }
      }

      return cb(null, null);
    });
  };
}
