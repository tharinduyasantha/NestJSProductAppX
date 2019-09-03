import { HttpException, HttpStatus } from '@nestjs/common';

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const Phone_REGEX = /^[0-9]*$/;
export const Number_REGEX = /^[0-9]*$/;
export const AlphaNumeric_REGEX = /^[a-z\d\-_\s]+$/i;
export const Alphabatic_REGEX = /^[a-zA-Z ]*$/;
export const Date_REGEX = /^(0[1-9]|[12][0-9]|3[01])[\- \/.](?:(0[1-9]|1[012])[\- \/.](19|20)[0-9]{2})$/;
export const Number_REGEX_withComma = /(\d{0,3},)?(\d{3},)?\d{0,3}/;

export const getUrlParameter = (name: string, url: string) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(url);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const number_ranges = [
  { divider: 1e18, suffix: 'E' },
  { divider: 1e15, suffix: 'P' },
  { divider: 1e12, suffix: 'T' },
  { divider: 1e9, suffix: 'G' },
  { divider: 1e6, suffix: 'M' },
  { divider: 1e3, suffix: 'k' },
];

export const formatMatricNumber = (n): string => {
  for (var i = 0; i < number_ranges.length; i++) {
    if (n >= number_ranges[i].divider) {
      return (
        (n / number_ranges[i].divider).toString() + number_ranges[i].suffix
      );
    }
  }
  return n.toString();
};

export const roundNumber = (v: number, delta: number): number => {
  return Math.round(v / delta) * delta;
};

export const getInt = (vl: any): number => {
  const x = parseInt(vl, 10);
  return isNaN(x) ? 0 : x;
};
export const getDateString = (val: any): string => {
  const Date1 = new Date(val);
  const dd = Date1.getDate();
  const mm = Date1.getMonth() + 1; // January is 0!

  let dds = '' + dd;
  let mms = '' + mm;
  const yyyy = Date1.getFullYear();
  if (dd < 10) {
    dds = '0' + dd;
  }
  if (mm < 10) {
    mms = '0' + mm;
  }
  return yyyy + '-' + mms + '-' + dds;
};

export const cloneObject = (data: any): any => {
  return JSON.parse(JSON.stringify(data));
};
export const cloneAndClearMongodbObject = (data: any): any => {
  const datav = JSON.parse(JSON.stringify(data));
  delete datav['__v'];
  return datav;
};
export const cleanMongodbArray = (data: any[]): any[] => {
  return data.map(item => cloneAndClearMongodbObject(item));
};
export const cloneMap = (data: Map<any, any>): Map<any, any> => {
  const clonedMap = new Map<any, any>();
  data.forEach((v: any, k: any) => {
    clonedMap.set(k, cloneObject(v));
  });
  return clonedMap;
};

export const findIdByName = (
  objectList: any[],
  property: string,
  value: any,
): any => {
  return objectList.find(item => item[property] == value).id || null;
};
export const create_name_id = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .split(' ')
    .join('-');
};
export const convertToUFirstWordsStyle = (value: string): string => {
  return value == null
    ? ''
    : value
        .split(' ')
        .map(item => {
          item = item.toLowerCase();
          return item.charAt(0).toUpperCase() + item.slice(1);
        })
        .join(' ');
};
const possibleDictionary =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
export const dictionaryTimeRandom = (len: number): string => {
  let text = '';

  for (var i = 0; i < len; i++)
    text += possibleDictionary.charAt(
      Math.floor(Math.random() * possibleDictionary.length),
    );

  return text + Date.now();
};

export const validInput = str => {
  if (str == null || str == undefined) {
    return false;
  } else if (typeof str == 'string' && str.trim().length < 1) {
    return false;
  } else if (typeof str != 'string') {
    return true;
  } else {
    return true;
  }
};
export const clearInputAsString = str => {
  if (str == null || str == undefined) {
    return null;
  } else {
    return str.trim();
  }
};
export const extractErrors = errObj => {
  if (
    errObj == null ||
    errObj == undefined ||
    errObj.errors == null ||
    errObj.errors == undefined
  ) {
    return { propery: 'Unknown', message: 'Unknown error' };
  }
  let keys = Object.keys(errObj.errors);
  return keys.map(key => {
    let msg = '';
    if (errObj.errors[key].message) {
      msg = errObj.errors[key].message;
    } else if (
      errObj.errors[key].properties &&
      errObj.errors[key].properties.message
    ) {
      msg = errObj.errors[key].properties.message;
    }
    return { propery: key, message: msg };
  });
};
export const requiredFieldsValidated = (obj, fields) => {
  for (let i = 0; i < fields.length; i++) {
    if (!validInput(obj[fields[i]])) {
      return {
        custome_error: 'CUSTOM_ERROR_TOKEN',
        field: fields[i],
        message: fields[i] + ' required',
      };
    }
  }
  return null;
};

export const error_handler = (err, final_error = null) => {
  if (typeof err == 'string') {
    return new HttpException({ message: err }, HttpStatus.BAD_REQUEST);
  } else if (err && err.custome_error == 'CUSTOM_ERROR_TOKEN') {
    delete err.custome_error;
    return new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
  } else if (final_error) {
    return new HttpException(
      { message: final_error },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  return new HttpException(
    { message: 'EXPECTATION_FAILED' },
    HttpStatus.BAD_REQUEST,
  );
};

export const nonEmpty = (str: string): boolean => {
  if (str == undefined || str == null) {
    return false;
  } else if (str.trim().length < 1) {
    return false;
  } else {
    return true;
  }
};
export const clearString = (str: string): string => {
  if (str == undefined && str == null) {
    return null;
  } else {
    return str.trim();
  }
};

export const rangeQuerybuilder = (
  query: any,
  qitem: {
    range_start: number;
    range_end: number;
    minIgnore: boolean;
    maxIgnore: boolean;
  },
  name: string,
): any => {
  let queryitem: any = {};
  if (!qitem.maxIgnore) {
    queryitem['$lte'] = qitem.range_end;
  }
  if (!qitem.minIgnore) {
    queryitem['$gte'] = qitem.range_start;
  }
  if (!qitem.minIgnore || !qitem.maxIgnore) {
    query[name] = queryitem;
  }
  return query;
};

const MongoObjectId = require('mongoose').Types.ObjectId;
export const validateObjectId = (id: string) => {
  return (
    id != undefined && id != null && id != 'null' && MongoObjectId.isValid(id)
  );
};

export const getNestedKey = (obj: any, key: string): any => {
  if (key.includes('.')) {
    const keys = key.split('.');
    return obj[keys[0]][keys[1]];
  } else {
    return obj[key];
  }
};
