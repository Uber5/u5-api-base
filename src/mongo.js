import * as R from 'ramda'
import { ObjectId } from 'mongodb'
// see https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object
// TODO: should rather be in some 'functional-utils.js'?
const renameKeys = R.curry((keysMap, obj) => {
  return R.reduce((acc, key) => {
    acc[keysMap[key] || key] = obj[key];
    return acc;
  }, {}, R.keys(obj));
});

export const externalizeIdOf = renameKeys({ _id: 'id' })

export const internalize = id => new ObjectId(id)
