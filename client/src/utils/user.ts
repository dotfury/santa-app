import axios from 'axios';

import { messages, statuses } from './constants';

type ValidatedUser = { status: string; message: string; address?: string }
type User = { username: string; uid: string; }
type UserProfile = { userUid: string; address: string; birthdate: string }

const MAX_AGE = 10;
const YEAR_IN_MS = 3.15576e+10;

const getUsers = async () => {
  return await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json');
};

const getUserProfiles = async () => {
  return await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json');
};

const getAge = (birthDate: string) => Math.floor(((new Date() as any) - new Date(birthDate).getTime()) / YEAR_IN_MS);
const isValidDate = (date: string) => !isNaN(new Date(date) as any);

const isUserAgeValid = async (userId: string): Promise<{ address: string | null }> => {
  const userProfiles = await  getUserProfiles();

  const profile = userProfiles.data.find((up: UserProfile) => up.userUid === userId);
  const { birthdate, address } = profile;
  const isValid = isValidDate(birthdate) && (getAge(birthdate) < MAX_AGE);
  
  if (isValid) {
    return { address };
  } else {
    return { address: null };
  }
};

const isUserRegistered = async (userId: string): Promise<User> => {
  const registeredUsers = await getUsers();
  const currentUser = registeredUsers.data.find((u: User) => u.username === userId);

  return currentUser;
};

const validateUser = async (userId: string): Promise<ValidatedUser> => {
  const user = await isUserRegistered(userId);
  
  if (!user) {
    return { status: statuses.FAILURE, message: messages.NO_USER };
  }
  
  const ageValidationProfile = await isUserAgeValid(user.uid);

  if (ageValidationProfile.address == null) {
    return { status: statuses.FAILURE, message: messages.BAD_AGE };
  }

  return { status: statuses.SUCCESS, message: messages.OK, address: ageValidationProfile.address };
}

export default validateUser;