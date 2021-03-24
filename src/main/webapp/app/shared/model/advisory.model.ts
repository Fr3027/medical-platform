import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IAdvisory {
  id?: number;
  created?: Moment;
  updated?: Moment;
  title?: string;
  detail?: string;
  answer?: string;
  initiator?: IUser;
  proposer?: IUser;
  user?: IUser;
}

export class Advisory implements IAdvisory {
  constructor(
    public id?: number,
    public created?: Moment,
    public updated?: Moment,
    public title?: string,
    public detail?: string,
    public answer?: string,
    public initiator?: IUser,
    public proposer?: IUser,
    public user?: IUser
  ) {}
}
