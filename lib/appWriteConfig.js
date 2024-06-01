import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from 'react-native-appwrite';

export const appWriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.jsm.aora',
  projectId: '6658a0000005b3773665',
  storageId: '6658a4130026e9abce18',
  databaseId: '6658a0fc000d196aad4d',
  userCollectionId: '6658a11e002439ebacd2',
  videoCollectionId: '6658a14b0008ef2dad23',
};

const client = new Client();
client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

export const account = new Account(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
