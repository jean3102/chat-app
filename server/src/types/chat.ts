import { User } from './userList';

export type Message = {
	from: User;
	message: string;
	time: string;
};
