import React from 'react';
import Realm, { ObjectSchema } from 'realm';
import { createRealmContext } from '@realm/react';

// Define your object model
export class SavedMix extends Realm.Object<SavedMix> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  data!: string;
  type!: string;

  static schema: ObjectSchema = {
    name: 'SavedMix',
    properties: {
      _id: 'objectId',
      name: 'string',
      data: 'string',
      type: 'string',
    },
    primaryKey: '_id',
  };
}

// Create a configuration object
const realmConfig: Realm.Configuration = {
  schema: [SavedMix],
  schemaVersion: 2,
};

const RealmContext = createRealmContext(realmConfig);

export const { RealmProvider, useRealm, useObject, useQuery } = RealmContext;
