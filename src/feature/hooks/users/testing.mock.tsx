import { USER, USER2, USER3 } from '../../data/usermock';

export const mockUser1 = USER;
mockUser1.uid = '000001';
export const mockUser2 = USER2;
mockUser2.uid = '000002';
export const mockUsers = [mockUser1, mockUser2];
export const mockAddUser = USER3;
mockAddUser.uid = '000003';
export const mockUpdateUser = { ...mockUser2, name: 'Update User' };
