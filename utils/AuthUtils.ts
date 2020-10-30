import * as Keychain from 'react-native-keychain';

const ACCESS_GROUP = 'group.getriser';
const SERVICE = 'com.getriser.app';

export const getToken = async (): Promise<string> => {
  const res = await Keychain.getGenericPassword({
    accessGroup: ACCESS_GROUP,
    service: SERVICE,
  });

  if (!res) {
    return '';
  }

  return res.password;
};

export const saveToken = async (token: string) => {
  return Keychain.setGenericPassword('token', token, {
    accessGroup: ACCESS_GROUP,
    service: SERVICE,
  });
};

export const clearToken = async () => {
  await Keychain.resetGenericPassword({
    accessGroup: ACCESS_GROUP,
    service: SERVICE,
  });
};
