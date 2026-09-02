var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_3) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k2) => typeof obj[obj[k2]] !== "number");
    const filtered = {};
    for (const k2 of validKeys) {
      filtered[k2] = obj[k2];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e11) {
      return obj[e11];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_3, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t8 = typeof data;
  switch (t8) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i10 = 0;
          while (i10 < issue.path.length) {
            const el = issue.path[i10];
            const terminal = i10 === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i10++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message2;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message2 = "Required";
      } else {
        message2 = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message2 = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message2 = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message2 = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message2 = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message2 = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message2 = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message2 = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message2 = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message2 = `${message2} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message2 = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message2 = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message2 = `Invalid ${issue.validation}`;
      } else {
        message2 = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message2 = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message2 = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message2 = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message2 = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message2 = "Number must be finite";
      break;
    default:
      message2 = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message: message2 };
};
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m4) => !!m4).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x3) => !!x3)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s11 of results) {
      if (s11.status === "aborted")
        return INVALID;
      if (s11.status === "dirty")
        status.dirty();
      arrayValue.push(s11.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x3) => x3.status === "aborted";
var isDirty = (x3) => x3.status === "dirty";
var isValid = (x3) => x3.status === "valid";
var isAsync = (x3) => typeof Promise !== "undefined" && x3 instanceof Promise;

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message2) => typeof message2 === "string" ? { message: message2 } : message2 || {};
  errorUtil2.toString = (message2) => typeof message2 === "string" ? message2 : message2?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message: message2 } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message2 ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message2 ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message2 ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message2) {
    const getIssueProperties = (val) => {
      if (typeof message2 === "string" || typeof message2 === "undefined") {
        return { message: message2 };
      } else if (typeof message2 === "function") {
        return message2(val);
      } else {
        return message2;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message2) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message2)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message2) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message2) });
  }
  url(message2) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message2) });
  }
  emoji(message2) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message2) });
  }
  uuid(message2) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message2) });
  }
  nanoid(message2) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message2) });
  }
  cuid(message2) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message2) });
  }
  cuid2(message2) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message2) });
  }
  ulid(message2) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message2) });
  }
  base64(message2) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message2) });
  }
  base64url(message2) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message2)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message2) {
    return this._addCheck({ kind: "date", message: message2 });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message2) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message2) });
  }
  regex(regex, message2) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message2)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message2) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  endsWith(value, message2) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  min(minLength, message2) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message2)
    });
  }
  max(maxLength, message2) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message2)
    });
  }
  length(len, message2) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message2)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message2) {
    return this.min(1, errorUtil.errToObj(message2));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message2) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message2)
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  finite(message2) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message2)
    });
  }
  safe(message2) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message2) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  max(maxDate, message2) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i10) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i10));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i10) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i10));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message2) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message2) }
    });
  }
  max(maxLength, message2) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message2) }
    });
  }
  length(len, message2) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message2) }
    });
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message2) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message2 !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message2).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a5, b4) {
  const aType = getParsedType(a5);
  const bType = getParsedType(b4);
  if (a5 === b4) {
    return { valid: true, data: a5 };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b4);
    const sharedKeys = util.objectKeys(a5).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a5, ...b4 };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a5[key], b4[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a5.length !== b4.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a5.length; index++) {
      const itemA = a5[index];
      const itemB = b4[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a5 === +b4) {
    return { valid: true, data: a5 };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x3) => !!x3);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i10) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i10)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message2) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message2) }
    });
  }
  max(maxSize, message2) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message2) }
    });
  }
  size(size, message2) {
    return this.min(size, message2).max(size, message2);
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x3) => !!x3),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x3) => !!x3),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e11) => {
          error.addIssue(makeArgsIssue(args, e11));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e11) => {
          error.addIssue(makeReturnsIssue(result, e11));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect2 = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect2.type === "preprocess") {
      const processed = effect2.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect2.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect2.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect2.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect2.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect2.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect2);
  }
};
ZodEffects.create = (schema, effect2, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect: effect2,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = /* @__PURE__ */ Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a5, b4) {
    return new _ZodPipeline({
      in: a5,
      out: b4,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p4 = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p22 = typeof p4 === "string" ? { message: p4 } : p4;
  return p22;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r9 = check(data);
      if (r9 instanceof Promise) {
        return r9.then((r10) => {
          if (!r10) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r9) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;

// node_modules/@a2ui/web_core/src/v0_9/errors.js
var A2uiError = class extends Error {
  constructor(message2, code = "UNKNOWN_ERROR") {
    super(message2);
    this.name = this.constructor.name;
    this.code = code;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var A2uiValidationError = class extends A2uiError {
  constructor(message2, details) {
    super(message2, "VALIDATION_ERROR");
    this.details = details;
  }
};
var A2uiDataError = class extends A2uiError {
  constructor(message2, path) {
    super(message2, "DATA_ERROR");
    this.path = path;
  }
};
var A2uiExpressionError = class extends A2uiError {
  constructor(message2, expression, details) {
    super(message2, "EXPRESSION_ERROR");
    this.expression = expression;
    this.details = details;
  }
};
var A2uiStateError = class extends A2uiError {
  constructor(message2) {
    super(message2, "STATE_ERROR");
  }
};

// node_modules/@a2ui/web_core/src/v0_9/catalog/types.js
function createFunctionImplementation(api, execute) {
  return {
    name: api.name,
    returnType: api.returnType,
    schema: api.schema,
    execute
  };
}
var Catalog = class {
  constructor(id, components, functions = [], themeSchema) {
    this.id = id;
    const compMap = /* @__PURE__ */ new Map();
    for (const comp of components) {
      compMap.set(comp.name, comp);
    }
    this.components = compMap;
    const funcMap = /* @__PURE__ */ new Map();
    for (const fn of functions) {
      funcMap.set(fn.name, fn);
    }
    this.functions = funcMap;
    this.themeSchema = themeSchema;
    this.invoker = (name, rawArgs, ctx, abortSignal) => {
      const fn = this.functions.get(name);
      if (!fn) {
        throw new A2uiExpressionError(`Function not found in catalog '${this.id}': ${name}`, name);
      }
      try {
        const safeArgs = fn.schema.parse(rawArgs);
        return fn.execute(safeArgs, ctx, abortSignal);
      } catch (e11) {
        if (e11?.name === "ZodError" || e11 instanceof external_exports.ZodError) {
          throw new A2uiExpressionError(`Validation failed for function '${name}': ${e11.message}`, name, e11.errors ?? e11.issues);
        }
        throw e11;
      }
    };
  }
};

// node_modules/@a2ui/web_core/src/v0_9/common/events.js
var EventEmitter = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
  }
  /**
   * Subscribes to the event.
   *
   * @param listener The listener function to call when the event is emitted.
   * @returns A subscription object that can be used to unsubscribe.
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return {
      unsubscribe: () => this.listeners.delete(listener)
    };
  }
  /**
   * Emits an event to all subscribers.
   *
   * @param data The data to pass to subscribers.
   */
  async emit(data) {
    for (const listener of this.listeners) {
      try {
        await listener(data);
      } catch (e11) {
        console.error("EventEmitter error:", e11);
      }
    }
  }
  /**
   * Removes all listeners.
   */
  dispose() {
    this.listeners.clear();
  }
};

// node_modules/@preact/signals-core/dist/signals-core.module.js
var i = /* @__PURE__ */ Symbol.for("preact-signals");
function t() {
  if (!(v > 1)) {
    var i10, t8 = false;
    !(function() {
      var i11 = c;
      c = void 0;
      while (void 0 !== i11) {
        var t9 = i11.S;
        if (t9.v === i11.v) {
          for (var n13 = t9.t; void 0 !== n13; n13 = n13.x) if (n13.i === i11.i) n13.i = t9.i;
        }
        i11 = i11.o;
      }
    })();
    while (void 0 !== h) {
      var n12 = h;
      h = void 0;
      s++;
      while (void 0 !== n12) {
        var r9 = n12.u;
        n12.u = void 0;
        n12.f &= -3;
        if (!(8 & n12.f) && w(n12)) try {
          n12.c();
        } catch (n13) {
          if (!t8) {
            i10 = n13;
            t8 = true;
          }
        }
        n12 = r9;
      }
    }
    s = 0;
    v--;
    if (t8) throw i10;
  } else v--;
}
function n(i10) {
  if (v > 0) return i10();
  e = ++u;
  v++;
  try {
    return i10();
  } finally {
    t();
  }
}
var r;
var o = void 0;
function f(i10) {
  var t8 = o, n12 = r;
  o = void 0;
  r = void 0;
  try {
    return i10();
  } finally {
    o = t8;
    r = n12;
  }
}
var h = void 0;
var v = 0;
var s = 0;
var u = 0;
var e = 0;
var c = void 0;
var d = 0;
function a(i10) {
  if (void 0 !== o) {
    var t8 = i10.n;
    if (void 0 === t8 || t8.t !== o) {
      t8 = { i: 0, S: i10, p: o.s, n: void 0, t: o, e: void 0, x: void 0, r: t8 };
      if (void 0 !== o.s) o.s.n = t8;
      o.s = t8;
      i10.n = t8;
      if (32 & o.f) i10.S(t8);
      return t8;
    } else if (-1 === t8.i) {
      t8.i = 0;
      if (void 0 !== t8.n) {
        t8.n.p = t8.p;
        if (void 0 !== t8.p) t8.p.n = t8.n;
        t8.p = o.s;
        t8.n = void 0;
        o.s.n = t8;
        o.s = t8;
      }
      return t8;
    }
  }
}
function l(i10, t8) {
  this.v = i10;
  this.i = 0;
  this.n = void 0;
  this.t = void 0;
  this.l = 0;
  this.W = null == t8 ? void 0 : t8.watched;
  this.Z = null == t8 ? void 0 : t8.unwatched;
  this.name = null == t8 ? void 0 : t8.name;
}
l.prototype.brand = i;
l.prototype.h = function() {
  return true;
};
l.prototype.S = function(i10) {
  var t8 = this, n12 = this.t;
  if (n12 !== i10 && void 0 === i10.e) {
    i10.x = n12;
    this.t = i10;
    if (void 0 !== n12) n12.e = i10;
    else f(function() {
      var i11;
      null == (i11 = t8.W) || i11.call(t8);
    });
  }
};
l.prototype.U = function(i10) {
  var t8 = this;
  if (void 0 !== this.t) {
    var n12 = i10.e, r9 = i10.x;
    if (void 0 !== n12) {
      n12.x = r9;
      i10.e = void 0;
    }
    if (void 0 !== r9) {
      r9.e = n12;
      i10.x = void 0;
    }
    if (i10 === this.t) {
      this.t = r9;
      if (void 0 === r9) f(function() {
        var i11;
        null == (i11 = t8.Z) || i11.call(t8);
      });
    }
  }
};
l.prototype.subscribe = function(i10) {
  var t8 = this;
  return j(function() {
    var n12 = t8.value;
    f(function() {
      return i10(n12);
    });
  }, { name: "sub" });
};
l.prototype.valueOf = function() {
  return this.value;
};
l.prototype.toString = function() {
  return this.value + "";
};
l.prototype.toJSON = function() {
  return this.value;
};
l.prototype.peek = function() {
  var i10 = this;
  return f(function() {
    return i10.value;
  });
};
Object.defineProperty(l.prototype, "value", { get: function() {
  var i10 = a(this);
  if (void 0 !== i10) i10.i = this.i;
  return this.v;
}, set: function(i10) {
  if (i10 !== this.v) {
    if (s > 100) throw new Error("Cycle detected");
    !(function(i11) {
      if (0 !== v && 0 === s) {
        if (i11.l !== e) {
          i11.l = e;
          c = { S: i11, v: i11.v, i: i11.i, o: c };
        }
      }
    })(this);
    this.v = i10;
    this.i++;
    d++;
    v++;
    try {
      for (var n12 = this.t; void 0 !== n12; n12 = n12.x) n12.t.N();
    } finally {
      t();
    }
  }
} });
function y(i10, t8) {
  return new l(i10, t8);
}
function w(i10) {
  for (var t8 = i10.s; void 0 !== t8; t8 = t8.n) if (t8.S.i !== t8.i || !t8.S.h() || t8.S.i !== t8.i) return true;
  return false;
}
function _(i10) {
  for (var t8 = i10.s; void 0 !== t8; t8 = t8.n) {
    var n12 = t8.S.n;
    if (void 0 !== n12) t8.r = n12;
    t8.S.n = t8;
    t8.i = -1;
    if (void 0 === t8.n) {
      i10.s = t8;
      break;
    }
  }
}
function b(i10) {
  var t8 = i10.s, n12 = void 0;
  while (void 0 !== t8) {
    var r9 = t8.p;
    if (-1 === t8.i) {
      t8.S.U(t8);
      if (void 0 !== r9) r9.n = t8.n;
      if (void 0 !== t8.n) t8.n.p = r9;
    } else n12 = t8;
    t8.S.n = t8.r;
    if (void 0 !== t8.r) t8.r = void 0;
    t8 = r9;
  }
  i10.s = n12;
}
function p(i10, t8) {
  l.call(this, void 0, t8);
  this.x = i10;
  this.s = void 0;
  this.g = d - 1;
  this.f = 4;
}
p.prototype = new l();
p.prototype.h = function() {
  this.f &= -3;
  if (1 & this.f) return false;
  if (32 == (36 & this.f)) return true;
  this.f &= -5;
  if (this.g === d) return true;
  this.g = d;
  this.f |= 1;
  if (this.i > 0 && !w(this)) {
    this.f &= -2;
    return true;
  }
  var i10 = o;
  try {
    _(this);
    o = this;
    var t8 = this.x();
    if (16 & this.f || this.v !== t8 || 0 === this.i) {
      this.v = t8;
      this.f &= -17;
      this.i++;
    }
  } catch (i11) {
    this.v = i11;
    this.f |= 16;
    this.i++;
  }
  o = i10;
  b(this);
  this.f &= -2;
  return true;
};
p.prototype.S = function(i10) {
  if (void 0 === this.t) {
    this.f |= 36;
    for (var t8 = this.s; void 0 !== t8; t8 = t8.n) t8.S.S(t8);
  }
  l.prototype.S.call(this, i10);
};
p.prototype.U = function(i10) {
  if (void 0 !== this.t) {
    l.prototype.U.call(this, i10);
    if (void 0 === this.t) {
      this.f &= -33;
      for (var t8 = this.s; void 0 !== t8; t8 = t8.n) t8.S.U(t8);
    }
  }
};
p.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var i10 = this.t; void 0 !== i10; i10 = i10.x) i10.t.N();
  }
};
Object.defineProperty(p.prototype, "value", { get: function() {
  if (1 & this.f) throw new Error("Cycle detected");
  var i10 = a(this);
  this.h();
  if (void 0 !== i10) i10.i = this.i;
  if (16 & this.f) throw this.v;
  return this.v;
} });
function g(i10, t8) {
  return new p(i10, t8);
}
function S(i10) {
  var n12 = i10.m;
  i10.m = void 0;
  if ("function" == typeof n12) {
    v++;
    var r9 = o;
    o = void 0;
    try {
      n12();
    } catch (t8) {
      i10.f &= -2;
      i10.f |= 8;
      m(i10);
      throw t8;
    } finally {
      o = r9;
      t();
    }
  }
}
function m(i10) {
  for (var t8 = i10.s; void 0 !== t8; t8 = t8.n) t8.S.U(t8);
  i10.x = void 0;
  i10.s = void 0;
  S(i10);
}
function x(i10) {
  if (o !== this) throw new Error("Out-of-order effect");
  b(this);
  o = i10;
  this.f &= -2;
  if (8 & this.f) m(this);
  t();
}
function E(i10, t8) {
  this.x = i10;
  this.m = void 0;
  this.s = void 0;
  this.u = void 0;
  this.f = 32;
  this.name = null == t8 ? void 0 : t8.name;
  if (r) r.push(this);
}
E.prototype.c = function() {
  var i10 = this.S();
  try {
    if (8 & this.f) return;
    if (void 0 === this.x) return;
    var t8 = this.x();
    if ("function" == typeof t8) this.m = t8;
  } finally {
    i10();
  }
};
E.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1;
  this.f &= -9;
  S(this);
  _(this);
  v++;
  var i10 = o;
  o = this;
  return x.bind(this, i10);
};
E.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 2;
    this.u = h;
    h = this;
  }
};
E.prototype.d = function() {
  this.f |= 8;
  if (!(1 & this.f)) m(this);
};
E.prototype.dispose = function() {
  this.d();
};
function j(i10, t8) {
  var n12 = new E(i10, t8);
  try {
    n12.c();
  } catch (i11) {
    n12.d();
    throw i11;
  }
  var r9 = n12.d.bind(n12);
  r9[Symbol.dispose] = r9;
  return r9;
}

// node_modules/@a2ui/web_core/src/v0_9/reactivity/signals.js
var signalImpl;
var computedImpl;
var effectImpl;
var batchWriteImpl;
var isSignalImpl;
var getValueImpl;
var setValueImpl;
var peekValueImpl;
var _PRIVATE_DEFAULT_SIGNAL_IMPLEMENTATION = {
  signal: y,
  computed: g,
  effect: j,
  batchWrite: n,
  isSignal: (val) => !!val && typeof val === "object" && "value" in val && "peek" in val,
  getValue: (signal2) => signal2.value,
  setValue: (signal2, value) => {
    if (!(signal2 instanceof p)) {
      signal2.value = value;
    }
  },
  peekValue: (signal2) => signal2.peek()
};
setSignalImplementation(_PRIVATE_DEFAULT_SIGNAL_IMPLEMENTATION);
function setSignalImplementation(impl) {
  signalImpl = impl.signal;
  computedImpl = impl.computed;
  effectImpl = impl.effect;
  batchWriteImpl = impl.batchWrite;
  isSignalImpl = impl.isSignal;
  getValueImpl = impl.getValue;
  setValueImpl = impl.setValue;
  peekValueImpl = impl.peekValue;
}
function signal(initialValue) {
  return signalImpl(initialValue);
}
function computed(computeFn) {
  return computedImpl(computeFn);
}
function effect(effectFn) {
  return effectImpl(effectFn);
}
function batchWrite(batchFn) {
  return batchWriteImpl(batchFn);
}
function isSignal(val) {
  return isSignalImpl(val);
}
function getValue(signal2) {
  return getValueImpl(signal2);
}
function setValue(signal2, value) {
  setValueImpl(signal2, value);
}
function peekValue(signal2) {
  return peekValueImpl(signal2);
}

// node_modules/@a2ui/web_core/src/v0_9/state/data-model.js
function isNumeric(value) {
  return /^(0|[1-9]\d*)$/.test(value);
}
var FORBIDDEN_KEYS = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
var DataModel = class {
  /**
   * Creates a new data model.
   *
   * @param initialData The initial data for the model. Defaults to an empty
   *     object.
   */
  constructor(initialData = {}) {
    this.data = {};
    this.signals = /* @__PURE__ */ new Map();
    this.subscriptions = /* @__PURE__ */ new Set();
    this.data = initialData;
  }
  /**
   * Retrieves a Preact Signal for a specific data path.
   *
   * This provides a reactive way to access a value. If the value at the path
   * changes via `set()`, the signal will automatically be updated.
   *
   * @param path The JSON pointer path to create or retrieve a signal for.
   * @returns A Preact Signal representing the value at the specified path.
   * @throws {A2uiDataError} If path is null, undefined, or contains forbidden
   *     segments (`__proto__`, `constructor`, `prototype`).
   */
  getSignal(path) {
    const normalizedPath = this.normalizePath(path);
    if (!this.signals.has(normalizedPath)) {
      this.signals.set(normalizedPath, signal(this.get(normalizedPath)));
    }
    return this.signals.get(normalizedPath);
  }
  /**
   * Updates the model at the specific path and notifies all relevant signals.
   * If path is '/' or empty, replaces the entire root.
   *
   * Note on `undefined` values:
   * - For objects: Setting a property to `undefined` removes the key from the
   * object.
   * - For arrays: Setting an index to `undefined` sets that index to
   * `undefined` but preserves the array length (sparse array).
   *
   * @param path The JSON pointer path to set value for.
   * @param value The value to set at the specified path.
   * @returns This `DataModel` instance for chaining.
   * @throws {A2uiDataError} If path is null, undefined, invalid for
   *     arrays/primitives, or contains forbidden segments (`__proto__`,
   *     `constructor`, `prototype`).
   */
  set(path, value) {
    if (path === null || path === void 0) {
      throw new A2uiDataError("Path cannot be null or undefined.");
    }
    if (path === "/" || path === "") {
      this.data = value;
      this.notifyAllSignals();
      return this;
    }
    const segments = this.parsePath(path);
    const lastSegment = segments.pop();
    if (!this.data) {
      this.data = {};
    }
    let current = this.data;
    for (let i10 = 0; i10 < segments.length; i10++) {
      const segment = segments[i10];
      if (Array.isArray(current)) {
        if (!isNumeric(segment)) {
          throw new A2uiDataError(`Cannot use non-numeric segment '${segment}' on an array in path '${path}'.`, path);
        }
        const index = parseInt(segment, 10);
        const val = current[index];
        if (val !== void 0 && val !== null && typeof val !== "object") {
          throw new A2uiDataError(`Cannot set path '${path}': segment '${segment}' is a primitive value.`, path);
        }
        if (val === void 0 || val === null) {
          const nextSegment = i10 < segments.length - 1 ? segments[i10 + 1] : lastSegment;
          current[index] = isNumeric(nextSegment) ? [] : {};
        }
      } else {
        const hasOwnProp = Object.prototype.hasOwnProperty.call(current, segment);
        if (hasOwnProp) {
          const propVal = current[segment];
          if (propVal !== void 0 && propVal !== null && typeof propVal !== "object") {
            throw new A2uiDataError(`Cannot set path '${path}': segment '${segment}' is a primitive value.`, path);
          }
        }
        if (!hasOwnProp || current[segment] === void 0 || current[segment] === null) {
          const nextSegment = i10 < segments.length - 1 ? segments[i10 + 1] : lastSegment;
          current[segment] = isNumeric(nextSegment) ? [] : {};
        }
      }
      current = current[segment];
    }
    if (Array.isArray(current) && !isNumeric(lastSegment)) {
      throw new A2uiDataError(`Cannot use non-numeric segment '${lastSegment}' on an array in path '${path}'.`, path);
    }
    if (value === void 0) {
      if (Array.isArray(current)) {
        current[parseInt(lastSegment, 10)] = void 0;
      } else {
        delete current[lastSegment];
      }
    } else {
      current[lastSegment] = value;
    }
    this.notifySignals(path);
    return this;
  }
  /**
   * Retrieves data at a specific JSON pointer path.
   *
   * @param path The JSON pointer path to read from.
   * @returns The value at the specified path, or undefined if not found.
   * @throws {A2uiDataError} If path is null, undefined, or contains forbidden
   *     segments (`__proto__`, `constructor`, `prototype`).
   */
  get(path) {
    if (path === null || path === void 0) {
      throw new A2uiDataError("Path cannot be null or undefined.");
    }
    if (path === "/" || path === "") {
      return this.data;
    }
    const segments = this.parsePath(path);
    let current = this.data;
    for (const segment of segments) {
      if (current === void 0 || current === null || typeof current !== "object") {
        return void 0;
      }
      if (Array.isArray(current)) {
        if (!isNumeric(segment)) {
          return void 0;
        }
        const index = parseInt(segment, 10);
        if (index < 0 || index >= current.length) {
          return void 0;
        }
        current = current[index];
      } else {
        if (!Object.prototype.hasOwnProperty.call(current, segment)) {
          return void 0;
        }
        current = current[segment];
      }
    }
    return current;
  }
  /**
   * Subscribes to changes at the specified data path.
   *
   * This is a backwards-compatible layer using Preact Signals internally. It
   * allows listeners to be notified whenever the value at the specified path
   * (or any of its ancestors/descendants) changes.
   *
   * @param path The JSON pointer path to observe.
   * @param onChange A callback fired whenever the value changes.
   * @returns A `DataSubscription` containing the initial value and an
   *     `unsubscribe` method.
   * @throws {A2uiDataError} If path is null, undefined, or contains forbidden
   *     segments (`__proto__`, `constructor`, `prototype`).
   */
  subscribe(path, onChange) {
    const sig = this.getSignal(path);
    let isSync = true;
    let currentValue = peekValue(sig);
    const dispose = effect(() => {
      const val = getValue(sig);
      currentValue = val;
      if (!isSync) {
        onChange(val);
      }
    });
    isSync = false;
    this.subscriptions.add(dispose);
    return {
      get value() {
        return currentValue;
      },
      unsubscribe: () => {
        dispose();
        this.subscriptions.delete(dispose);
      }
    };
  }
  /**
   * Clears all internal subscriptions.
   */
  dispose() {
    for (const dispose of this.subscriptions) {
      dispose();
    }
    this.subscriptions.clear();
    this.signals.clear();
  }
  normalizePath(path) {
    if (path.length > 1 && path.endsWith("/")) {
      return path.slice(0, -1);
    }
    return path || "/";
  }
  parsePath(path) {
    return path.split("/").filter((p4) => p4.length > 0).map((rawSegment) => {
      const segment = rawSegment.replace(/~([01])/g, (_3, g3) => g3 === "1" ? "/" : "~");
      if (FORBIDDEN_KEYS.has(segment)) {
        throw new A2uiDataError(`Forbidden path segment '${segment}' in path '${path}'.`, path);
      }
      return segment;
    });
  }
  notifySignals(path) {
    const normalizedPath = this.normalizePath(path);
    batchWrite(() => {
      this.updateSignal(normalizedPath);
      let parentPath = normalizedPath;
      while (parentPath !== "/" && parentPath !== "") {
        parentPath = parentPath.substring(0, parentPath.lastIndexOf("/")) || "/";
        this.updateSignal(parentPath);
      }
      for (const subPath of this.signals.keys()) {
        if (this.isDescendant(subPath, normalizedPath)) {
          this.updateSignal(subPath);
        }
      }
    });
  }
  updateSignal(path) {
    const sig = this.signals.get(path);
    if (sig) {
      const val = this.get(path);
      if (Array.isArray(val)) {
        setValue(sig, [...val]);
      } else if (typeof val === "object" && val !== null) {
        setValue(sig, { ...val });
      } else {
        setValue(sig, val);
      }
    }
  }
  notifyAllSignals() {
    batchWrite(() => {
      for (const path of this.signals.keys()) {
        this.updateSignal(path);
      }
    });
  }
  isDescendant(childPath, parentPath) {
    if (parentPath === "/" || parentPath === "") {
      return childPath !== "/";
    }
    return childPath.startsWith(parentPath + "/");
  }
};

// node_modules/@a2ui/web_core/src/v0_9/state/surface-components-model.js
var SurfaceComponentsModel = class {
  constructor() {
    this.components = /* @__PURE__ */ new Map();
    this._onCreated = new EventEmitter();
    this._onDeleted = new EventEmitter();
    this.onCreated = this._onCreated;
    this.onDeleted = this._onDeleted;
  }
  /**
   * Retrieves a component by its ID.
   *
   *
   * @param id The ID of the component to retrieve.
   * @returns The component model, or undefined if not found.
   */
  get(id) {
    return this.components.get(id);
  }
  /**
   * Returns an iterator over the components in the model.
   */
  get entries() {
    return this.components.entries();
  }
  /**
   * Adds a component to the model.
   * Throws an error if a component with the same ID already exists.
   *
   * @param component The component to add.
   */
  addComponent(component) {
    if (this.components.has(component.id)) {
      throw new A2uiStateError(`Component with id '${component.id}' already exists.`);
    }
    this.components.set(component.id, component);
    this._onCreated.emit(component);
  }
  /**
   * Removes a component from the model by its ID.
   * Disposes of the component upon removal.
   *
   * @param id The ID of the component to remove.
   */
  removeComponent(id) {
    const component = this.components.get(id);
    if (component) {
      this.components.delete(id);
      component.dispose();
      this._onDeleted.emit(id);
    }
  }
  /**
   * Disposes of the model and all its components.
   */
  dispose() {
    for (const component of this.components.values()) {
      component.dispose();
    }
    this.components.clear();
    this._onCreated.dispose();
    this._onDeleted.dispose();
  }
};

// node_modules/@a2ui/web_core/src/v0_9/schema/client-to-server.js
var A2uiClientActionSchema = external_exports.object({
  name: external_exports.string().describe("The name of the action, taken from the component's action.event.name property."),
  surfaceId: external_exports.string().describe("The id of the surface where the event originated."),
  sourceComponentId: external_exports.string().describe("The id of the component that triggered the event."),
  timestamp: external_exports.string().datetime().describe("An ISO 8601 timestamp of when the event occurred."),
  context: external_exports.record(external_exports.any()).describe("A JSON object containing the key-value pairs from the component's action.event.context, after resolving all data bindings.")
}).strict();
var A2uiValidationErrorSchema = external_exports.object({
  code: external_exports.literal("VALIDATION_FAILED"),
  surfaceId: external_exports.string().describe("The id of the surface where the error occurred."),
  path: external_exports.string().describe("The JSON pointer to the field that failed validation (e.g. '/components/0/text')."),
  message: external_exports.string().describe("A short one or two sentence description of why validation failed.")
}).strict();
var A2uiGenericErrorSchema = external_exports.object({
  code: external_exports.string().refine((c9) => c9 !== "VALIDATION_FAILED"),
  message: external_exports.string().describe("A short one or two sentence description of why the error occurred."),
  surfaceId: external_exports.string().describe("The id of the surface where the error occurred.")
}).passthrough();
var A2uiClientErrorSchema = external_exports.union([A2uiValidationErrorSchema, A2uiGenericErrorSchema]);
var A2uiClientMessageSchema = external_exports.object({
  version: external_exports.enum(["v0.9", "v0.9.1"])
}).and(external_exports.union([external_exports.object({ action: A2uiClientActionSchema }), external_exports.object({ error: A2uiClientErrorSchema })]));
var A2uiClientDataModelSchema = external_exports.object({
  version: external_exports.enum(["v0.9", "v0.9.1"]),
  surfaces: external_exports.record(external_exports.object({}).passthrough()).describe("A map of surface IDs to their current data models.")
}).strict();
var A2uiClientMessageListSchema = external_exports.array(A2uiClientMessageSchema).describe("A list of client messages.");
var A2uiClientMessageListWrapperSchema = external_exports.object({
  messages: A2uiClientMessageListSchema
}).strict().describe("An object wrapping a list of client messages.");

// node_modules/@a2ui/web_core/src/v0_9/state/surface-model.js
var SurfaceModel = class {
  /**
   * Creates a new surface model.
   *
   * @param id The unique identifier for this surface.
   * @param catalog The component catalog used by this surface.
   * @param theme The theme to apply to this surface.
   * @param sendDataModel If true, the client will send the full data model.
   */
  constructor(id, catalog, theme = {}, sendDataModel = false) {
    this.id = id;
    this.catalog = catalog;
    this.theme = theme;
    this.sendDataModel = sendDataModel;
    this._onAction = new EventEmitter();
    this._onError = new EventEmitter();
    this.onAction = this._onAction;
    this.onError = this._onError;
    this.dataModel = new DataModel({});
    this.componentsModel = new SurfaceComponentsModel();
  }
  /**
   * Dispatches an action from this surface to listeners.
   *
   * @param payload The action payload (name and context) to dispatch.
   * @param sourceComponentId The ID of the component that triggered the action.
   */
  async dispatchAction(payload, sourceComponentId) {
    if (payload && typeof payload === "object" && "event" in payload && payload.event) {
      const actionToValidate = {
        name: payload.event.name,
        surfaceId: this.id,
        sourceComponentId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        context: payload.event.context || {}
      };
      const validationResult = A2uiClientActionSchema.safeParse(actionToValidate);
      if (validationResult.success) {
        await this._onAction.emit(validationResult.data);
      } else {
        console.error("A2UI: Invalid action payload dispatched.", validationResult.error.format());
      }
    }
  }
  /**
   * Dispatches an error from this surface to listeners.
   *
   * @param error The error object to dispatch, conforming to client_to_server schema.
   */
  async dispatchError(error) {
    await this._onError.emit({
      ...error,
      surfaceId: this.id
    });
  }
  /**
   * Disposes of the surface and its resources.
   */
  dispose() {
    this.dataModel.dispose();
    this.componentsModel.dispose();
    this._onAction.dispose();
    this._onError.dispose();
  }
};

// node_modules/@a2ui/web_core/src/v0_9/state/surface-group-model.js
var SurfaceGroupModel = class {
  constructor() {
    this.surfaces = /* @__PURE__ */ new Map();
    this.surfaceUnsubscribers = /* @__PURE__ */ new Map();
    this._onSurfaceCreated = new EventEmitter();
    this._onSurfaceDeleted = new EventEmitter();
    this._onAction = new EventEmitter();
    this.onSurfaceCreated = this._onSurfaceCreated;
    this.onSurfaceDeleted = this._onSurfaceDeleted;
    this.onAction = this._onAction;
  }
  /**
   * Adds a surface to the group.
   * Ignores if a surface with the same ID already exists.
   *
   * @param surface The surface model to add.
   */
  addSurface(surface) {
    if (this.surfaces.has(surface.id)) {
      console.warn(`Surface ${surface.id} already exists. Ignoring.`);
      return;
    }
    this.surfaces.set(surface.id, surface);
    const sub = surface.onAction.subscribe((action) => this._onAction.emit(action));
    this.surfaceUnsubscribers.set(surface.id, sub);
    this._onSurfaceCreated.emit(surface);
  }
  /**
   * Removes a surface from the group by its ID.
   * Disposes of the surface upon removal.
   *
   * @param id The ID of the surface to remove.
   */
  deleteSurface(id) {
    const surface = this.surfaces.get(id);
    if (surface) {
      const sub = this.surfaceUnsubscribers.get(id);
      if (sub) {
        sub.unsubscribe();
        this.surfaceUnsubscribers.delete(id);
      }
      this.surfaces.delete(id);
      surface.dispose();
      this._onSurfaceDeleted.emit(id);
    }
  }
  /**
   * Retrieves a surface by its ID.
   *
   *
   * @param id The ID of the surface to retrieve.
   * @returns The surface model, or undefined if not found.
   */
  getSurface(id) {
    return this.surfaces.get(id);
  }
  /**
   * Returns a readonly map of all active surfaces.
   */
  get surfacesMap() {
    return this.surfaces;
  }
  /**
   * Disposes of the group and all its surfaces.
   */
  dispose() {
    for (const id of Array.from(this.surfaces.keys())) {
      this.deleteSurface(id);
    }
    this._onSurfaceCreated.dispose();
    this._onSurfaceDeleted.dispose();
    this._onAction.dispose();
  }
};

// node_modules/@a2ui/web_core/src/v0_9/state/component-model.js
var ComponentModel = class {
  /**
   * Creates a new component model.
   *
   * @param id The unique identifier for this component.
   * @param type The component type name.
   * @param initialProperties The initial properties for the component.
   */
  constructor(id, type, initialProperties) {
    this.id = id;
    this.type = type;
    this._onUpdated = new EventEmitter();
    this.onUpdated = this._onUpdated;
    this._properties = initialProperties;
  }
  /**
   * The current properties of the component.
   */
  get properties() {
    return this._properties;
  }
  set properties(newProperties) {
    this._properties = newProperties;
    this._onUpdated.emit(this);
  }
  /**
   * Disposes of the component and its resources.
   */
  dispose() {
    this._onUpdated.dispose();
  }
  /**
   * Returns a JSON representation of the component tree.
   */
  get componentTree() {
    return {
      id: this.id,
      type: this.type,
      ...this._properties
    };
  }
};

// node_modules/zod-to-json-schema/dist/esm/Options.js
var ignoreOverride = /* @__PURE__ */ Symbol("Let zodToJsonSchema decide on which parser to use");
var defaultOptions = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: true,
  rejectedAdditionalProperties: false,
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  markdownDescription: false,
  patternStrategy: "escape",
  applyRegexFlags: false,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref",
  openAiAnyTypeName: "OpenAiAnyType"
};
var getDefaultOptions = (options) => typeof options === "string" ? {
  ...defaultOptions,
  name: options
} : {
  ...defaultOptions,
  ...options
};

// node_modules/zod-to-json-schema/dist/esm/Refs.js
var getRefs = (options) => {
  const _options = getDefaultOptions(options);
  const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    flags: { hasReferencedOpenAiAnyType: false },
    currentPath,
    propertyPath: void 0,
    seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
      def._def,
      {
        def: def._def,
        path: [..._options.basePath, _options.definitionPath, name],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
};

// node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key, errorMessage, refs) {
  if (!refs?.errorMessages)
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage
    };
  }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
  res[key] = value;
  addErrorMessage(res, key, errorMessage, refs);
}

// node_modules/zod-to-json-schema/dist/esm/getRelativePath.js
var getRelativePath = (pathA, pathB) => {
  let i10 = 0;
  for (; i10 < pathA.length && i10 < pathB.length; i10++) {
    if (pathA[i10] !== pathB[i10])
      break;
  }
  return [(pathA.length - i10).toString(), ...pathB.slice(i10)].join("/");
};

// node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef(refs) {
  if (refs.target !== "openAi") {
    return {};
  }
  const anyDefinitionPath = [
    ...refs.basePath,
    refs.definitionPath,
    refs.openAiAnyTypeName
  ];
  refs.flags.hasReferencedOpenAiAnyType = true;
  return {
    $ref: refs.$refStrategy === "relative" ? getRelativePath(anyDefinitionPath, refs.currentPath) : anyDefinitionPath.join("/")
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/array.js
function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (def.type?._def && def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var parseCatchDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i10) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def, refs);
  }
}
var integerDateParser = (def, refs) => {
  const res = {
    type: "integer",
    format: "unix-time"
  };
  if (refs.target === "openApi3") {
    return res;
  }
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        setResponseValueAndErrors(
          res,
          "minimum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
      case "max":
        setResponseValueAndErrors(
          res,
          "maximum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
    }
  }
  return res;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : parseAnyDef(refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def) {
  return {
    type: "string",
    enum: Array.from(def.values)
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
var isJsonSchema7AllOfType = (type) => {
  if ("type" in type && type.type === "string")
    return false;
  return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x3) => !!x3);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === void 0) {
        unevaluatedProperties = void 0;
      }
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = void 0;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : void 0;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/string.js
var emojiRegex2 = void 0;
var zodPatterns = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => {
    if (emojiRegex2 === void 0) {
      emojiRegex2 = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
    }
    return emojiRegex2;
  },
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "base64url":
          addPattern(res, zodPatterns.base64url, check.message, refs);
          break;
        case "jwt":
          addPattern(res, zodPatterns.jwt, check.message, refs);
          break;
        case "cidr": {
          if (check.version !== "v6") {
            addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
          }
          if (check.version !== "v4") {
            addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji(), check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
          /* @__PURE__ */ ((_3) => {
          })(check);
      }
    }
  }
  return res;
}
function escapeLiteralCheckValue(literal, refs) {
  return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
}
var ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric(source) {
  let result = "";
  for (let i10 = 0; i10 < source.length; i10++) {
    if (!ALPHA_NUMERIC.has(source[i10])) {
      result += "\\";
    }
    result += source[i10];
  }
  return result;
}
function addFormat(schema, value, message2, refs) {
  if (schema.format || schema.anyOf?.some((x3) => x3.format)) {
    if (!schema.anyOf) {
      schema.anyOf = [];
    }
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { format: schema.errorMessage.format }
        }
      });
      delete schema.format;
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.anyOf.push({
      format: value,
      ...message2 && refs.errorMessages && { errorMessage: { format: message2 } }
    });
  } else {
    setResponseValueAndErrors(schema, "format", value, message2, refs);
  }
}
function addPattern(schema, regex, message2, refs) {
  if (schema.pattern || schema.allOf?.some((x3) => x3.pattern)) {
    if (!schema.allOf) {
      schema.allOf = [];
    }
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { pattern: schema.errorMessage.pattern }
        }
      });
      delete schema.pattern;
      if (schema.errorMessage) {
        delete schema.errorMessage.pattern;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.allOf.push({
      pattern: stringifyRegExpWithFlags(regex, refs),
      ...message2 && refs.errorMessages && { errorMessage: { pattern: message2 } }
    });
  } else {
    setResponseValueAndErrors(schema, "pattern", stringifyRegExpWithFlags(regex, refs), message2, refs);
  }
}
function stringifyRegExpWithFlags(regex, refs) {
  if (!refs.applyRegexFlags || !regex.flags) {
    return regex.source;
  }
  const flags = {
    i: regex.flags.includes("i"),
    m: regex.flags.includes("m"),
    s: regex.flags.includes("s")
    // `.` matches newlines
  };
  const source = flags.i ? regex.source.toLowerCase() : regex.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i10 = 0; i10 < source.length; i10++) {
    if (isEscaped) {
      pattern += source[i10];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i10].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i10];
            pattern += `${source[i10 - 2]}-${source[i10]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i10 + 1] === "-" && source[i10 + 2]?.match(/[a-z]/)) {
            pattern += source[i10];
            inCharRange = true;
          } else {
            pattern += `${source[i10]}${source[i10].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i10].match(/[a-z]/)) {
        pattern += `[${source[i10]}${source[i10].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i10] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i10] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i10] === ".") {
      pattern += inCharGroup ? `${source[i10]}\r
` : `[${source[i10]}\r
]`;
      continue;
    }
    pattern += source[i10];
    if (source[i10] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i10] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i10] === "[") {
      inCharGroup = true;
    }
  }
  try {
    new RegExp(pattern);
  } catch {
    console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
    return regex.source;
  }
  return pattern;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function parseRecordDef(def, refs) {
  if (refs.target === "openAi") {
    console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
  }
  if (refs.target === "openApi3" && def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key) => ({
        ...acc,
        [key]: parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key]
        }) ?? parseAnyDef(refs)
      }), {}),
      additionalProperties: refs.rejectedAdditionalProperties
    };
  }
  const schema = {
    type: "object",
    additionalProperties: parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? refs.allowedAdditionalProperties
  };
  if (refs.target === "openApi3") {
    return schema;
  }
  if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
    const { type, ...keyType } = parseStringDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.type._def.checks?.length) {
    const { type, ...keyType } = parseBrandedDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || parseAnyDef(refs);
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || parseAnyDef(refs);
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object[object[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef(refs) {
  return refs.target === "openAi" ? void 0 : {
    not: parseAnyDef({
      ...refs,
      currentPath: [...refs.currentPath, "not"]
    })
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/union.js
var primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every((x3) => x3._def.typeName in primitiveMappings && (!x3._def.checks || !x3._def.checks.length))) {
    const types = options.reduce((types2, x3) => {
      const type = primitiveMappings[x3._def.typeName];
      return type && !types2.includes(type) ? [...types2, type] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x3) => x3._def.typeName === "ZodLiteral" && !x3.description)) {
    const types = options.reduce((acc, x3) => {
      const type = typeof x3._def.value;
      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x3._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types.length === options.length) {
      const uniqueTypes = types.filter((x3, i10, a5) => a5.indexOf(x3) === i10);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x3) => {
          return acc.includes(x3._def.value) ? acc : [...acc, x3._def.value];
        }, [])
      };
    }
  } else if (options.every((x3) => x3._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce((acc, x3) => [
        ...acc,
        ...x3._def.values.filter((x4) => !acc.includes(x4))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
var asAnyOf = (def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x3, i10) => parseDef(x3._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", `${i10}`]
  })).filter((x3) => !!x3 && (!refs.strictUnions || typeof x3 === "object" && Object.keys(x3).length > 0));
  return anyOf.length ? { anyOf } : void 0;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base2 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    if (base2 && "$ref" in base2)
      return { allOf: [base2], nullable: true };
    return base2 && { ...base2, nullable: true };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function parseObjectDef(def, refs) {
  const forceOptionalIntoNullable = refs.target === "openAi";
  const result = {
    type: "object",
    properties: {}
  };
  const required = [];
  const shape = def.shape();
  for (const propName in shape) {
    let propDef = shape[propName];
    if (propDef === void 0 || propDef._def === void 0) {
      continue;
    }
    let propOptional = safeIsOptional(propDef);
    if (propOptional && forceOptionalIntoNullable) {
      if (propDef._def.typeName === "ZodOptional") {
        propDef = propDef._def.innerType;
      }
      if (!propDef.isNullable()) {
        propDef = propDef.nullable();
      }
      propOptional = false;
    }
    const parsedDef = parseDef(propDef._def, {
      ...refs,
      currentPath: [...refs.currentPath, "properties", propName],
      propertyPath: [...refs.currentPath, "properties", propName]
    });
    if (parsedDef === void 0) {
      continue;
    }
    result.properties[propName] = parsedDef;
    if (!propOptional) {
      required.push(propName);
    }
  }
  if (required.length) {
    result.required = required;
  }
  const additionalProperties = decideAdditionalProperties(def, refs);
  if (additionalProperties !== void 0) {
    result.additionalProperties = additionalProperties;
  }
  return result;
}
function decideAdditionalProperties(def, refs) {
  if (def.catchall._def.typeName !== "ZodNever") {
    return parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    });
  }
  switch (def.unknownKeys) {
    case "passthrough":
      return refs.allowedAdditionalProperties;
    case "strict":
      return refs.rejectedAdditionalProperties;
    case "strip":
      return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
  }
}
function safeIsOptional(schema) {
  try {
    return schema.isOptional();
  } catch {
    return true;
  }
}

// node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var parseOptionalDef = (def, refs) => {
  if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
    return parseDef(def.innerType._def, refs);
  }
  const innerSchema = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? {
    anyOf: [
      {
        not: parseAnyDef(refs)
      },
      innerSchema
    ]
  } : parseAnyDef(refs);
};

// node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
var parsePipelineDef = (def, refs) => {
  if (refs.pipeStrategy === "input") {
    return parseDef(def.in._def, refs);
  } else if (refs.pipeStrategy === "output") {
    return parseDef(def.out._def, refs);
  }
  const a5 = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  });
  const b4 = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a5 ? "1" : "0"]
  });
  return {
    allOf: [a5, b4].filter((x3) => x3 !== void 0)
  };
};

// node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x3, i10) => parseDef(x3._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i10}`]
      })).reduce((acc, x3) => x3 === void 0 ? acc : [...acc, x3], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x3, i10) => parseDef(x3._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i10}`]
      })).reduce((acc, x3) => x3 === void 0 ? acc : [...acc, x3], [])
    };
  }
}

// node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef(refs) {
  return {
    not: parseAnyDef(refs)
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef(refs) {
  return parseAnyDef(refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var parseReadonlyDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/selectParser.js
var selectParser = (def, typeName, refs) => {
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodString:
      return parseStringDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNumber:
      return parseNumberDef(def, refs);
    case ZodFirstPartyTypeKind.ZodObject:
      return parseObjectDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBigInt:
      return parseBigintDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBoolean:
      return parseBooleanDef();
    case ZodFirstPartyTypeKind.ZodDate:
      return parseDateDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUndefined:
      return parseUndefinedDef(refs);
    case ZodFirstPartyTypeKind.ZodNull:
      return parseNullDef(refs);
    case ZodFirstPartyTypeKind.ZodArray:
      return parseArrayDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUnion:
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseUnionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodIntersection:
      return parseIntersectionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodTuple:
      return parseTupleDef(def, refs);
    case ZodFirstPartyTypeKind.ZodRecord:
      return parseRecordDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLiteral:
      return parseLiteralDef(def, refs);
    case ZodFirstPartyTypeKind.ZodEnum:
      return parseEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNativeEnum:
      return parseNativeEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNullable:
      return parseNullableDef(def, refs);
    case ZodFirstPartyTypeKind.ZodOptional:
      return parseOptionalDef(def, refs);
    case ZodFirstPartyTypeKind.ZodMap:
      return parseMapDef(def, refs);
    case ZodFirstPartyTypeKind.ZodSet:
      return parseSetDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLazy:
      return () => def.getter()._def;
    case ZodFirstPartyTypeKind.ZodPromise:
      return parsePromiseDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNaN:
    case ZodFirstPartyTypeKind.ZodNever:
      return parseNeverDef(refs);
    case ZodFirstPartyTypeKind.ZodEffects:
      return parseEffectsDef(def, refs);
    case ZodFirstPartyTypeKind.ZodAny:
      return parseAnyDef(refs);
    case ZodFirstPartyTypeKind.ZodUnknown:
      return parseUnknownDef(refs);
    case ZodFirstPartyTypeKind.ZodDefault:
      return parseDefaultDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBranded:
      return parseBrandedDef(def, refs);
    case ZodFirstPartyTypeKind.ZodReadonly:
      return parseReadonlyDef(def, refs);
    case ZodFirstPartyTypeKind.ZodCatch:
      return parseCatchDef(def, refs);
    case ZodFirstPartyTypeKind.ZodPipeline:
      return parsePipelineDef(def, refs);
    case ZodFirstPartyTypeKind.ZodFunction:
    case ZodFirstPartyTypeKind.ZodVoid:
    case ZodFirstPartyTypeKind.ZodSymbol:
      return void 0;
    default:
      return /* @__PURE__ */ ((_3) => void 0)(typeName);
  }
};

// node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
  const jsonSchema = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
  if (jsonSchema) {
    addMeta(def, refs, jsonSchema);
  }
  if (refs.postProcess) {
    const postProcessResult = refs.postProcess(jsonSchema, def, refs);
    newItem.jsonSchema = jsonSchema;
    return postProcessResult;
  }
  newItem.jsonSchema = jsonSchema;
  return jsonSchema;
}
var get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen": {
      if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
        console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
        return parseAnyDef(refs);
      }
      return refs.$refStrategy === "seen" ? parseAnyDef(refs) : void 0;
    }
  }
};
var addMeta = (def, refs, jsonSchema) => {
  if (def.description) {
    jsonSchema.description = def.description;
    if (refs.markdownDescription) {
      jsonSchema.markdownDescription = def.description;
    }
  }
  return jsonSchema;
};

// node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
var zodToJsonSchema = (schema, options) => {
  const refs = getRefs(options);
  let definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => ({
    ...acc,
    [name2]: parseDef(schema2._def, {
      ...refs,
      currentPath: [...refs.basePath, refs.definitionPath, name2]
    }, true) ?? parseAnyDef(refs)
  }), {}) : void 0;
  const name = typeof options === "string" ? options : options?.nameStrategy === "title" ? void 0 : options?.name;
  const main = parseDef(schema._def, name === void 0 ? refs : {
    ...refs,
    currentPath: [...refs.basePath, refs.definitionPath, name]
  }, false) ?? parseAnyDef(refs);
  const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
  if (title !== void 0) {
    main.title = title;
  }
  if (refs.flags.hasReferencedOpenAiAnyType) {
    if (!definitions) {
      definitions = {};
    }
    if (!definitions[refs.openAiAnyTypeName]) {
      definitions[refs.openAiAnyTypeName] = {
        // Skipping "object" as no properties can be defined and additionalProperties must be "false"
        type: ["string", "number", "integer", "boolean", "array", "null"],
        items: {
          $ref: refs.$refStrategy === "relative" ? "1" : [
            ...refs.basePath,
            refs.definitionPath,
            refs.openAiAnyTypeName
          ].join("/")
        }
      };
    }
  }
  const combined = name === void 0 ? definitions ? {
    ...main,
    [refs.definitionPath]: definitions
  } : main : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name]: main
    }
  };
  if (refs.target === "jsonSchema7") {
    combined.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") {
    combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
  }
  if (refs.target === "openAi" && ("anyOf" in combined || "oneOf" in combined || "allOf" in combined || "type" in combined && Array.isArray(combined.type))) {
    console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
  }
  return combined;
};

// node_modules/@a2ui/web_core/src/v0_9/processing/message-processor.js
var MessageProcessor = class {
  /**
   * Creates a new message processor.
   *
   * @param catalogs A list of available catalogs.
   * @param actionHandler A global handler for actions from all surfaces.
   * @param options Configuration options for the processor.
   */
  constructor(catalogs, actionHandler, options) {
    this.catalogs = catalogs;
    this.actionHandler = actionHandler;
    this.model = new SurfaceGroupModel();
    this.version = options?.version ?? "v0.9";
    if (this.actionHandler) {
      this.model.onAction.subscribe(this.actionHandler);
    }
  }
  /**
   * Generates the a2uiClientCapabilities object for the current processor.
   *
   * @param options Configuration for capability generation.
   * @returns The capabilities object.
   */
  getClientCapabilities(options) {
    const version = options?.version ?? this.version;
    const versionCaps = {
      supportedCatalogIds: this.catalogs.map((c9) => c9.id)
    };
    if (options?.includeInlineCatalogs) {
      versionCaps.inlineCatalogs = this.catalogs.map((c9) => this.generateInlineCatalog(c9));
    }
    return { [version]: versionCaps };
  }
  generateInlineCatalog(catalog) {
    const components = {};
    for (const [name, api] of catalog.components.entries()) {
      const zodSchema = zodToJsonSchema(api.schema, {
        target: "jsonSchema2019-09"
      });
      this.processRefs(zodSchema);
      components[name] = {
        allOf: [
          { $ref: "common_types.json#/$defs/ComponentCommon" },
          {
            properties: {
              component: { const: name },
              ...zodSchema.properties
            },
            required: ["component", ...zodSchema.required || []]
          }
        ]
      };
    }
    const functions = [];
    for (const api of catalog.functions.values()) {
      const zodSchema = zodToJsonSchema(api.schema, {
        target: "jsonSchema2019-09"
      });
      this.processRefs(zodSchema);
      functions.push({
        name: api.name,
        description: api.schema.description,
        returnType: api.returnType,
        parameters: zodSchema
      });
    }
    let theme;
    if (catalog.themeSchema) {
      const zodSchema = zodToJsonSchema(catalog.themeSchema, {
        target: "jsonSchema2019-09"
      });
      this.processRefs(zodSchema);
      theme = zodSchema.properties;
    }
    return {
      catalogId: catalog.id,
      components,
      functions: functions.length > 0 ? functions : void 0,
      theme
    };
  }
  processRefs(node) {
    if (typeof node !== "object" || node === null)
      return;
    if (typeof node.description === "string" && node.description.startsWith("REF:")) {
      const parts = node.description.substring(4).split("|");
      const ref = parts[0];
      const desc = parts[1] || "";
      for (const k2 of Object.keys(node)) {
        delete node[k2];
      }
      node["$ref"] = ref;
      if (desc) {
        node["description"] = desc;
      }
      return;
    }
    if (Array.isArray(node)) {
      for (const item of node) {
        this.processRefs(item);
      }
    } else {
      for (const key of Object.keys(node)) {
        this.processRefs(node[key]);
      }
    }
  }
  /**
   * Returns the aggregated data model for all surfaces that have 'sendDataModel' enabled.
   */
  getClientDataModel(version = this.version) {
    const surfaces = {};
    for (const surface of this.model.surfacesMap.values()) {
      if (surface.sendDataModel) {
        surfaces[surface.id] = surface.dataModel.get("/");
      }
    }
    if (Object.keys(surfaces).length === 0) {
      return void 0;
    }
    return {
      version,
      surfaces
    };
  }
  /**
   * Subscribes to surface creation events.
   */
  onSurfaceCreated(handler) {
    return this.model.onSurfaceCreated.subscribe(handler);
  }
  /**
   * Subscribes to surface deletion events.
   */
  onSurfaceDeleted(handler) {
    return this.model.onSurfaceDeleted.subscribe(handler);
  }
  /**
   * Processes a list of messages or a messages wrapper.
   *
   * @param messages The messages or messages wrapper to process.
   */
  processMessages(messages) {
    const messageList = Array.isArray(messages) ? messages : messages.messages;
    for (const message2 of messageList) {
      this.processMessage(message2);
    }
  }
  processMessage(message2) {
    const updateTypes = [
      "createSurface",
      "updateComponents",
      "updateDataModel",
      "deleteSurface"
    ].filter((k2) => k2 in message2);
    if (updateTypes.length > 1) {
      throw new A2uiValidationError(`Message contains multiple update types: ${updateTypes.join(", ")}.`);
    }
    if ("createSurface" in message2) {
      this.processCreateSurfaceMessage(message2);
      return;
    }
    if ("deleteSurface" in message2) {
      this.processDeleteSurfaceMessage(message2);
      return;
    }
    if ("updateComponents" in message2) {
      this.processUpdateComponentsMessage(message2);
      return;
    }
    if ("updateDataModel" in message2) {
      this.processUpdateDataModelMessage(message2);
      return;
    }
  }
  processCreateSurfaceMessage(message2) {
    const payload = message2.createSurface;
    const { surfaceId, catalogId, theme, sendDataModel } = payload;
    const catalog = this.catalogs.find((c9) => c9.id === catalogId);
    if (!catalog) {
      throw new A2uiStateError(`Catalog not found: ${catalogId}`);
    }
    if (this.model.getSurface(surfaceId)) {
      throw new A2uiStateError(`Surface ${surfaceId} already exists.`);
    }
    const surface = new SurfaceModel(surfaceId, catalog, theme, sendDataModel ?? false);
    this.model.addSurface(surface);
  }
  processDeleteSurfaceMessage(message2) {
    const payload = message2.deleteSurface;
    if (!payload.surfaceId)
      return;
    this.model.deleteSurface(payload.surfaceId);
  }
  processUpdateComponentsMessage(message2) {
    const payload = message2.updateComponents;
    if (!payload.surfaceId)
      return;
    const surface = this.model.getSurface(payload.surfaceId);
    if (!surface) {
      throw new A2uiStateError(`Surface not found for message: ${payload.surfaceId}`);
    }
    for (const comp of payload.components) {
      const { id, component, ...properties } = comp;
      if (!id) {
        throw new A2uiValidationError(`Component '${component}' is missing an 'id'.`);
      }
      const existing = surface.componentsModel.get(id);
      const componentType = component || existing?.type;
      if (componentType) {
        const componentApi = surface.catalog.components.get(componentType);
        if (componentApi) {
          const validationResult = componentApi.schema.safeParse(properties);
          if (!validationResult.success) {
            const formattedErrors = validationResult.error.errors.map((err) => `${err.path.join(".") || "root"}: ${err.message}`).join(", ");
            throw new A2uiValidationError(`Validation failed for component '${componentType}' (${id}): ${formattedErrors}`);
          }
        }
      }
    }
    for (const comp of payload.components) {
      const { id, component, ...properties } = comp;
      const existing = surface.componentsModel.get(id);
      if (existing) {
        if (component && component !== existing.type) {
          surface.componentsModel.removeComponent(id);
          const newComponent = new ComponentModel(id, component, properties);
          surface.componentsModel.addComponent(newComponent);
        } else {
          existing.properties = properties;
        }
      } else {
        if (!component) {
          throw new A2uiValidationError(`Cannot create component ${id} without a type.`);
        }
        const newComponent = new ComponentModel(id, component, properties);
        surface.componentsModel.addComponent(newComponent);
      }
    }
  }
  processUpdateDataModelMessage(message2) {
    const payload = message2.updateDataModel;
    if (!payload.surfaceId)
      return;
    const surface = this.model.getSurface(payload.surfaceId);
    if (!surface) {
      throw new A2uiStateError(`Surface not found for message: ${payload.surfaceId}`);
    }
    const path = payload.path || "/";
    const value = payload.value;
    surface.dataModel.set(path, value);
  }
  /**
   * Resolves a relative path against a context path.
   *
   * @param path The path to resolve.
   * @param contextPath The base path (optional).
   */
  resolvePath(path, contextPath) {
    if (path.startsWith("/")) {
      return path;
    }
    if (contextPath) {
      const base = contextPath.endsWith("/") ? contextPath : `${contextPath}/`;
      return `${base}${path}`;
    }
    return `/${path}`;
  }
};

// node_modules/@a2ui/web_core/src/v0_9/rendering/data-context.js
var DataContext = class _DataContext {
  /**
   * Initializes a new DataContext.
   *
   * @param surface The surface model this context belongs to.
   * @param path The absolute path in the DataModel that this context is scoped to (its "current working directory").
   */
  constructor(surface, path) {
    this.surface = surface;
    this.path = path;
    this.dataModel = surface.dataModel;
    this.functionInvoker = surface.catalog.invoker;
  }
  /**
   * Mutates the underlying DataModel at the specified path.
   *
   * This is the primary method for components to push state changes (e.g. user input)
   * back up to the global model.
   *
   * @param path A JSON pointer path. If relative, it is resolved against this context's `path`.
   * @param value The new value to store in the DataModel.
   */
  set(path, value) {
    const absolutePath = this.resolvePath(path);
    this.dataModel.set(absolutePath, value);
  }
  /**
   * Synchronously evaluates a `DynamicValue` (a literal, a path binding, or a function call)
   * into its concrete runtime value.
   *
   * **Note:** This method evaluates the value *once* at the current moment in time.
   * It does not create any reactive subscriptions. If the underlying data changes later,
   * this result will not automatically update. Use `subscribeDynamicValue` for reactive updates.
   *
   * @param value The DynamicValue object from the A2UI JSON payload.
   * @returns The synchronously resolved value.
   */
  resolveDynamicValue(value) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      return value;
    }
    if ("path" in value) {
      const absolutePath = this.resolvePath(value.path);
      return this.dataModel.get(absolutePath);
    }
    if ("call" in value) {
      const call = value;
      const args = {};
      for (const [key, argVal] of Object.entries(call.args)) {
        args[key] = this.resolveDynamicValue(argVal);
      }
      const abortController = new AbortController();
      const result = this.evaluateFunctionReactive(call.call, args, abortController.signal);
      if (result === void 0) {
        return void 0;
      }
      return isSignal(result) ? peekValue(result) : result;
    }
    return value;
  }
  /**
   * Reactively listens to changes in a `DynamicValue`.
   *
   * This is the core reactive binding mechanism. Whenever the underlying data changes
   * (or if a function call's dependencies change), the `onChange` callback will be fired
   * with the freshly evaluated result.
   *
   * @template V The expected type of the resolved value.
   * @param value The DynamicValue to evaluate and observe.
   * @param onChange A callback fired whenever the evaluated result changes.
   * @returns A `DataSubscription` containing the initial synchronously-resolved value, along with an `unsubscribe` method to clean up the listener.
   */
  subscribeDynamicValue(value, onChange) {
    const sig = this.resolveSignal(value);
    let isSync = true;
    let currentValue = peekValue(sig);
    const dispose = effect(() => {
      const val = getValue(sig);
      currentValue = val;
      if (!isSync) {
        onChange(val);
      }
    });
    isSync = false;
    return {
      get value() {
        return currentValue;
      },
      unsubscribe: () => {
        dispose();
        sig.unsubscribe?.();
      }
    };
  }
  /**
   * Returns a Preact Signal representing the reactive dynamic value.
   *
   * This method recursively resolves any nested path bindings or function calls into a
   * single, reactive `Signal`. Any changes to the underlying data or function dependencies
   * will cause this signal's value to update.
   *
   * @param value The DynamicValue to evaluate and observe.
   * @returns A Preact Signal containing the reactive result of the evaluation.
   */
  resolveSignal(value) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      return signal(value);
    }
    if ("path" in value) {
      const absolutePath = this.resolvePath(value.path);
      return this.dataModel.getSignal(absolutePath);
    }
    if ("call" in value) {
      const call = value;
      const argSignals = {};
      for (const [key, argVal] of Object.entries(call.args)) {
        argSignals[key] = this.resolveSignal(argVal);
      }
      if (Object.keys(argSignals).length === 0) {
        const abortController2 = new AbortController();
        const result = this.evaluateFunctionReactive(call.call, {}, abortController2.signal);
        const sig = isSignal(result) ? result : signal(result);
        sig.unsubscribe = () => abortController2.abort();
        return sig;
      }
      const keys = Object.keys(argSignals);
      const resultSig = signal(void 0);
      let abortController;
      let innerUnsubscribe;
      const argsSig = computed(() => {
        const argsRecord = {};
        for (let i10 = 0; i10 < keys.length; i10++) {
          argsRecord[keys[i10]] = getValue(argSignals[keys[i10]]);
        }
        return argsRecord;
      });
      const stopper = effect(() => {
        try {
          const args = getValue(argsSig);
          if (abortController)
            abortController.abort();
          if (innerUnsubscribe) {
            innerUnsubscribe();
            innerUnsubscribe = void 0;
          }
          abortController = new AbortController();
          const res = this.evaluateFunctionReactive(call.call, args, abortController.signal);
          if (isSignal(res)) {
            innerUnsubscribe = effect(() => {
              setValue(resultSig, getValue(res));
            });
          } else {
            setValue(resultSig, res);
          }
        } catch (e11) {
          this.dispatchExpressionError(e11, call.call);
          setValue(resultSig, void 0);
        }
      });
      resultSig.unsubscribe = () => {
        stopper();
        if (innerUnsubscribe)
          innerUnsubscribe();
        if (abortController)
          abortController.abort();
        for (let i10 = 0; i10 < keys.length; i10++) {
          argSignals[keys[i10]].unsubscribe?.();
        }
      };
      return resultSig;
    }
    return signal(value);
  }
  /**
   * Resolves an action by evaluating its top-level dynamic values.
   *
   * For event actions, it resolves each value in the context map.
   * For function call actions, it evaluates the call.
   *
   * This is non-recursive: it only resolves one level deep for the context record,
   * in accordance with the schema specification that requires values to be single
   * DynamicValue types and prevents arbitrary nesting.
   */
  resolveAction(action) {
    if ("event" in action) {
      const resolvedContext = {};
      if (action.event.context) {
        for (const [key, value] of Object.entries(action.event.context)) {
          resolvedContext[key] = this.resolveDynamicValue(value);
        }
      }
      return {
        event: {
          ...action.event,
          context: resolvedContext
        }
      };
    }
    if ("functionCall" in action) {
      return this.resolveDynamicValue(action.functionCall);
    }
    return action;
  }
  evaluateFunctionReactive(name, args, abortSignal) {
    try {
      return this.functionInvoker(name, args, this, abortSignal);
    } catch (e11) {
      this.dispatchExpressionError(e11, name);
      return void 0;
    }
  }
  dispatchExpressionError(e11, name) {
    if (e11?.name === "ZodError" || e11 instanceof external_exports.ZodError) {
      const err = new A2uiExpressionError(`Validation failed for function '${name}': ${e11.message}`, name, e11.errors ?? e11.issues);
      this.surface.dispatchError({
        code: "EXPRESSION_ERROR",
        message: err.message,
        expression: name,
        details: err.details
      });
    } else if (e11 instanceof A2uiExpressionError) {
      this.surface.dispatchError({
        code: "EXPRESSION_ERROR",
        message: e11.message,
        expression: e11.expression,
        details: e11.details
      });
    } else {
      this.surface.dispatchError({
        code: "EXPRESSION_ERROR",
        message: e11.message ?? `An unexpected error occurred in function ${name}.`,
        expression: name,
        details: { stack: e11.stack }
      });
    }
  }
  /**
   * Creates a new, child `DataContext` scoped to a deeper path.
   *
   * This is used when a component (like a List or a Card) wants to provide a targeted
   * data scope for its children, so children can use relative paths like `./title`.
   *
   * @param relativePath The path relative to the *current* context's path.
   * @returns A new `DataContext` instance pointing to the resolved absolute path.
   */
  nested(relativePath) {
    const newPath = this.resolvePath(relativePath);
    return new _DataContext(this.surface, newPath);
  }
  resolvePath(path) {
    if (path.startsWith("/")) {
      return path;
    }
    if (path === "" || path === ".") {
      return this.path;
    }
    let base = this.path;
    if (base.endsWith("/") && base.length > 1) {
      base = base.slice(0, -1);
    }
    if (base === "/")
      base = "";
    return `${base}/${path}`;
  }
};

// node_modules/@a2ui/web_core/src/v0_9/rendering/component-context.js
var ComponentContext = class {
  /**
   * Creates a new component context.
   *
   * @param surface The surface model the component belongs to.
   * @param componentId The ID of the component.
   * @param dataModelBasePath The base path for data model access (default: '/').
   */
  constructor(surface, componentId, dataModelBasePath = "/") {
    const model = surface.componentsModel.get(componentId);
    if (!model) {
      throw new A2uiStateError(`Component not found: ${componentId}`);
    }
    this.componentModel = model;
    this.surfaceComponents = surface.componentsModel;
    this.theme = surface.theme;
    this.dataContext = new DataContext(surface, dataModelBasePath);
    this._actionDispatcher = (action) => surface.dispatchAction(action, this.componentModel.id);
  }
  /**
   * Dispatches an action from the component.
   *
   * @param action The action to dispatch.
   */
  dispatchAction(action) {
    return this._actionDispatcher(action);
  }
};

// node_modules/@a2ui/web_core/src/v0_9/rendering/generic-binder.js
function scrapeSchemaBehavior(schema) {
  return getFieldBehavior(schema);
}
function getFieldBehavior(type, propertyName) {
  let current = type;
  while (current._def.typeName === "ZodOptional" || current._def.typeName === "ZodNullable" || current._def.typeName === "ZodDefault") {
    current = current._def.innerType;
  }
  if (propertyName === "checks") {
    return { type: "CHECKABLE" };
  }
  if (current._def.typeName === "ZodUnion") {
    const options = current._def.options;
    const isAction = options.some((o12) => o12._def.typeName === "ZodObject" && o12._def.shape().event);
    if (isAction)
      return { type: "ACTION" };
    const isDynamic = options.some((o12) => o12._def.typeName === "ZodObject" && o12._def.shape().path && !o12._def.shape().componentId);
    if (isDynamic)
      return { type: "DYNAMIC" };
    const isChildList = options.some((o12) => o12._def.typeName === "ZodObject" && o12._def.shape().componentId && o12._def.shape().path);
    if (isChildList)
      return { type: "STRUCTURAL" };
  } else if (current._def.typeName === "ZodString") {
  }
  if (current._def.typeName === "ZodArray") {
    return {
      type: "ARRAY",
      element: getFieldBehavior(current._def.type)
    };
  }
  if (current._def.typeName === "ZodObject") {
    const shape = {};
    const objShape = current._def.shape();
    for (const [key, value] of Object.entries(objShape)) {
      shape[key] = getFieldBehavior(value, key);
    }
    return { type: "OBJECT", shape };
  }
  return { type: "STATIC" };
}
var GenericBinder = class {
  constructor(context, schema) {
    this.dataListeners = [];
    this.propsListeners = [];
    this.currentProps = {};
    this.isConnected = false;
    this.context = context;
    this.behaviorTree = scrapeSchemaBehavior(schema);
    if (this.behaviorTree.type !== "OBJECT") {
      this.behaviorTree = { type: "OBJECT", shape: {} };
    }
    this.resolveInitialProps();
  }
  resolveInitialProps() {
    const props = this.context.componentModel.properties;
    const resolved = this.resolveAndBind(props, this.behaviorTree, [], true);
    this.currentProps = { ...this.currentProps, ...resolved };
  }
  connect() {
    if (this.isConnected)
      return;
    this.isConnected = true;
    const sub = this.context.componentModel.onUpdated.subscribe(() => {
      this.rebuildAllBindings();
    });
    this.compUnsub = () => sub.unsubscribe();
    this.rebuildAllBindings();
  }
  rebuildAllBindings() {
    this.dataListeners.forEach((l5) => l5());
    this.dataListeners = [];
    const props = this.context.componentModel.properties;
    const resolved = this.resolveAndBind(props, this.behaviorTree, [], false);
    this.currentProps = { ...this.currentProps, ...resolved };
    this.notify();
  }
  resolveAndBind(value, behavior, path, isSync) {
    if (value === void 0 || value === null)
      return value;
    switch (behavior.type) {
      case "DYNAMIC": {
        const bound = this.context.dataContext.subscribeDynamicValue(value, (newVal) => {
          this.updateDeepValue(path, newVal);
          this.notify();
        });
        if (!isSync) {
          this.dataListeners.push(() => bound.unsubscribe());
        } else {
          bound.unsubscribe();
        }
        return bound.value;
      }
      case "ACTION": {
        return () => {
          const resolveDeepSync = (val) => {
            if (typeof val !== "object" || val === null)
              return val;
            if ("path" in val || "call" in val)
              return this.context.dataContext.resolveDynamicValue(val);
            if (Array.isArray(val))
              return val.map(resolveDeepSync);
            const res = {};
            for (const [k2, v3] of Object.entries(val))
              res[k2] = resolveDeepSync(v3);
            return res;
          };
          this.context.dispatchAction(resolveDeepSync(value));
        };
      }
      case "STRUCTURAL": {
        if (value && typeof value === "object" && value.path && value.componentId) {
          const bound = this.context.dataContext.subscribeDynamicValue({ path: value.path }, (newVal) => {
            const arr = Array.isArray(newVal) ? newVal : [];
            const listContext2 = this.context.dataContext.nested(value.path);
            const resolvedChildren = arr.map((_3, i10) => ({
              id: value.componentId,
              basePath: listContext2.nested(String(i10)).path
            }));
            this.updateDeepValue(path, resolvedChildren);
            this.notify();
          });
          if (!isSync) {
            this.dataListeners.push(() => bound.unsubscribe());
          } else {
            bound.unsubscribe();
          }
          const currentArr = Array.isArray(bound.value) ? bound.value : [];
          const listContext = this.context.dataContext.nested(value.path);
          return currentArr.map((_3, i10) => ({
            id: value.componentId,
            basePath: listContext.nested(String(i10)).path
          }));
        }
        return value;
      }
      case "CHECKABLE": {
        const rules = Array.isArray(value) ? value : [];
        const ruleResults = rules.map(() => ({
          valid: true,
          message: ""
        }));
        const parentPath = path.slice(0, -1);
        const updateValidationState = () => {
          const errors = ruleResults.filter((r9) => !r9.valid).map((r9) => r9.message);
          this.updateDeepValue([...parentPath, "isValid"], errors.length === 0);
          this.updateDeepValue([...parentPath, "validationErrors"], errors);
          this.notify();
        };
        rules.forEach((rule, index) => {
          const condition = rule.condition || rule;
          const message2 = rule.message || "Validation failed";
          ruleResults[index].message = message2;
          const bound = this.context.dataContext.subscribeDynamicValue(condition, (newVal) => {
            ruleResults[index].valid = !!newVal;
            updateValidationState();
          });
          if (!isSync) {
            this.dataListeners.push(() => bound.unsubscribe());
          } else {
            bound.unsubscribe();
          }
          ruleResults[index].valid = !!bound.value;
        });
        const initialErrors = ruleResults.filter((r9) => !r9.valid).map((r9) => r9.message);
        this.updateDeepValue([...parentPath, "isValid"], initialErrors.length === 0);
        this.updateDeepValue([...parentPath, "validationErrors"], initialErrors);
        return value;
      }
      case "STATIC":
        return value;
      case "ARRAY": {
        if (!Array.isArray(value))
          return value;
        return value.map((item, index) => this.resolveAndBind(item, behavior.element, [...path, index.toString()], isSync));
      }
      case "OBJECT": {
        if (typeof value !== "object")
          return value;
        const result = {};
        for (const [k2, v3] of Object.entries(value)) {
          const childBehavior = behavior.shape[k2] || { type: "STATIC" };
          result[k2] = this.resolveAndBind(v3, childBehavior, [...path, k2], isSync);
        }
        for (const [k2, childBehavior] of Object.entries(behavior.shape)) {
          if (childBehavior.type === "DYNAMIC") {
            const setterName = `set${k2.charAt(0).toUpperCase() + k2.slice(1)}`;
            const rawPropValue = value[k2];
            result[setterName] = (newValue) => {
              if (rawPropValue && typeof rawPropValue === "object" && "path" in rawPropValue) {
                this.context.dataContext.set(rawPropValue.path, newValue);
              }
            };
          }
        }
        return result;
      }
    }
  }
  updateDeepValue(path, newValue) {
    this.currentProps = this.cloneAndUpdate(this.currentProps, path, newValue);
  }
  cloneAndUpdate(obj, path, newValue) {
    if (path.length === 0)
      return newValue;
    const [key, ...rest] = path;
    if (Array.isArray(obj)) {
      const newArr = [...obj];
      newArr[Number(key)] = this.cloneAndUpdate(newArr[Number(key)], rest, newValue);
      return newArr;
    } else {
      return {
        ...obj || {},
        [key]: this.cloneAndUpdate((obj || {})[key], rest, newValue)
      };
    }
  }
  dispose() {
    if (!this.isConnected)
      return;
    this.isConnected = false;
    this.dataListeners.forEach((l5) => l5());
    this.dataListeners = [];
    if (this.compUnsub) {
      this.compUnsub();
      this.compUnsub = void 0;
    }
  }
  notify() {
    this.propsListeners.forEach((l5) => l5(this.currentProps));
  }
  subscribe(listener) {
    if (this.propsListeners.length === 0) {
      this.connect();
    }
    this.propsListeners.push(listener);
    return {
      unsubscribe: () => {
        this.propsListeners = this.propsListeners.filter((l5) => l5 !== listener);
        if (this.propsListeners.length === 0) {
          this.dispose();
        }
      }
    };
  }
  get snapshot() {
    return this.currentProps;
  }
};

// node_modules/@a2ui/web_core/src/v0_9/schema/common-types.js
var DataBindingSchema = external_exports.object({
  "path": external_exports.string().describe("A JSON Pointer path to a value in the data model.")
}).describe("REF:common_types.json#/$defs/DataBinding|A JSON Pointer path to a value in the data model.");
var FunctionCallSchema = external_exports.object({
  "call": external_exports.string().describe("The name of the function to call."),
  "args": external_exports.record(external_exports.any()).describe("Arguments passed to the function."),
  "returnType": external_exports.enum(["string", "number", "boolean", "array", "object", "any", "void"]).default("boolean")
}).describe("REF:common_types.json#/$defs/FunctionCall|Invokes a named function on the client.");
var DynamicBooleanSchema = external_exports.union([external_exports.boolean(), DataBindingSchema, FunctionCallSchema]).describe("REF:common_types.json#/$defs/DynamicBoolean|A boolean value that can be a literal, a path, or a function call returning a boolean.");
var DynamicStringSchema = external_exports.union([
  external_exports.string(),
  DataBindingSchema,
  // FunctionCall returning string (simplified schema for Zod, stricter in JSON Schema)
  FunctionCallSchema
]).describe("REF:common_types.json#/$defs/DynamicString|Represents a string");
var DynamicNumberSchema = external_exports.union([external_exports.number(), DataBindingSchema, FunctionCallSchema]).describe("REF:common_types.json#/$defs/DynamicNumber|Represents a value that can be either a literal number, a path to a number in the data model, or a function call returning a number.");
var DynamicStringListSchema = external_exports.union([external_exports.array(external_exports.string()), DataBindingSchema, FunctionCallSchema]).describe("REF:common_types.json#/$defs/DynamicStringList|Represents a value that can be either a literal array of strings, a path to a string array in the data model, or a function call returning a string array.");
var DynamicValueSchema = external_exports.union([
  external_exports.string(),
  external_exports.number(),
  external_exports.boolean(),
  external_exports.array(external_exports.any()),
  DataBindingSchema,
  FunctionCallSchema
]).describe("REF:common_types.json#/$defs/DynamicValue|A value that can be a literal, a path, or a function call returning any type.");
var ComponentIdSchema = external_exports.string().describe("REF:common_types.json#/$defs/ComponentId|The unique identifier for a component.");
var ChildListSchema = external_exports.union([
  external_exports.array(ComponentIdSchema).describe("A static list of child component IDs."),
  external_exports.object({
    "componentId": ComponentIdSchema,
    "path": external_exports.string().describe("The path to the list of component property objects in the data model.")
  }).describe("A template for generating a dynamic list of children.")
]).describe("REF:common_types.json#/$defs/ChildList");
var ActionSchema = external_exports.union([
  external_exports.object({
    "event": external_exports.object({
      "name": external_exports.string(),
      "context": external_exports.record(DynamicValueSchema).optional()
    })
  }).describe("Triggers a server-side event."),
  external_exports.object({
    "functionCall": FunctionCallSchema
  }).describe("Executes a local client-side function.")
]).describe("REF:common_types.json#/$defs/Action");
var CheckRuleSchema = external_exports.object({
  "condition": DynamicBooleanSchema,
  "message": external_exports.string().describe("The error message to display if the check fails.")
}).describe("REF:common_types.json#/$defs/CheckRule|A check rule consisting of a condition and an error message.");
var CheckableSchema = external_exports.object({
  "checks": external_exports.array(CheckRuleSchema).optional().describe("A list of checks to perform."),
  "isValid": external_exports.boolean().optional().describe("Whether the checks currently pass."),
  "validationErrors": external_exports.array(external_exports.string()).optional().describe("Current validation error messages.")
}).describe("REF:common_types.json#/$defs/Checkable|Properties for components that support client-side checks.");
var AccessibilityAttributesSchema = external_exports.object({
  "label": DynamicStringSchema.optional().describe("REF:common_types.json#/$defs/DynamicString|A short string used by assistive technologies to convey the purpose of an element."),
  "description": DynamicStringSchema.optional().describe("REF:common_types.json#/$defs/DynamicString|Additional information provided by assistive technologies about an element.")
}).describe("REF:common_types.json#/$defs/AccessibilityAttributes|Attributes to enhance accessibility.");
var AnyComponentSchema = external_exports.object({
  "component": external_exports.string().describe("The type name of the component."),
  "id": ComponentIdSchema.optional(),
  "weight": external_exports.number().optional()
}).passthrough().describe("A generic A2UI component definition.");

// node_modules/@a2ui/web_core/src/v0_9/basic_catalog/expressions/expression_parser.js
var ExpressionParser = class _ExpressionParser {
  static {
    this.MAX_DEPTH = 10;
  }
  /**
   * Parses an input string into an array of DynamicValues.
   * If the input contains no interpolation, it returns the raw string as a single literal.
   */
  parse(input, depth = 0) {
    if (depth > _ExpressionParser.MAX_DEPTH) {
      throw new A2uiExpressionError("Max recursion depth reached in parse");
    }
    if (!input || !input.includes("${")) {
      return [input];
    }
    const parts = [];
    const scanner = new Scanner(input);
    while (!scanner.isAtEnd()) {
      if (scanner.matches("${")) {
        scanner.advance(2);
        const content = this.extractInterpolationContent(scanner);
        const parsed = this.parseExpression(content, depth + 1);
        if (parsed !== null) {
          parts.push(parsed);
        }
      } else if (scanner.peek() === "\\" && scanner.peek(1) === "$" && scanner.peek(2) === "{") {
        scanner.advance();
        parts.push("${");
        scanner.advance(2);
      } else {
        const start = scanner.pos;
        while (!scanner.isAtEnd()) {
          if (scanner.matches("${")) {
            break;
          }
          if (scanner.peek() === "\\" && scanner.peek(1) === "$" && scanner.peek(2) === "{") {
            break;
          }
          scanner.advance();
        }
        parts.push(scanner.input.substring(start, scanner.pos));
      }
    }
    return parts.filter((p4) => p4 !== null && p4 !== "");
  }
  extractInterpolationContent(scanner) {
    const start = scanner.pos;
    let braceBalance = 1;
    while (!scanner.isAtEnd() && braceBalance > 0) {
      const char = scanner.advance();
      if (char === "{") {
        braceBalance++;
      } else if (char === "}") {
        braceBalance--;
      } else if (char === "'" || char === '"') {
        const quote = char;
        while (!scanner.isAtEnd()) {
          const c9 = scanner.advance();
          if (c9 === "\\") {
            scanner.advance();
          } else if (c9 === quote) {
            break;
          }
        }
      }
    }
    if (braceBalance > 0) {
      throw new A2uiExpressionError("Unclosed interpolation: missing '}'");
    }
    return scanner.input.substring(start, scanner.pos - 1);
  }
  /**
   * Parses a single expression string into a DynamicValue.
   *
   * Unlike `parse()`, which handles mixed literal text and interpolations,
   * this assumes the entire string is a single expression (e.g., as found inside `${...}`).
   *
   * @param expr The expression string to parse.
   * @param depth The current recursion depth.
   * @returns The resolved DynamicValue.
   */
  parseExpression(expr, depth = 0) {
    expr = expr.trim();
    if (!expr)
      return "";
    const scanner = new Scanner(expr);
    const result = this.parseExpressionInternal(scanner, depth);
    if (!scanner.isAtEnd()) {
      throw new A2uiExpressionError(`Unexpected characters at end of expression: '${scanner.input.substring(scanner.pos)}'`);
    }
    return result;
  }
  parseExpressionInternal(scanner, depth) {
    scanner.skipWhitespace();
    if (scanner.isAtEnd())
      return "";
    if (scanner.matches("${")) {
      scanner.advance(2);
      const content = this.extractInterpolationContent(scanner);
      return this.parseExpression(content, depth + 1);
    }
    if (scanner.matchesString("'") || scanner.matchesString('"')) {
      return this.parseStringLiteral(scanner);
    }
    if (this.isDigit(scanner.peek())) {
      return this.parseNumberLiteral(scanner);
    }
    if (scanner.matchesKeyword("true"))
      return true;
    if (scanner.matchesKeyword("false"))
      return false;
    if (scanner.matchesKeyword("null"))
      return "";
    const token = this.scanPathOrIdentifier(scanner);
    scanner.skipWhitespace();
    if (scanner.peek() === "(") {
      return this.parseFunctionCall(token, scanner, depth);
    } else {
      if (!token) {
        return "";
      }
      return { path: token };
    }
  }
  scanPathOrIdentifier(scanner) {
    const start = scanner.pos;
    while (!scanner.isAtEnd()) {
      const c9 = scanner.peek();
      if (this.isAlnum(c9) || c9 === "/" || c9 === "." || c9 === "_" || c9 === "-") {
        scanner.advance();
      } else {
        break;
      }
    }
    return scanner.input.substring(start, scanner.pos);
  }
  parseFunctionCall(funcName, scanner, depth) {
    scanner.match("(");
    scanner.skipWhitespace();
    const args = {};
    while (!scanner.isAtEnd() && scanner.peek() !== ")") {
      const argName = this.scanIdentifier(scanner);
      scanner.skipWhitespace();
      if (!scanner.match(":")) {
        throw new A2uiExpressionError(`Expected ':' after argument name '${argName}' in function '${funcName}'`);
      }
      scanner.skipWhitespace();
      args[argName] = this.parseExpressionInternal(scanner, depth);
      scanner.skipWhitespace();
      if (scanner.peek() === ",") {
        scanner.advance();
        scanner.skipWhitespace();
      }
    }
    if (!scanner.match(")")) {
      throw new A2uiExpressionError(`Expected ')' after function arguments for '${funcName}'`);
    }
    return { call: funcName, args, returnType: "any" };
  }
  scanIdentifier(scanner) {
    const start = scanner.pos;
    while (!scanner.isAtEnd() && (this.isAlnum(scanner.peek()) || scanner.peek() === "_")) {
      scanner.advance();
    }
    return scanner.input.substring(start, scanner.pos);
  }
  parseStringLiteral(scanner) {
    const quote = scanner.advance();
    let result = "";
    while (!scanner.isAtEnd()) {
      const c9 = scanner.advance();
      if (c9 === "\\") {
        const next = scanner.advance();
        if (next === "n")
          result += "\n";
        else if (next === "t")
          result += "	";
        else if (next === "r")
          result += "\r";
        else
          result += next;
      } else if (c9 === quote) {
        break;
      } else {
        result += c9;
      }
    }
    return result;
  }
  parseNumberLiteral(scanner) {
    const start = scanner.pos;
    while (!scanner.isAtEnd() && (this.isDigit(scanner.peek()) || scanner.peek() === ".")) {
      scanner.advance();
    }
    return Number(scanner.input.substring(start, scanner.pos));
  }
  isAlnum(c9) {
    return c9 >= "a" && c9 <= "z" || c9 >= "A" && c9 <= "Z" || c9 >= "0" && c9 <= "9";
  }
  isDigit(c9) {
    return c9 >= "0" && c9 <= "9";
  }
};
var Scanner = class {
  constructor(input) {
    this.input = input;
    this.pos = 0;
  }
  isAtEnd() {
    return this.pos >= this.input.length;
  }
  peek(offset = 0) {
    if (this.pos + offset >= this.input.length)
      return "\0";
    return this.input[this.pos + offset];
  }
  advance(count = 1) {
    const char = this.input.substring(this.pos, this.pos + count);
    this.pos += count;
    return char;
  }
  match(expected) {
    if (this.peek() === expected) {
      this.advance();
      return true;
    }
    return false;
  }
  matches(expected) {
    if (this.input.startsWith(expected, this.pos)) {
      return true;
    }
    return false;
  }
  matchesString(expected) {
    return this.peek() === expected;
  }
  matchesKeyword(keyword) {
    if (this.input.startsWith(keyword, this.pos)) {
      const next = this.peek(keyword.length);
      if (!/[a-zA-Z0-9_]/.test(next)) {
        this.advance(keyword.length);
        return true;
      }
    }
    return false;
  }
  skipWhitespace() {
    while (!this.isAtEnd() && /\s/.test(this.peek())) {
      this.advance();
    }
  }
};

// node_modules/date-fns/constants.js
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var millisecondsInWeek = 6048e5;
var millisecondsInDay = 864e5;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;
var constructFromSymbol = /* @__PURE__ */ Symbol.for("constructDateFrom");

// node_modules/date-fns/constructFrom.js
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);
  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);
  if (date instanceof Date) return new date.constructor(value);
  return new Date(value);
}

// node_modules/date-fns/toDate.js
function toDate(argument, context) {
  return constructFrom(context || argument, argument);
}

// node_modules/date-fns/_lib/defaultOptions.js
var defaultOptions2 = {};
function getDefaultOptions2() {
  return defaultOptions2;
}

// node_modules/date-fns/startOfWeek.js
function startOfWeek(date, options) {
  const defaultOptions3 = getDefaultOptions2();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions3.weekStartsOn ?? defaultOptions3.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/startOfISOWeek.js
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}

// node_modules/date-fns/getISOWeekYear.js
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

// node_modules/date-fns/_lib/normalizeDates.js
function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object")
  );
  return dates.map(normalize);
}

// node_modules/date-fns/startOfDay.js
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/differenceInCalendarDays.js
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);
  const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}

// node_modules/date-fns/startOfISOWeekYear.js
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// node_modules/date-fns/isDate.js
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/date-fns/isValid.js
function isValid2(date) {
  return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}

// node_modules/date-fns/startOfYear.js
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

// node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};

// node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/date-fns/locale/en-US/_lib/formatLong.js
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};

// node_modules/date-fns/locale/en-US/_lib/formatRelative.js
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

// node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}

// node_modules/date-fns/locale/en-US/_lib/localize.js
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};

// node_modules/date-fns/locale/_lib/buildMatchFn.js
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // [TODO] -- I challenge you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}

// node_modules/date-fns/locale/en-US/_lib/match.js
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};

// node_modules/date-fns/locale/en-US.js
var enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};

// node_modules/date-fns/getDayOfYear.js
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// node_modules/date-fns/getISOWeek.js
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/getWeekYear.js
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const defaultOptions3 = getDefaultOptions2();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions3.firstWeekContainsDate ?? defaultOptions3.locale?.options?.firstWeekContainsDate ?? 1;
  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/startOfWeekYear.js
function startOfWeekYear(date, options) {
  const defaultOptions3 = getDefaultOptions2();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions3.firstWeekContainsDate ?? defaultOptions3.locale?.options?.firstWeekContainsDate ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// node_modules/date-fns/getWeek.js
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

// node_modules/date-fns/_lib/format/lightFormatters.js
var lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

// node_modules/date-fns/_lib/format/formatters.js
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(+date / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

// node_modules/date-fns/_lib/format/longFormatters.js
var dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
var timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
var dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

// node_modules/date-fns/_lib/protectedTokens.js
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

// node_modules/date-fns/format.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  const defaultOptions3 = getDefaultOptions2();
  const locale = options?.locale ?? defaultOptions3.locale ?? enUS;
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions3.firstWeekContainsDate ?? defaultOptions3.locale?.options?.firstWeekContainsDate ?? 1;
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions3.weekStartsOn ?? defaultOptions3.locale?.options?.weekStartsOn ?? 0;
  const originalDate = toDate(date, options?.in);
  if (!isValid2(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/@a2ui/web_core/src/v0_9/basic_catalog/functions/basic_functions_api.js
var AddApi = {
  name: "add",
  returnType: "number",
  schema: external_exports.object({
    "a": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number()),
    "b": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number())
  })
};
var SubtractApi = {
  name: "subtract",
  returnType: "number",
  schema: external_exports.object({
    "a": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number()),
    "b": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number())
  })
};
var MultiplyApi = {
  name: "multiply",
  returnType: "number",
  schema: external_exports.object({
    "a": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number()),
    "b": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number())
  })
};
var DivideApi = {
  name: "divide",
  returnType: "number",
  schema: external_exports.object({
    "a": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number()),
    "b": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number())
  })
};
var EqualsApi = {
  name: "equals",
  returnType: "boolean",
  schema: external_exports.object({
    "a": external_exports.any().refine((v3) => v3 !== void 0, "Required"),
    "b": external_exports.any().refine((v3) => v3 !== void 0, "Required")
  })
};
var NotEqualsApi = {
  name: "not_equals",
  returnType: "boolean",
  schema: external_exports.object({
    "a": external_exports.any().refine((v3) => v3 !== void 0, "Required"),
    "b": external_exports.any().refine((v3) => v3 !== void 0, "Required")
  })
};
var GreaterThanApi = {
  name: "greater_than",
  returnType: "boolean",
  schema: external_exports.object({
    "a": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number()),
    "b": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number())
  })
};
var LessThanApi = {
  name: "less_than",
  returnType: "boolean",
  schema: external_exports.object({
    "a": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number()),
    "b": external_exports.preprocess((v3) => v3 === null ? void 0 : v3, external_exports.coerce.number())
  })
};
var AndApi = {
  name: "and",
  returnType: "boolean",
  schema: external_exports.object({
    "values": external_exports.array(external_exports.any()).min(2)
  })
};
var OrApi = {
  name: "or",
  returnType: "boolean",
  schema: external_exports.object({
    "values": external_exports.array(external_exports.any()).min(2)
  })
};
var NotApi = {
  name: "not",
  returnType: "boolean",
  schema: external_exports.object({
    "value": external_exports.any().refine((v3) => v3 !== void 0, "Required")
  })
};
var ContainsApi = {
  name: "contains",
  returnType: "boolean",
  schema: external_exports.object({
    "string": external_exports.preprocess((v3) => v3 === void 0 ? void 0 : String(v3), external_exports.string()),
    "substring": external_exports.preprocess((v3) => v3 === void 0 ? void 0 : String(v3), external_exports.string())
  })
};
var StartsWithApi = {
  name: "starts_with",
  returnType: "boolean",
  schema: external_exports.object({
    "string": external_exports.preprocess((v3) => v3 === void 0 ? void 0 : String(v3), external_exports.string()),
    "prefix": external_exports.preprocess((v3) => v3 === void 0 ? void 0 : String(v3), external_exports.string())
  })
};
var EndsWithApi = {
  name: "ends_with",
  returnType: "boolean",
  schema: external_exports.object({
    "string": external_exports.preprocess((v3) => v3 === void 0 ? void 0 : String(v3), external_exports.string()),
    "suffix": external_exports.preprocess((v3) => v3 === void 0 ? void 0 : String(v3), external_exports.string())
  })
};
var RequiredApi = {
  name: "required",
  returnType: "boolean",
  schema: external_exports.object({
    "value": external_exports.any().refine((v3) => v3 !== void 0, "Required")
  })
};
var RegexApi = {
  name: "regex",
  returnType: "boolean",
  schema: external_exports.object({
    "value": external_exports.preprocess((v3) => v3 === void 0 ? void 0 : String(v3), external_exports.string()),
    "pattern": external_exports.preprocess((v3) => v3 === void 0 ? void 0 : String(v3), external_exports.string())
  })
};
var LengthApi = {
  name: "length",
  returnType: "boolean",
  schema: external_exports.object({
    "value": external_exports.any().refine((v3) => v3 !== void 0, "Required"),
    "min": external_exports.coerce.number().optional(),
    "max": external_exports.coerce.number().optional()
  }).refine((data) => data.min !== void 0 || data.max !== void 0, {
    message: "Must provide either 'min' or 'max'"
  })
};
var NumericApi = {
  name: "numeric",
  returnType: "boolean",
  schema: external_exports.object({
    "value": external_exports.coerce.number(),
    "min": external_exports.coerce.number().optional(),
    "max": external_exports.coerce.number().optional()
  }).refine((data) => data.min !== void 0 || data.max !== void 0, {
    message: "Must provide either 'min' or 'max'"
  })
};
var EmailApi = {
  name: "email",
  returnType: "boolean",
  schema: external_exports.object({
    "value": external_exports.preprocess((v3) => v3 === void 0 ? void 0 : String(v3), external_exports.string())
  })
};
var FormatStringApi = {
  name: "formatString",
  returnType: "any",
  schema: external_exports.object({
    "value": external_exports.coerce.string()
  })
};
var FormatNumberApi = {
  name: "formatNumber",
  returnType: "string",
  schema: external_exports.object({
    "value": external_exports.coerce.number(),
    "decimals": external_exports.coerce.number().optional(),
    "grouping": external_exports.boolean().default(true)
  })
};
var FormatCurrencyApi = {
  name: "formatCurrency",
  returnType: "string",
  schema: external_exports.object({
    "value": external_exports.coerce.number(),
    "currency": external_exports.coerce.string(),
    "decimals": external_exports.coerce.number().optional(),
    "grouping": external_exports.boolean().default(true)
  })
};
var FormatDateApi = {
  name: "formatDate",
  returnType: "string",
  schema: external_exports.object({
    "value": external_exports.any().refine((v3) => v3 !== void 0, "Required"),
    "format": external_exports.coerce.string()
  })
};
var PluralizeApi = {
  name: "pluralize",
  returnType: "string",
  schema: external_exports.object({
    "value": external_exports.coerce.number(),
    "zero": external_exports.coerce.string().optional(),
    "one": external_exports.coerce.string().optional(),
    "two": external_exports.coerce.string().optional(),
    "few": external_exports.coerce.string().optional(),
    "many": external_exports.coerce.string().optional(),
    "other": external_exports.coerce.string()
  })
};
var OpenUrlApi = {
  name: "openUrl",
  returnType: "void",
  schema: external_exports.object({
    "url": external_exports.preprocess((v3) => v3 === void 0 ? void 0 : String(v3), external_exports.string())
  })
};

// node_modules/@a2ui/web_core/src/v0_9/basic_catalog/functions/basic_functions.js
var AddImplementation = createFunctionImplementation(AddApi, (args) => args.a + args.b);
var SubtractImplementation = createFunctionImplementation(SubtractApi, (args) => args.a - args.b);
var MultiplyImplementation = createFunctionImplementation(MultiplyApi, (args) => args.a * args.b);
var DivideImplementation = createFunctionImplementation(DivideApi, (args) => {
  const a5 = args.a;
  const b4 = args.b;
  if (a5 === void 0 || a5 === null || b4 === void 0 || b4 === null) {
    return NaN;
  }
  const numA = Number(a5);
  const numB = Number(b4);
  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    return NaN;
  }
  if (numB === 0) {
    return Infinity;
  }
  return numA / numB;
});
var EqualsImplementation = createFunctionImplementation(EqualsApi, (args) => args.a === args.b);
var NotEqualsImplementation = createFunctionImplementation(NotEqualsApi, (args) => args.a !== args.b);
var GreaterThanImplementation = createFunctionImplementation(GreaterThanApi, (args) => args.a > args.b);
var LessThanImplementation = createFunctionImplementation(LessThanApi, (args) => args.a < args.b);
var AndImplementation = createFunctionImplementation(AndApi, (args) => {
  return args.values.every((v3) => !!v3);
});
var OrImplementation = createFunctionImplementation(OrApi, (args) => {
  return args.values.some((v3) => !!v3);
});
var NotImplementation = createFunctionImplementation(NotApi, (args) => !args.value);
var ContainsImplementation = createFunctionImplementation(ContainsApi, (args) => args.string.includes(args.substring));
var StartsWithImplementation = createFunctionImplementation(StartsWithApi, (args) => args.string.startsWith(args.prefix));
var EndsWithImplementation = createFunctionImplementation(EndsWithApi, (args) => args.string.endsWith(args.suffix));
var RequiredImplementation = createFunctionImplementation(RequiredApi, (args) => {
  const val = args.value;
  if (val === null || val === void 0)
    return false;
  if (typeof val === "string" && val === "")
    return false;
  if (Array.isArray(val) && val.length === 0)
    return false;
  return true;
});
var RegexImplementation = createFunctionImplementation(RegexApi, (args) => {
  try {
    return new RegExp(args.pattern).test(args.value);
  } catch (e11) {
    throw new A2uiExpressionError(`Invalid regex pattern: ${args.pattern}`, "regex", e11);
  }
});
var LengthImplementation = createFunctionImplementation(LengthApi, (args) => {
  const val = args.value;
  let len = 0;
  if (typeof val === "string" || Array.isArray(val)) {
    len = val.length;
  }
  if (args.min !== void 0 && !isNaN(args.min) && len < args.min)
    return false;
  if (args.max !== void 0 && !isNaN(args.max) && len > args.max)
    return false;
  return true;
});
var NumericImplementation = createFunctionImplementation(NumericApi, (args) => {
  if (isNaN(args.value))
    return false;
  if (args.min !== void 0 && !isNaN(args.min) && args.value < args.min)
    return false;
  if (args.max !== void 0 && !isNaN(args.max) && args.value > args.max)
    return false;
  return true;
});
var EmailImplementation = createFunctionImplementation(EmailApi, (args) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(args.value);
});
function coerceToString(value) {
  if (value === null || value === void 0)
    return "";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value) ?? String(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}
var FormatStringImplementation = createFunctionImplementation(FormatStringApi, (args, context) => {
  const template = args.value;
  const parser = new ExpressionParser();
  const parts = parser.parse(template);
  if (parts.length === 0)
    return "";
  const dynamicParts = parts.map((part) => {
    if (typeof part !== "object" || part === null || Array.isArray(part)) {
      return part;
    }
    return context.resolveSignal(part);
  });
  return computed(() => {
    return dynamicParts.map((p4) => {
      const resolved = isSignal(p4) ? getValue(p4) : p4;
      return coerceToString(resolved);
    }).join("");
  });
});
var numberFormatCache = /* @__PURE__ */ new Map();
function getNumberFormat(locale, decimals, grouping) {
  const key = `${locale ?? "default"}:${decimals ?? "undef"}:${grouping ?? "true"}`;
  let formatter = numberFormatCache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: grouping
    });
    numberFormatCache.set(key, formatter);
  }
  return formatter;
}
function createFormatNumberImplementation(locale) {
  return createFunctionImplementation(FormatNumberApi, (args) => {
    if (isNaN(args.value))
      return "";
    try {
      return getNumberFormat(locale, args.decimals, args.grouping).format(args.value);
    } catch (e11) {
      console.warn("Error formatting number:", e11);
      return args.decimals !== void 0 ? args.value.toFixed(args.decimals) : String(args.value);
    }
  });
}
var FormatNumberImplementation = createFormatNumberImplementation();
var currencyFormatCache = /* @__PURE__ */ new Map();
function getCurrencyFormat(locale, currency, decimals, grouping) {
  const key = `${locale ?? "default"}:${currency}:${decimals ?? "undef"}:${grouping ?? "true"}`;
  let formatter = currencyFormatCache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: grouping
    });
    currencyFormatCache.set(key, formatter);
  }
  return formatter;
}
function createFormatCurrencyImplementation(locale) {
  return createFunctionImplementation(FormatCurrencyApi, (args) => {
    if (isNaN(args.value))
      return "";
    try {
      return getCurrencyFormat(locale, args.currency, args.decimals, args.grouping).format(args.value);
    } catch (e11) {
      console.warn("Error formatting currency:", e11);
      return args.value.toFixed(args.decimals ?? 2);
    }
  });
}
var FormatCurrencyImplementation = createFormatCurrencyImplementation();
var FormatDateImplementation = createFunctionImplementation(FormatDateApi, (args) => {
  if (!args.value)
    return "";
  const date = new Date(args.value);
  if (isNaN(date.getTime()))
    return "";
  try {
    if (args.format === "ISO")
      return date.toISOString();
    return format(date, args.format);
  } catch (e11) {
    console.warn("Error formatting date:", e11);
    return date.toISOString();
  }
});
var pluralRulesCache = /* @__PURE__ */ new Map();
function getPluralRules(locale) {
  const key = locale ?? "default";
  let rules = pluralRulesCache.get(key);
  if (!rules) {
    rules = new Intl.PluralRules(locale);
    pluralRulesCache.set(key, rules);
  }
  return rules;
}
function createPluralizeImplementation(locale) {
  return createFunctionImplementation(PluralizeApi, (args) => {
    try {
      const rule = getPluralRules(locale).select(args.value);
      return String(args[rule] ?? args.other ?? "");
    } catch (e11) {
      console.warn("Error in pluralize:", e11);
      return String(args.other ?? "");
    }
  });
}
var PluralizeImplementation = createPluralizeImplementation();
var OpenUrlImplementation = createFunctionImplementation(OpenUrlApi, (args) => {
  if (args.url && typeof window !== "undefined" && window.open) {
    const baseHref = typeof window.location !== "undefined" && window.location.href ? window.location.href : void 0;
    let url;
    try {
      url = baseHref ? new URL(args.url, baseHref) : new URL(args.url);
    } catch (e11) {
      throw new A2uiExpressionError(`Invalid URL specified: ${args.url}`, "openUrl", e11);
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new A2uiExpressionError(`Unsupported URL scheme: ${url.protocol}`, "openUrl");
    }
    window.open(url.href, "_blank", "noopener,noreferrer");
  }
});
function createBasicCatalogFunctions(options) {
  const locale = options?.locale;
  return [
    AddImplementation,
    SubtractImplementation,
    MultiplyImplementation,
    DivideImplementation,
    EqualsImplementation,
    NotEqualsImplementation,
    GreaterThanImplementation,
    LessThanImplementation,
    AndImplementation,
    OrImplementation,
    NotImplementation,
    ContainsImplementation,
    StartsWithImplementation,
    EndsWithImplementation,
    RequiredImplementation,
    RegexImplementation,
    LengthImplementation,
    NumericImplementation,
    EmailImplementation,
    FormatStringImplementation,
    createFormatNumberImplementation(locale),
    createFormatCurrencyImplementation(locale),
    FormatDateImplementation,
    createPluralizeImplementation(locale),
    OpenUrlImplementation
  ];
}
var BASIC_FUNCTIONS = createBasicCatalogFunctions();

// node_modules/@a2ui/web_core/src/v0_9/basic_catalog/components/basic_components.js
var CommonProps = {
  "accessibility": AccessibilityAttributesSchema.optional(),
  "weight": external_exports.number().describe("The relative weight of this component within a Row or Column. This is similar to the CSS 'flex-grow' property. Note: this may ONLY be set when the component is a direct descendant of a Row or Column.").optional()
};
var TextApi = {
  name: "Text",
  schema: external_exports.object({
    ...CommonProps,
    "text": DynamicStringSchema.describe("The text content to display. While simple Markdown formatting is supported (i.e. without HTML, images, or links), utilizing dedicated UI components is generally preferred for a richer and more structured presentation."),
    "variant": external_exports.enum(["h1", "h2", "h3", "h4", "h5", "caption", "body"]).default("body").describe("A hint for the base text style.").optional()
  }).strict()
};
var ImageApi = {
  name: "Image",
  schema: external_exports.object({
    ...CommonProps,
    "url": DynamicStringSchema.describe("The URL of the image to display."),
    "description": DynamicStringSchema.describe("The accessibility description of the image.").optional(),
    "fit": external_exports.enum(["contain", "cover", "fill", "none", "scaleDown"]).default("fill").describe("Specifies how the image should be resized to fit its container. This corresponds to the CSS 'object-fit' property.").optional(),
    "variant": external_exports.enum(["icon", "avatar", "smallFeature", "mediumFeature", "largeFeature", "header"]).default("mediumFeature").describe("A hint for the image size and style.").optional()
  }).strict()
};
var ICON_NAMES = [
  "accountCircle",
  "add",
  "arrowBack",
  "arrowForward",
  "attachFile",
  "calendarToday",
  "call",
  "camera",
  "check",
  "close",
  "delete",
  "download",
  "edit",
  "event",
  "error",
  "fastForward",
  "favorite",
  "favoriteOff",
  "folder",
  "help",
  "home",
  "info",
  "locationOn",
  "lock",
  "lockOpen",
  "mail",
  "menu",
  "moreVert",
  "moreHoriz",
  "notificationsOff",
  "notifications",
  "pause",
  "payment",
  "person",
  "phone",
  "photo",
  "play",
  "print",
  "refresh",
  "rewind",
  "search",
  "send",
  "settings",
  "share",
  "shoppingCart",
  "skipNext",
  "skipPrevious",
  "star",
  "starHalf",
  "starOff",
  "stop",
  "upload",
  "visibility",
  "visibilityOff",
  "volumeDown",
  "volumeMute",
  "volumeOff",
  "volumeUp",
  "warning"
];
var IconApi = {
  name: "Icon",
  schema: external_exports.object({
    ...CommonProps,
    name: external_exports.union([
      external_exports.enum(ICON_NAMES),
      external_exports.object({
        svgPath: external_exports.string().describe("Custom SVG path data")
      }).strict(),
      external_exports.object({
        path: external_exports.string()
      }).strict()
    ]).describe("The name of the icon to display.")
  }).strict()
};
var VideoApi = {
  name: "Video",
  schema: external_exports.object({
    ...CommonProps,
    url: DynamicStringSchema.describe("The URL of the video to display.")
  }).strict()
};
var AudioPlayerApi = {
  name: "AudioPlayer",
  schema: external_exports.object({
    ...CommonProps,
    url: DynamicStringSchema.describe("The URL of the audio to be played."),
    description: DynamicStringSchema.describe("A description of the audio, such as a title or summary.").optional()
  }).strict()
};
var RowApi = {
  name: "Row",
  schema: external_exports.object({
    ...CommonProps,
    "children": ChildListSchema.describe("Defines the children. Use an array of strings for a fixed set of children, or a template object to generate children from a data list. Children cannot be defined inline, they must be referred to by ID."),
    "justify": external_exports.enum(["center", "end", "spaceAround", "spaceBetween", "spaceEvenly", "start", "stretch"]).default("start").describe("Defines the arrangement of children along the main axis (horizontally). Use 'spaceBetween' to push items to the edges, or 'start'/'end'/'center' to pack them together.").optional(),
    "align": external_exports.enum(["start", "center", "end", "stretch"]).default("stretch").describe("Defines the alignment of children along the cross axis (vertically). This is similar to the CSS 'align-items' property, but uses camelCase values (e.g., 'start').").optional()
  }).strict().describe("A layout component that arranges its children horizontally. To create a grid layout, nest Columns within this Row.")
};
var ColumnApi = {
  name: "Column",
  schema: external_exports.object({
    ...CommonProps,
    "children": ChildListSchema.describe("Defines the children. Use an array of strings for a fixed set of children, or a template object to generate children from a data list. Children cannot be defined inline, they must be referred to by ID."),
    "justify": external_exports.enum(["start", "center", "end", "spaceBetween", "spaceAround", "spaceEvenly", "stretch"]).default("start").describe("Defines the arrangement of children along the main axis (vertically). Use 'spaceBetween' to push items to the edges (e.g. header at top, footer at bottom), or 'start'/'end'/'center' to pack them together.").optional(),
    "align": external_exports.enum(["center", "end", "start", "stretch"]).default("stretch").describe("Defines the alignment of children along the cross axis (horizontally). This is similar to the CSS 'align-items' property.").optional()
  }).strict().describe("A layout component that arranges its children vertically. To create a grid layout, nest Rows within this Column.")
};
var ListApi = {
  name: "List",
  schema: external_exports.object({
    ...CommonProps,
    "children": ChildListSchema.describe("Defines the children. Use an array of strings for a fixed set of children, or a template object to generate children from a data list."),
    "direction": external_exports.enum(["vertical", "horizontal"]).default("vertical").describe("The direction in which the list items are laid out.").optional(),
    "align": external_exports.enum(["start", "center", "end", "stretch"]).default("stretch").describe("Defines the alignment of children along the cross axis.").optional(),
    "listStyle": external_exports.enum(["ordered", "unordered", "none"]).describe("The style of the list (ordered, unordered, or none).").optional()
  }).strict()
};
var CardApi = {
  name: "Card",
  schema: external_exports.object({
    ...CommonProps,
    "child": ComponentIdSchema.describe("The ID of the single child component to be rendered inside the card. To display multiple elements, you MUST wrap them in a layout component (like Column or Row) and pass that container's ID here. Do NOT pass multiple IDs or a non-existent ID. Do NOT define the child component inline.")
  }).strict()
};
var TabsApi = {
  name: "Tabs",
  schema: external_exports.object({
    ...CommonProps,
    "tabs": external_exports.array(external_exports.object({
      "title": DynamicStringSchema.describe("The tab title."),
      "child": ComponentIdSchema.describe("The ID of the child component. Do NOT define the component inline.")
    }).strict()).min(1).describe("An array of objects, where each object defines a tab with a title and a child component.")
  }).strict()
};
var ModalApi = {
  name: "Modal",
  schema: external_exports.object({
    ...CommonProps,
    "trigger": ComponentIdSchema.describe("The ID of the component that opens the modal when interacted with (e.g., a button). Do NOT define the component inline."),
    "content": ComponentIdSchema.describe("The ID of the component to be displayed inside the modal. Do NOT define the component inline.")
  }).strict()
};
var DividerApi = {
  name: "Divider",
  schema: external_exports.object({
    ...CommonProps,
    "axis": external_exports.enum(["horizontal", "vertical"]).default("horizontal").describe("The orientation of the divider.").optional()
  }).strict()
};
var ButtonApi = {
  name: "Button",
  schema: external_exports.object({
    ...CommonProps,
    "child": ComponentIdSchema.describe("The ID of the child component. Use a 'Text' component for a labeled button. Only use an 'Icon' if the requirements explicitly ask for an icon-only button. Do NOT define the child component inline."),
    "variant": external_exports.enum(["default", "primary", "borderless"]).default("default").describe("A hint for the button style. If omitted, a default button style is used. 'primary' indicates this is the main call-to-action button. 'borderless' means the button has no visual border or background, making its child content appear like a clickable link.").optional(),
    "action": ActionSchema.optional(),
    ...CheckableSchema.shape
  }).strict()
};
var TextFieldApi = {
  name: "TextField",
  schema: external_exports.object({
    ...CommonProps,
    "label": DynamicStringSchema.describe("The text label for the input field."),
    "value": DynamicStringSchema.describe("The value of the text field.").optional(),
    "variant": external_exports.enum(["longText", "number", "shortText", "obscured"]).default("shortText").describe("The type of input field to display.").optional(),
    "validationRegexp": external_exports.string().describe("A regular expression used for client-side validation of the input.").optional(),
    ...CheckableSchema.shape
  }).strict()
};
var CheckBoxApi = {
  name: "CheckBox",
  schema: external_exports.object({
    ...CommonProps,
    "label": DynamicStringSchema.describe("The text to display next to the checkbox."),
    "value": DynamicBooleanSchema.describe("The current state of the checkbox (true for checked, false for unchecked)."),
    ...CheckableSchema.shape
  }).strict()
};
var ChoicePickerApi = {
  name: "ChoicePicker",
  schema: external_exports.object({
    ...CommonProps,
    "label": DynamicStringSchema.describe("The label for the group of options.").optional(),
    "variant": external_exports.enum(["multipleSelection", "mutuallyExclusive"]).default("mutuallyExclusive").describe("A hint for how the choice picker should be displayed and behave.").optional(),
    "options": external_exports.array(external_exports.object({
      "label": DynamicStringSchema.describe("The text to display for this option."),
      "value": external_exports.string().describe("The stable value associated with this option.")
    }).strict()).describe("The list of available options to choose from."),
    "value": DynamicStringListSchema.describe("The list of currently selected values. This should be bound to a string array in the data model."),
    "displayStyle": external_exports.enum(["checkbox", "chips"]).default("checkbox").describe("The display style of the component.").optional(),
    "filterable": external_exports.boolean().default(false).describe("If true, displays a search input to filter the options.").optional(),
    ...CheckableSchema.shape
  }).strict().describe("A component that allows selecting one or more options from a list.")
};
var SliderApi = {
  name: "Slider",
  schema: external_exports.object({
    ...CommonProps,
    "label": DynamicStringSchema.describe("The label for the slider.").optional(),
    "min": external_exports.number().default(0).describe("The minimum value of the slider.").optional(),
    "max": external_exports.number().describe("The maximum value of the slider."),
    "value": DynamicNumberSchema.describe("The current value of the slider."),
    ...CheckableSchema.shape
  }).strict()
};
var DateTimeInputApi = {
  name: "DateTimeInput",
  schema: external_exports.object({
    ...CommonProps,
    "value": DynamicStringSchema.describe("The selected date and/or time value in ISO 8601 format. If not yet set, initialize with an empty string."),
    "enableDate": external_exports.boolean().default(false).describe("If true, allows the user to select a date.").optional(),
    "enableTime": external_exports.boolean().default(false).describe("If true, allows the user to select a time.").optional(),
    "min": external_exports.union([DynamicStringSchema, external_exports.string().date(), external_exports.string().time(), external_exports.string().datetime()]).describe("The minimum allowed date/time in ISO 8601 format.").optional(),
    "max": external_exports.union([DynamicStringSchema, external_exports.string().date(), external_exports.string().time(), external_exports.string().datetime()]).describe("The maximum allowed date/time in ISO 8601 format.").optional(),
    "label": DynamicStringSchema.describe("The text label for the input field.").optional(),
    ...CheckableSchema.shape
  }).strict()
};

// node_modules/@a2ui/web_core/src/v0_9/basic_catalog/styles/default.js
var DEFAULT_CSS = `
  :where(:root) {
    color-scheme: light dark;
  }

  :where(.a2ui-dark) {
    color-scheme: dark;
  }

  :where(.a2ui-light) {
    color-scheme: light;
  }

  :where(:root), :where(.a2ui-dark), :where(.a2ui-light) {
    --a2ui-color-background: light-dark(#eee, #111);
    --a2ui-color-on-background: light-dark(#333, #eee);

    --a2ui-color-surface: light-dark(
      color-mix(in oklab, var(--a2ui-color-background) 85%, white),
      color-mix(in oklab, var(--a2ui-color-background) 95%, white)
    );
    --a2ui-color-on-surface: light-dark(#333, #eee);

    --a2ui-color-primary: #17e;
    --a2ui-color-primary-light: ${computeColorVariant("light", { colorVar: "--a2ui-color-primary" })};
    --a2ui-color-primary-dark: ${computeColorVariant("dark", { colorVar: "--a2ui-color-primary" })};
    --a2ui-color-primary-hover: ${computeColorVariant("hover", { darkVar: "--a2ui-color-primary-dark", lightVar: "--a2ui-color-primary-light" })};
    --a2ui-color-on-primary: #fff;

    --a2ui-color-secondary: light-dark(#ddd, #333);
    --a2ui-color-secondary-light: ${computeColorVariant("light", { colorVar: "--a2ui-color-secondary" })};
    --a2ui-color-secondary-dark: ${computeColorVariant("dark", { colorVar: "--a2ui-color-secondary", percentage: 95 })};
    --a2ui-color-secondary-hover: ${computeColorVariant("hover", { darkVar: "--a2ui-color-secondary-dark", lightVar: "--a2ui-color-secondary-light" })};
    --a2ui-color-on-secondary: light-dark(#333, #eee);

    --a2ui-border-radius: 0.25rem;
    --a2ui-color-border: light-dark(#ccc, #444);
    --a2ui-border-width: 1px;
    --a2ui-border: 1px solid var(--a2ui-color-border, #ccc);

    --a2ui-font-family-title: inherit;
    --a2ui-font-family-monospace: monospace;
    --a2ui-color-input: light-dark(#fff, #2a2a2a);
    --a2ui-color-on-input: light-dark(#333, #eee);

    --a2ui-grid-base: 0.5rem;
    --a2ui-spacing-xs: calc(var(--a2ui-spacing-s) / 2);
    --a2ui-spacing-s: calc(var(--a2ui-spacing-m) / 2);
    --a2ui-spacing-m: var(--a2ui-grid-base);
    --a2ui-spacing-l: calc(var(--a2ui-spacing-m) * 2);
    --a2ui-spacing-xl: calc(var(--a2ui-spacing-l) * 2);

    --a2ui-font-size: 1rem;
    --a2ui-font-scale: 1.2;
    --a2ui-font-size-xs: calc(var(--a2ui-font-size-s) / var(--a2ui-font-scale));
    --a2ui-font-size-s: calc(var(--a2ui-font-size-m) / var(--a2ui-font-scale));
    --a2ui-font-size-m: var(--a2ui-font-size);
    --a2ui-font-size-l: calc(var(--a2ui-font-size-m) * var(--a2ui-font-scale));
    --a2ui-font-size-xl: calc(var(--a2ui-font-size-l) * var(--a2ui-font-scale));
    --a2ui-font-size-2xl: calc(var(--a2ui-font-size-xl) * var(--a2ui-font-scale));

    --a2ui-line-height-headings: 1.2;
    --a2ui-line-height-body: 1.5;
  }
`;
var defaultStyleSheet;
function getDefaultStyleSheet() {
  if (!defaultStyleSheet) {
    defaultStyleSheet = new CSSStyleSheet();
    defaultStyleSheet.replaceSync(DEFAULT_CSS);
  }
  return defaultStyleSheet;
}
function injectBasicCatalogStyles() {
  if (typeof document === "undefined")
    return;
  const sheet = getDefaultStyleSheet();
  if (!document.adoptedStyleSheets.includes(sheet)) {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }
}
function computeColorVariant(type, options) {
  switch (type) {
    case "light": {
      const opt = options;
      return `color-mix(in oklab, var(${opt.colorVar}) ${opt.percentage ?? 85}%, ${opt.mixColor ?? "white"})`;
    }
    case "dark": {
      const opt = options;
      return `color-mix(in oklab, var(${opt.colorVar}) ${opt.percentage ?? 85}%, ${opt.mixColor ?? "black"})`;
    }
    case "hover": {
      const opt = options;
      return `light-dark(var(${opt.darkVar}), var(${opt.lightVar}))`;
    }
  }
}

// node_modules/@a2ui/lit/src/v0_9/a2ui-controller.js
var A2uiController = class {
  /**
   * Initializes the controller, binding it to the given Lit element and API schema.
   *
   * @param host The A2uiLitElement acting as the component host.
   * @param api The A2UI component API defining the schema for this element.
   */
  constructor(host, api) {
    this.host = host;
    this.binder = new GenericBinder(this.host.context, api.schema);
    this.props = this.binder.snapshot;
    this.host.addController(this);
    if (this.host.isConnected) {
      this.hostConnected();
    }
  }
  /**
   * Subscribes to the GenericBinder updates when the host connects.
   *
   * Triggers a request update on the host element when new props are received.
   */
  hostConnected() {
    if (!this.subscription) {
      this.subscription = this.binder.subscribe((newProps) => {
        this.props = newProps;
        this.host.requestUpdate();
      });
    }
  }
  /**
   * Unsubscribes from the GenericBinder updates when the host disconnects.
   */
  hostDisconnected() {
    this.subscription?.unsubscribe();
    this.subscription = void 0;
  }
  /**
   * Disposes the underlying GenericBinder to clean up resources from the context.
   */
  dispose() {
    this.binder.dispose();
  }
};

// node_modules/@lit/reactive-element/css-tag.js
var t2 = globalThis;
var e2 = t2.ShadowRoot && (void 0 === t2.ShadyCSS || t2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s2 = /* @__PURE__ */ Symbol();
var o2 = /* @__PURE__ */ new WeakMap();
var n2 = class {
  constructor(t8, e11, o12) {
    if (this._$cssResult$ = true, o12 !== s2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t8, this.t = e11;
  }
  get styleSheet() {
    let t8 = this.o;
    const s11 = this.t;
    if (e2 && void 0 === t8) {
      const e11 = void 0 !== s11 && 1 === s11.length;
      e11 && (t8 = o2.get(s11)), void 0 === t8 && ((this.o = t8 = new CSSStyleSheet()).replaceSync(this.cssText), e11 && o2.set(s11, t8));
    }
    return t8;
  }
  toString() {
    return this.cssText;
  }
};
var r2 = (t8) => new n2("string" == typeof t8 ? t8 : t8 + "", void 0, s2);
var i2 = (t8, ...e11) => {
  const o12 = 1 === t8.length ? t8[0] : e11.reduce((e12, s11, o13) => e12 + ((t9) => {
    if (true === t9._$cssResult$) return t9.cssText;
    if ("number" == typeof t9) return t9;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t9 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s11) + t8[o13 + 1], t8[0]);
  return new n2(o12, t8, s2);
};
var S2 = (s11, o12) => {
  if (e2) s11.adoptedStyleSheets = o12.map((t8) => t8 instanceof CSSStyleSheet ? t8 : t8.styleSheet);
  else for (const e11 of o12) {
    const o13 = document.createElement("style"), n12 = t2.litNonce;
    void 0 !== n12 && o13.setAttribute("nonce", n12), o13.textContent = e11.cssText, s11.appendChild(o13);
  }
};
var c2 = e2 ? (t8) => t8 : (t8) => t8 instanceof CSSStyleSheet ? ((t9) => {
  let e11 = "";
  for (const s11 of t9.cssRules) e11 += s11.cssText;
  return r2(e11);
})(t8) : t8;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i3, defineProperty: e3, getOwnPropertyDescriptor: h2, getOwnPropertyNames: r3, getOwnPropertySymbols: o3, getPrototypeOf: n3 } = Object;
var a2 = globalThis;
var c3 = a2.trustedTypes;
var l2 = c3 ? c3.emptyScript : "";
var p2 = a2.reactiveElementPolyfillSupport;
var d2 = (t8, s11) => t8;
var u2 = { toAttribute(t8, s11) {
  switch (s11) {
    case Boolean:
      t8 = t8 ? l2 : null;
      break;
    case Object:
    case Array:
      t8 = null == t8 ? t8 : JSON.stringify(t8);
  }
  return t8;
}, fromAttribute(t8, s11) {
  let i10 = t8;
  switch (s11) {
    case Boolean:
      i10 = null !== t8;
      break;
    case Number:
      i10 = null === t8 ? null : Number(t8);
      break;
    case Object:
    case Array:
      try {
        i10 = JSON.parse(t8);
      } catch (t9) {
        i10 = null;
      }
  }
  return i10;
} };
var f2 = (t8, s11) => !i3(t8, s11);
var b2 = { attribute: true, type: String, converter: u2, reflect: false, useDefault: false, hasChanged: f2 };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), a2.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y2 = class extends HTMLElement {
  static addInitializer(t8) {
    this._$Ei(), (this.l ??= []).push(t8);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t8, s11 = b2) {
    if (s11.state && (s11.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t8) && ((s11 = Object.create(s11)).wrapped = true), this.elementProperties.set(t8, s11), !s11.noAccessor) {
      const i10 = /* @__PURE__ */ Symbol(), h6 = this.getPropertyDescriptor(t8, i10, s11);
      void 0 !== h6 && e3(this.prototype, t8, h6);
    }
  }
  static getPropertyDescriptor(t8, s11, i10) {
    const { get: e11, set: r9 } = h2(this.prototype, t8) ?? { get() {
      return this[s11];
    }, set(t9) {
      this[s11] = t9;
    } };
    return { get: e11, set(s12) {
      const h6 = e11?.call(this);
      r9?.call(this, s12), this.requestUpdate(t8, h6, i10);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t8) {
    return this.elementProperties.get(t8) ?? b2;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d2("elementProperties"))) return;
    const t8 = n3(this);
    t8.finalize(), void 0 !== t8.l && (this.l = [...t8.l]), this.elementProperties = new Map(t8.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d2("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d2("properties"))) {
      const t9 = this.properties, s11 = [...r3(t9), ...o3(t9)];
      for (const i10 of s11) this.createProperty(i10, t9[i10]);
    }
    const t8 = this[Symbol.metadata];
    if (null !== t8) {
      const s11 = litPropertyMetadata.get(t8);
      if (void 0 !== s11) for (const [t9, i10] of s11) this.elementProperties.set(t9, i10);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t9, s11] of this.elementProperties) {
      const i10 = this._$Eu(t9, s11);
      void 0 !== i10 && this._$Eh.set(i10, t9);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s11) {
    const i10 = [];
    if (Array.isArray(s11)) {
      const e11 = new Set(s11.flat(1 / 0).reverse());
      for (const s12 of e11) i10.unshift(c2(s12));
    } else void 0 !== s11 && i10.push(c2(s11));
    return i10;
  }
  static _$Eu(t8, s11) {
    const i10 = s11.attribute;
    return false === i10 ? void 0 : "string" == typeof i10 ? i10 : "string" == typeof t8 ? t8.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t8) => this.enableUpdating = t8), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t8) => t8(this));
  }
  addController(t8) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t8), void 0 !== this.renderRoot && this.isConnected && t8.hostConnected?.();
  }
  removeController(t8) {
    this._$EO?.delete(t8);
  }
  _$E_() {
    const t8 = /* @__PURE__ */ new Map(), s11 = this.constructor.elementProperties;
    for (const i10 of s11.keys()) this.hasOwnProperty(i10) && (t8.set(i10, this[i10]), delete this[i10]);
    t8.size > 0 && (this._$Ep = t8);
  }
  createRenderRoot() {
    const t8 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S2(t8, this.constructor.elementStyles), t8;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t8) => t8.hostConnected?.());
  }
  enableUpdating(t8) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t8) => t8.hostDisconnected?.());
  }
  attributeChangedCallback(t8, s11, i10) {
    this._$AK(t8, i10);
  }
  _$ET(t8, s11) {
    const i10 = this.constructor.elementProperties.get(t8), e11 = this.constructor._$Eu(t8, i10);
    if (void 0 !== e11 && true === i10.reflect) {
      const h6 = (void 0 !== i10.converter?.toAttribute ? i10.converter : u2).toAttribute(s11, i10.type);
      this._$Em = t8, null == h6 ? this.removeAttribute(e11) : this.setAttribute(e11, h6), this._$Em = null;
    }
  }
  _$AK(t8, s11) {
    const i10 = this.constructor, e11 = i10._$Eh.get(t8);
    if (void 0 !== e11 && this._$Em !== e11) {
      const t9 = i10.getPropertyOptions(e11), h6 = "function" == typeof t9.converter ? { fromAttribute: t9.converter } : void 0 !== t9.converter?.fromAttribute ? t9.converter : u2;
      this._$Em = e11;
      const r9 = h6.fromAttribute(s11, t9.type);
      this[e11] = r9 ?? this._$Ej?.get(e11) ?? r9, this._$Em = null;
    }
  }
  requestUpdate(t8, s11, i10, e11 = false, h6) {
    if (void 0 !== t8) {
      const r9 = this.constructor;
      if (false === e11 && (h6 = this[t8]), i10 ??= r9.getPropertyOptions(t8), !((i10.hasChanged ?? f2)(h6, s11) || i10.useDefault && i10.reflect && h6 === this._$Ej?.get(t8) && !this.hasAttribute(r9._$Eu(t8, i10)))) return;
      this.C(t8, s11, i10);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t8, s11, { useDefault: i10, reflect: e11, wrapped: h6 }, r9) {
    i10 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t8) && (this._$Ej.set(t8, r9 ?? s11 ?? this[t8]), true !== h6 || void 0 !== r9) || (this._$AL.has(t8) || (this.hasUpdated || i10 || (s11 = void 0), this._$AL.set(t8, s11)), true === e11 && this._$Em !== t8 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t8));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t9) {
      Promise.reject(t9);
    }
    const t8 = this.scheduleUpdate();
    return null != t8 && await t8, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t10, s12] of this._$Ep) this[t10] = s12;
        this._$Ep = void 0;
      }
      const t9 = this.constructor.elementProperties;
      if (t9.size > 0) for (const [s12, i10] of t9) {
        const { wrapped: t10 } = i10, e11 = this[s12];
        true !== t10 || this._$AL.has(s12) || void 0 === e11 || this.C(s12, void 0, i10, e11);
      }
    }
    let t8 = false;
    const s11 = this._$AL;
    try {
      t8 = this.shouldUpdate(s11), t8 ? (this.willUpdate(s11), this._$EO?.forEach((t9) => t9.hostUpdate?.()), this.update(s11)) : this._$EM();
    } catch (s12) {
      throw t8 = false, this._$EM(), s12;
    }
    t8 && this._$AE(s11);
  }
  willUpdate(t8) {
  }
  _$AE(t8) {
    this._$EO?.forEach((t9) => t9.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t8)), this.updated(t8);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t8) {
    return true;
  }
  update(t8) {
    this._$Eq &&= this._$Eq.forEach((t9) => this._$ET(t9, this[t9])), this._$EM();
  }
  updated(t8) {
  }
  firstUpdated(t8) {
  }
};
y2.elementStyles = [], y2.shadowRootOptions = { mode: "open" }, y2[d2("elementProperties")] = /* @__PURE__ */ new Map(), y2[d2("finalized")] = /* @__PURE__ */ new Map(), p2?.({ ReactiveElement: y2 }), (a2.reactiveElementVersions ??= []).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t3 = globalThis;
var i4 = (t8) => t8;
var s3 = t3.trustedTypes;
var e4 = s3 ? s3.createPolicy("lit-html", { createHTML: (t8) => t8 }) : void 0;
var h3 = "$lit$";
var o4 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n4 = "?" + o4;
var r4 = `<${n4}>`;
var l3 = document;
var c4 = () => l3.createComment("");
var a3 = (t8) => null === t8 || "object" != typeof t8 && "function" != typeof t8;
var u3 = Array.isArray;
var d3 = (t8) => u3(t8) || "function" == typeof t8?.[Symbol.iterator];
var f3 = "[ 	\n\f\r]";
var v2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _2 = /-->/g;
var m2 = />/g;
var p3 = RegExp(`>|${f3}(?:([^\\s"'>=/]+)(${f3}*=${f3}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g2 = /'/g;
var $ = /"/g;
var y3 = /^(?:script|style|textarea|title)$/i;
var x2 = (t8) => (i10, ...s11) => ({ _$litType$: t8, strings: i10, values: s11 });
var b3 = x2(1);
var w2 = x2(2);
var T = x2(3);
var E2 = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l3.createTreeWalker(l3, 129);
function V(t8, i10) {
  if (!u3(t8) || !t8.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e4 ? e4.createHTML(i10) : i10;
}
var N = (t8, i10) => {
  const s11 = t8.length - 1, e11 = [];
  let n12, l5 = 2 === i10 ? "<svg>" : 3 === i10 ? "<math>" : "", c9 = v2;
  for (let i11 = 0; i11 < s11; i11++) {
    const s12 = t8[i11];
    let a5, u5, d4 = -1, f5 = 0;
    for (; f5 < s12.length && (c9.lastIndex = f5, u5 = c9.exec(s12), null !== u5); ) f5 = c9.lastIndex, c9 === v2 ? "!--" === u5[1] ? c9 = _2 : void 0 !== u5[1] ? c9 = m2 : void 0 !== u5[2] ? (y3.test(u5[2]) && (n12 = RegExp("</" + u5[2], "g")), c9 = p3) : void 0 !== u5[3] && (c9 = p3) : c9 === p3 ? ">" === u5[0] ? (c9 = n12 ?? v2, d4 = -1) : void 0 === u5[1] ? d4 = -2 : (d4 = c9.lastIndex - u5[2].length, a5 = u5[1], c9 = void 0 === u5[3] ? p3 : '"' === u5[3] ? $ : g2) : c9 === $ || c9 === g2 ? c9 = p3 : c9 === _2 || c9 === m2 ? c9 = v2 : (c9 = p3, n12 = void 0);
    const x3 = c9 === p3 && t8[i11 + 1].startsWith("/>") ? " " : "";
    l5 += c9 === v2 ? s12 + r4 : d4 >= 0 ? (e11.push(a5), s12.slice(0, d4) + h3 + s12.slice(d4) + o4 + x3) : s12 + o4 + (-2 === d4 ? i11 : x3);
  }
  return [V(t8, l5 + (t8[s11] || "<?>") + (2 === i10 ? "</svg>" : 3 === i10 ? "</math>" : "")), e11];
};
var S3 = class _S {
  constructor({ strings: t8, _$litType$: i10 }, e11) {
    let r9;
    this.parts = [];
    let l5 = 0, a5 = 0;
    const u5 = t8.length - 1, d4 = this.parts, [f5, v3] = N(t8, i10);
    if (this.el = _S.createElement(f5, e11), P.currentNode = this.el.content, 2 === i10 || 3 === i10) {
      const t9 = this.el.content.firstChild;
      t9.replaceWith(...t9.childNodes);
    }
    for (; null !== (r9 = P.nextNode()) && d4.length < u5; ) {
      if (1 === r9.nodeType) {
        if (r9.hasAttributes()) for (const t9 of r9.getAttributeNames()) if (t9.endsWith(h3)) {
          const i11 = v3[a5++], s11 = r9.getAttribute(t9).split(o4), e12 = /([.?@])?(.*)/.exec(i11);
          d4.push({ type: 1, index: l5, name: e12[2], strings: s11, ctor: "." === e12[1] ? I : "?" === e12[1] ? L : "@" === e12[1] ? z : H }), r9.removeAttribute(t9);
        } else t9.startsWith(o4) && (d4.push({ type: 6, index: l5 }), r9.removeAttribute(t9));
        if (y3.test(r9.tagName)) {
          const t9 = r9.textContent.split(o4), i11 = t9.length - 1;
          if (i11 > 0) {
            r9.textContent = s3 ? s3.emptyScript : "";
            for (let s11 = 0; s11 < i11; s11++) r9.append(t9[s11], c4()), P.nextNode(), d4.push({ type: 2, index: ++l5 });
            r9.append(t9[i11], c4());
          }
        }
      } else if (8 === r9.nodeType) if (r9.data === n4) d4.push({ type: 2, index: l5 });
      else {
        let t9 = -1;
        for (; -1 !== (t9 = r9.data.indexOf(o4, t9 + 1)); ) d4.push({ type: 7, index: l5 }), t9 += o4.length - 1;
      }
      l5++;
    }
  }
  static createElement(t8, i10) {
    const s11 = l3.createElement("template");
    return s11.innerHTML = t8, s11;
  }
};
function M(t8, i10, s11 = t8, e11) {
  if (i10 === E2) return i10;
  let h6 = void 0 !== e11 ? s11._$Co?.[e11] : s11._$Cl;
  const o12 = a3(i10) ? void 0 : i10._$litDirective$;
  return h6?.constructor !== o12 && (h6?._$AO?.(false), void 0 === o12 ? h6 = void 0 : (h6 = new o12(t8), h6._$AT(t8, s11, e11)), void 0 !== e11 ? (s11._$Co ??= [])[e11] = h6 : s11._$Cl = h6), void 0 !== h6 && (i10 = M(t8, h6._$AS(t8, i10.values), h6, e11)), i10;
}
var R = class {
  constructor(t8, i10) {
    this._$AV = [], this._$AN = void 0, this._$AD = t8, this._$AM = i10;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t8) {
    const { el: { content: i10 }, parts: s11 } = this._$AD, e11 = (t8?.creationScope ?? l3).importNode(i10, true);
    P.currentNode = e11;
    let h6 = P.nextNode(), o12 = 0, n12 = 0, r9 = s11[0];
    for (; void 0 !== r9; ) {
      if (o12 === r9.index) {
        let i11;
        2 === r9.type ? i11 = new k(h6, h6.nextSibling, this, t8) : 1 === r9.type ? i11 = new r9.ctor(h6, r9.name, r9.strings, this, t8) : 6 === r9.type && (i11 = new Z(h6, this, t8)), this._$AV.push(i11), r9 = s11[++n12];
      }
      o12 !== r9?.index && (h6 = P.nextNode(), o12++);
    }
    return P.currentNode = l3, e11;
  }
  p(t8) {
    let i10 = 0;
    for (const s11 of this._$AV) void 0 !== s11 && (void 0 !== s11.strings ? (s11._$AI(t8, s11, i10), i10 += s11.strings.length - 2) : s11._$AI(t8[i10])), i10++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t8, i10, s11, e11) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t8, this._$AB = i10, this._$AM = s11, this.options = e11, this._$Cv = e11?.isConnected ?? true;
  }
  get parentNode() {
    let t8 = this._$AA.parentNode;
    const i10 = this._$AM;
    return void 0 !== i10 && 11 === t8?.nodeType && (t8 = i10.parentNode), t8;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t8, i10 = this) {
    t8 = M(this, t8, i10), a3(t8) ? t8 === A || null == t8 || "" === t8 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t8 !== this._$AH && t8 !== E2 && this._(t8) : void 0 !== t8._$litType$ ? this.$(t8) : void 0 !== t8.nodeType ? this.T(t8) : d3(t8) ? this.k(t8) : this._(t8);
  }
  O(t8) {
    return this._$AA.parentNode.insertBefore(t8, this._$AB);
  }
  T(t8) {
    this._$AH !== t8 && (this._$AR(), this._$AH = this.O(t8));
  }
  _(t8) {
    this._$AH !== A && a3(this._$AH) ? this._$AA.nextSibling.data = t8 : this.T(l3.createTextNode(t8)), this._$AH = t8;
  }
  $(t8) {
    const { values: i10, _$litType$: s11 } = t8, e11 = "number" == typeof s11 ? this._$AC(t8) : (void 0 === s11.el && (s11.el = S3.createElement(V(s11.h, s11.h[0]), this.options)), s11);
    if (this._$AH?._$AD === e11) this._$AH.p(i10);
    else {
      const t9 = new R(e11, this), s12 = t9.u(this.options);
      t9.p(i10), this.T(s12), this._$AH = t9;
    }
  }
  _$AC(t8) {
    let i10 = C.get(t8.strings);
    return void 0 === i10 && C.set(t8.strings, i10 = new S3(t8)), i10;
  }
  k(t8) {
    u3(this._$AH) || (this._$AH = [], this._$AR());
    const i10 = this._$AH;
    let s11, e11 = 0;
    for (const h6 of t8) e11 === i10.length ? i10.push(s11 = new _k(this.O(c4()), this.O(c4()), this, this.options)) : s11 = i10[e11], s11._$AI(h6), e11++;
    e11 < i10.length && (this._$AR(s11 && s11._$AB.nextSibling, e11), i10.length = e11);
  }
  _$AR(t8 = this._$AA.nextSibling, s11) {
    for (this._$AP?.(false, true, s11); t8 !== this._$AB; ) {
      const s12 = i4(t8).nextSibling;
      i4(t8).remove(), t8 = s12;
    }
  }
  setConnected(t8) {
    void 0 === this._$AM && (this._$Cv = t8, this._$AP?.(t8));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t8, i10, s11, e11, h6) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t8, this.name = i10, this._$AM = e11, this.options = h6, s11.length > 2 || "" !== s11[0] || "" !== s11[1] ? (this._$AH = Array(s11.length - 1).fill(new String()), this.strings = s11) : this._$AH = A;
  }
  _$AI(t8, i10 = this, s11, e11) {
    const h6 = this.strings;
    let o12 = false;
    if (void 0 === h6) t8 = M(this, t8, i10, 0), o12 = !a3(t8) || t8 !== this._$AH && t8 !== E2, o12 && (this._$AH = t8);
    else {
      const e12 = t8;
      let n12, r9;
      for (t8 = h6[0], n12 = 0; n12 < h6.length - 1; n12++) r9 = M(this, e12[s11 + n12], i10, n12), r9 === E2 && (r9 = this._$AH[n12]), o12 ||= !a3(r9) || r9 !== this._$AH[n12], r9 === A ? t8 = A : t8 !== A && (t8 += (r9 ?? "") + h6[n12 + 1]), this._$AH[n12] = r9;
    }
    o12 && !e11 && this.j(t8);
  }
  j(t8) {
    t8 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t8 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t8) {
    this.element[this.name] = t8 === A ? void 0 : t8;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t8) {
    this.element.toggleAttribute(this.name, !!t8 && t8 !== A);
  }
};
var z = class extends H {
  constructor(t8, i10, s11, e11, h6) {
    super(t8, i10, s11, e11, h6), this.type = 5;
  }
  _$AI(t8, i10 = this) {
    if ((t8 = M(this, t8, i10, 0) ?? A) === E2) return;
    const s11 = this._$AH, e11 = t8 === A && s11 !== A || t8.capture !== s11.capture || t8.once !== s11.once || t8.passive !== s11.passive, h6 = t8 !== A && (s11 === A || e11);
    e11 && this.element.removeEventListener(this.name, this, s11), h6 && this.element.addEventListener(this.name, this, t8), this._$AH = t8;
  }
  handleEvent(t8) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t8) : this._$AH.handleEvent(t8);
  }
};
var Z = class {
  constructor(t8, i10, s11) {
    this.element = t8, this.type = 6, this._$AN = void 0, this._$AM = i10, this.options = s11;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t8) {
    M(this, t8);
  }
};
var j2 = { M: h3, P: o4, A: n4, C: 1, L: N, R, D: d3, V: M, I: k, H, N: L, U: z, B: I, F: Z };
var B = t3.litHtmlPolyfillSupport;
B?.(S3, k), (t3.litHtmlVersions ??= []).push("3.3.3");
var D = (t8, i10, s11) => {
  const e11 = s11?.renderBefore ?? i10;
  let h6 = e11._$litPart$;
  if (void 0 === h6) {
    const t9 = s11?.renderBefore ?? null;
    e11._$litPart$ = h6 = new k(i10.insertBefore(c4(), t9), t9, void 0, s11 ?? {});
  }
  return h6._$AI(t8), h6;
};

// node_modules/lit-element/lit-element.js
var s4 = globalThis;
var i5 = class extends y2 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t8 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t8.firstChild, t8;
  }
  update(t8) {
    const r9 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t8), this._$Do = D(r9, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E2;
  }
};
i5._$litElement$ = true, i5["finalized"] = true, s4.litElementHydrateSupport?.({ LitElement: i5 });
var o5 = s4.litElementPolyfillSupport;
o5?.({ LitElement: i5 });
(s4.litElementVersions ??= []).push("4.2.2");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t4 = (t8) => (e11, o12) => {
  void 0 !== o12 ? o12.addInitializer(() => {
    customElements.define(t8, e11);
  }) : customElements.define(t8, e11);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o6 = { attribute: true, type: String, converter: u2, reflect: false, hasChanged: f2 };
var r5 = (t8 = o6, e11, r9) => {
  const { kind: n12, metadata: i10 } = r9;
  let s11 = globalThis.litPropertyMetadata.get(i10);
  if (void 0 === s11 && globalThis.litPropertyMetadata.set(i10, s11 = /* @__PURE__ */ new Map()), "setter" === n12 && ((t8 = Object.create(t8)).wrapped = true), s11.set(r9.name, t8), "accessor" === n12) {
    const { name: o12 } = r9;
    return { set(r10) {
      const n13 = e11.get.call(this);
      e11.set.call(this, r10), this.requestUpdate(o12, n13, t8, true, r10);
    }, init(e12) {
      return void 0 !== e12 && this.C(o12, void 0, t8, e12), e12;
    } };
  }
  if ("setter" === n12) {
    const { name: o12 } = r9;
    return function(r10) {
      const n13 = this[o12];
      e11.call(this, r10), this.requestUpdate(o12, n13, t8, true, r10);
    };
  }
  throw Error("Unsupported decorator location: " + n12);
};
function n5(t8) {
  return (e11, o12) => "object" == typeof o12 ? r5(t8, e11, o12) : ((t9, e12, o13) => {
    const r9 = e12.hasOwnProperty(o13);
    return e12.constructor.createProperty(o13, t9), r9 ? Object.getOwnPropertyDescriptor(e12, o13) : void 0;
  })(t8, e11, o12);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r6(r9) {
  return n5({ ...r9, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/decorators/base.js
var e5 = (e11, t8, c9) => (c9.configurable = true, c9.enumerable = true, Reflect.decorate && "object" != typeof t8 && Object.defineProperty(e11, t8, c9), c9);

// node_modules/@lit/reactive-element/decorators/query.js
function e6(e11, r9) {
  return (n12, s11, i10) => {
    const o12 = (t8) => t8.renderRoot?.querySelector(e11) ?? null;
    if (r9) {
      const { get: e12, set: r10 } = "object" == typeof s11 ? n12 : i10 ?? /* @__PURE__ */ (() => {
        const t8 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t8];
        }, set(e13) {
          this[t8] = e13;
        } };
      })();
      return e5(n12, s11, { get() {
        let t8 = e12.call(this);
        return void 0 === t8 && (t8 = o12(this), (null !== t8 || this.hasUpdated) && r10.call(this, t8)), t8;
      } });
    }
    return e5(n12, s11, { get() {
      return o12(this);
    } });
  };
}

// node_modules/lit-html/static.js
var a4 = /* @__PURE__ */ Symbol.for("");
var o7 = (t8) => {
  if (t8?.r === a4) return t8?._$litStatic$;
};
var s5 = (t8) => ({ _$litStatic$: t8, r: a4 });
var l4 = /* @__PURE__ */ new Map();
var n6 = (t8) => (r9, ...e11) => {
  const a5 = e11.length;
  let s11, i10;
  const n12 = [], u5 = [];
  let c9, $3 = 0, f5 = false;
  for (; $3 < a5; ) {
    for (c9 = r9[$3]; $3 < a5 && void 0 !== (i10 = e11[$3], s11 = o7(i10)); ) c9 += s11 + r9[++$3], f5 = true;
    $3 !== a5 && u5.push(i10), n12.push(c9), $3++;
  }
  if ($3 === a5 && n12.push(r9[a5]), f5) {
    const t9 = n12.join("$$lit$$");
    void 0 === (r9 = l4.get(t9)) && (n12.raw = n12, l4.set(t9, r9 = n12)), e11 = u5;
  }
  return t8(r9, ...e11);
};
var u4 = n6(b3);
var c5 = n6(w2);
var $2 = n6(T);

// node_modules/@a2ui/lit/src/v0_9/surface/render-a2ui-node.js
function renderA2uiNode(context, catalog) {
  const type = context.componentModel.type;
  const implementation = catalog.components.get(type);
  if (!implementation) {
    console.warn(`Component implementation not found for type: ${type}`);
    return A;
  }
  const tag = s5(implementation.tagName);
  return u4`<${tag} .context=${context}></${tag}>`;
}

// node_modules/@a2ui/lit/src/v0_9/surface/a2ui-surface.js
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiSurface = (() => {
  let _classDecorators = [t4("a2ui-surface")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = i5;
  let _surface_decorators;
  let _surface_initializers = [];
  let _surface_extraInitializers = [];
  let __hasRoot_decorators;
  let __hasRoot_initializers = [];
  let __hasRoot_extraInitializers = [];
  var A2uiSurface2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    constructor() {
      super(...arguments);
      this.#surface_accessor_storage = __runInitializers(this, _surface_initializers, void 0);
      this.#_hasRoot_accessor_storage = (__runInitializers(this, _surface_extraInitializers), __runInitializers(this, __hasRoot_initializers, false));
      this.unsubscribe = __runInitializers(this, __hasRoot_extraInitializers);
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _surface_decorators = [n5({ type: Object })];
      __hasRoot_decorators = [r6()];
      __esDecorate(this, null, _surface_decorators, { kind: "accessor", name: "surface", static: false, private: false, access: { has: (obj) => "surface" in obj, get: (obj) => obj.surface, set: (obj, value) => {
        obj.surface = value;
      } }, metadata: _metadata }, _surface_initializers, _surface_extraInitializers);
      __esDecorate(this, null, __hasRoot_decorators, { kind: "accessor", name: "_hasRoot", static: false, private: false, access: { has: (obj) => "_hasRoot" in obj, get: (obj) => obj._hasRoot, set: (obj, value) => {
        obj._hasRoot = value;
      } }, metadata: _metadata }, __hasRoot_initializers, __hasRoot_extraInitializers);
      __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiSurface2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
      __runInitializers(_classThis, _classExtraInitializers);
    }
    #surface_accessor_storage;
    /**
     * The surface model containing the component tree and catalog.
     */
    get surface() {
      return this.#surface_accessor_storage;
    }
    set surface(value) {
      this.#surface_accessor_storage = value;
    }
    #_hasRoot_accessor_storage;
    /**
     * Internal state indicating whether the root component exists.
     * @internal
     */
    get _hasRoot() {
      return this.#_hasRoot_accessor_storage;
    }
    set _hasRoot(value) {
      this.#_hasRoot_accessor_storage = value;
    }
    /**
     * Handles lifecycle updates, specifically when the `surface` property changes.
     *
     * It manages subscriptions to the components model to detect when the 'root'
     * component is created.
     *
     * @param changedProperties Map of changed properties.
     */
    willUpdate(changedProperties) {
      if (changedProperties.has("surface")) {
        if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = void 0;
        }
        this._hasRoot = !!this.surface?.componentsModel.get("root");
        if (this.surface && !this._hasRoot) {
          const sub = this.surface.componentsModel.onCreated.subscribe((comp) => {
            if (comp.id === "root") {
              this._hasRoot = true;
              this.requestUpdate();
              this.unsubscribe?.();
              this.unsubscribe = void 0;
            }
          });
          this.unsubscribe = () => sub.unsubscribe();
        }
      }
    }
    /**
     * Cleans up subscriptions.
     */
    disconnectedCallback() {
      super.disconnectedCallback();
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = void 0;
      }
    }
    /**
     * Renders the surface.
     *
     * If `surface` is not set, returns `nothing`.
     * If the root component is not yet available, renders a loading state.
     * Otherwise, renders the root component using `renderA2uiNode`.
     */
    render() {
      if (!this.surface)
        return A;
      if (!this._hasRoot) {
        return b3`<slot name="loading"><div>Loading surface...</div></slot>`;
      }
      try {
        const rootContext = new ComponentContext(this.surface, "root", "/");
        return b3`${renderA2uiNode(rootContext, this.surface.catalog)}`;
      } catch (e11) {
        console.error("Error creating root context:", e11);
        return b3`<div>Error rendering surface</div>`;
      }
    }
  };
  return A2uiSurface2 = _classThis;
})();

// node_modules/@a2ui/lit/src/v0_9/a2ui-lit-element.js
var __esDecorate2 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers2 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiLitElement = (() => {
  let _classSuper = i5;
  let _context_decorators;
  let _context_initializers = [];
  let _context_extraInitializers = [];
  return class A2uiLitElement extends _classSuper {
    constructor() {
      super(...arguments);
      this.#context_accessor_storage = __runInitializers2(this, _context_initializers, void 0);
      this.controller = __runInitializers2(this, _context_extraInitializers);
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _context_decorators = [n5({ type: Object })];
      __esDecorate2(this, null, _context_decorators, { kind: "accessor", name: "context", static: false, private: false, access: { has: (obj) => "context" in obj, get: (obj) => obj.context, set: (obj, value) => {
        obj.context = value;
      } }, metadata: _metadata }, _context_initializers, _context_extraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    #context_accessor_storage;
    get context() {
      return this.#context_accessor_storage;
    }
    set context(value) {
      this.#context_accessor_storage = value;
    }
    /**
     * Helper method to render a child A2UI node.
     * Abstracts away the need to manually create a ComponentContext.
     *
     * @param childRef The reference to the child component to render. Either a string ID
     *                 or a reference object containing `{id, basePath}`.
     * @param customPath An explicit data model path to bind the child to. If provided,
     *                   this overrides any path defined in the `childRef` object. If omitted,
     *                   falls back to the `childRef`'s `basePath`, or the current component's path.
     *
     * @returns A Lit template result containing the rendered child component, or `nothing` if the reference is empty.
     */
    renderNode(childRef, customPath) {
      if (!childRef)
        return A;
      const { surface, path: parentPath } = this.context.dataContext;
      const surfaceContainsComponent = !!surface.componentsModel.get(this.context.componentModel.id);
      if (!surfaceContainsComponent) {
        return A;
      }
      let componentId;
      let path = customPath;
      if (typeof childRef === "object") {
        componentId = childRef.id;
        path = path ?? childRef.basePath;
      } else {
        componentId = childRef;
      }
      path = path ?? parentPath;
      return renderA2uiNode(new ComponentContext(surface, componentId, path), surface.catalog);
    }
    /**
     * Reacts to changes in the component's properties.
     *
     * Specifically, when the `context` property changes or is initialized, this method
     * cleans up any existing controller and invokes `createController()` to bind to
     * the new context.
     */
    willUpdate(changedProperties) {
      super.willUpdate(changedProperties);
      if (changedProperties.has("context") && this.context) {
        if (this.controller) {
          this.removeController(this.controller);
          this.controller.dispose();
        }
        this.controller = this.createController();
      }
    }
  };
})();

// node_modules/@lit/context/lib/context-request-event.js
var s6 = class extends Event {
  constructor(s11, t8, e11, o12) {
    super("context-request", { bubbles: true, composed: true }), this.context = s11, this.contextTarget = t8, this.callback = e11, this.subscribe = o12 ?? false;
  }
};

// node_modules/@lit/context/lib/create-context.js
function n7(n12) {
  return n12;
}

// node_modules/@lit/context/lib/controllers/context-consumer.js
var s7 = class {
  constructor(t8, s11, i10, h6) {
    if (this.subscribe = false, this.provided = false, this.value = void 0, this.t = (t9, s12) => {
      this.unsubscribe && (this.unsubscribe !== s12 && (this.provided = false, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = t9, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = true, this.callback && this.callback(t9, s12)), this.unsubscribe = s12;
    }, this.host = t8, void 0 !== s11.context) {
      const t9 = s11;
      this.context = t9.context, this.callback = t9.callback, this.subscribe = t9.subscribe ?? false;
    } else this.context = s11, this.callback = i10, this.subscribe = h6 ?? false;
    this.host.addController(this);
  }
  hostConnected() {
    this.dispatchRequest();
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
  }
  dispatchRequest() {
    this.host.dispatchEvent(new s6(this.context, this.host, this.t, this.subscribe));
  }
};

// node_modules/@lit/context/lib/decorators/consume.js
function c6({ context: c9, subscribe: e11 }) {
  return (o12, n12) => {
    "object" == typeof n12 ? n12.addInitializer((function() {
      new s7(this, { context: c9, callback: (t8) => {
        o12.set.call(this, t8);
      }, subscribe: e11 });
    })) : o12.constructor.addInitializer(((o13) => {
      new s7(o13, { context: c9, callback: (t8) => {
        o13[n12] = t8;
      }, subscribe: e11 });
    }));
  };
}

// node_modules/@a2ui/lit/src/v0_9/context/markdown.js
var markdown = n7(/* @__PURE__ */ Symbol("A2UIMarkdown"));

// node_modules/@a2ui/lit/src/v0_9/context/context.js
var Context = {
  markdown
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/basic-catalog-a2ui-lit-element.js
var BasicCatalogA2uiLitElement = class extends A2uiLitElement {
  connectedCallback() {
    super.connectedCallback();
    injectBasicCatalogStyles();
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    const props = this.controller?.props;
    if (props && props.weight !== void 0) {
      this.style.flex = String(props.weight);
    } else {
      this.style.removeProperty("flex");
    }
    const primaryColor = this.context?.theme?.primaryColor;
    if (primaryColor) {
      this.style.setProperty("--a2ui-color-primary", primaryColor);
      this.style.setProperty("--a2ui-color-primary-light", computeColorVariant("light", { colorVar: "--a2ui-color-primary" }));
      this.style.setProperty("--a2ui-color-primary-dark", computeColorVariant("dark", { colorVar: "--a2ui-color-primary" }));
      this.style.setProperty("--a2ui-color-primary-hover", computeColorVariant("hover", {
        darkVar: "--a2ui-color-primary-dark",
        lightVar: "--a2ui-color-primary-light"
      }));
    } else {
      this.style.removeProperty("--a2ui-color-primary");
      this.style.removeProperty("--a2ui-color-primary-light");
      this.style.removeProperty("--a2ui-color-primary-dark");
      this.style.removeProperty("--a2ui-color-primary-hover");
    }
  }
};

// node_modules/lit-html/directive.js
var t6 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e8 = (t8) => (...e11) => ({ _$litDirective$: t8, values: e11 });
var i7 = class {
  constructor(t8) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t8, e11, i10) {
    this._$Ct = t8, this._$AM = e11, this._$Ci = i10;
  }
  _$AS(t8, e11) {
    return this.update(t8, e11);
  }
  update(t8, e11) {
    return this.render(...e11);
  }
};

// node_modules/lit-html/directives/unsafe-html.js
var e9 = class extends i7 {
  constructor(i10) {
    if (super(i10), this.it = A, i10.type !== t6.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r9) {
    if (r9 === A || null == r9) return this._t = void 0, this.it = r9;
    if (r9 === E2) return r9;
    if ("string" != typeof r9) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r9 === this.it) return this._t;
    this.it = r9;
    const s11 = [r9];
    return s11.raw = s11, this._t = { _$litType$: this.constructor.resultType, strings: s11, values: [] };
  }
};
e9.directiveName = "unsafeHTML", e9.resultType = 1;
var o8 = e8(e9);

// node_modules/lit-html/directive-helpers.js
var { I: t7 } = j2;
var n8 = (o12) => null === o12 || "object" != typeof o12 && "function" != typeof o12;
var r7 = (o12) => void 0 === o12.strings;

// node_modules/lit-html/async-directive.js
var s9 = (i10, t8) => {
  const e11 = i10._$AN;
  if (void 0 === e11) return false;
  for (const i11 of e11) i11._$AO?.(t8, false), s9(i11, t8);
  return true;
};
var o9 = (i10) => {
  let t8, e11;
  do {
    if (void 0 === (t8 = i10._$AM)) break;
    e11 = t8._$AN, e11.delete(i10), i10 = t8;
  } while (0 === e11?.size);
};
var r8 = (i10) => {
  for (let t8; t8 = i10._$AM; i10 = t8) {
    let e11 = t8._$AN;
    if (void 0 === e11) t8._$AN = e11 = /* @__PURE__ */ new Set();
    else if (e11.has(i10)) break;
    e11.add(i10), c7(t8);
  }
};
function h4(i10) {
  void 0 !== this._$AN ? (o9(this), this._$AM = i10, r8(this)) : this._$AM = i10;
}
function n9(i10, t8 = false, e11 = 0) {
  const r9 = this._$AH, h6 = this._$AN;
  if (void 0 !== h6 && 0 !== h6.size) if (t8) if (Array.isArray(r9)) for (let i11 = e11; i11 < r9.length; i11++) s9(r9[i11], false), o9(r9[i11]);
  else null != r9 && (s9(r9, false), o9(r9));
  else s9(this, i10);
}
var c7 = (i10) => {
  i10.type == t6.CHILD && (i10._$AP ??= n9, i10._$AQ ??= h4);
};
var f4 = class extends i7 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i10, t8, e11) {
    super._$AT(i10, t8, e11), r8(this), this.isConnected = i10._$AU;
  }
  _$AO(i10, t8 = true) {
    i10 !== this.isConnected && (this.isConnected = i10, i10 ? this.reconnected?.() : this.disconnected?.()), t8 && (s9(this, i10), o9(this));
  }
  setValue(t8) {
    if (r7(this._$Ct)) this._$Ct._$AI(t8, this);
    else {
      const i10 = [...this._$Ct._$AH];
      i10[this._$Ci] = t8, this._$Ct._$AI(i10, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};

// node_modules/lit-html/directives/private-async-helpers.js
var s10 = class {
  constructor(t8) {
    this.G = t8;
  }
  disconnect() {
    this.G = void 0;
  }
  reconnect(t8) {
    this.G = t8;
  }
  deref() {
    return this.G;
  }
};
var i8 = class {
  constructor() {
    this.Y = void 0, this.Z = void 0;
  }
  get() {
    return this.Y;
  }
  pause() {
    this.Y ??= new Promise((t8) => this.Z = t8);
  }
  resume() {
    this.Z?.(), this.Y = this.Z = void 0;
  }
};

// node_modules/lit-html/directives/until.js
var n10 = (t8) => !n8(t8) && "function" == typeof t8.then;
var h5 = 1073741823;
var c8 = class extends f4 {
  constructor() {
    super(...arguments), this._$Cwt = h5, this._$Cbt = [], this._$CK = new s10(this), this._$CX = new i8();
  }
  render(...s11) {
    return s11.find((t8) => !n10(t8)) ?? E2;
  }
  update(s11, i10) {
    const e11 = this._$Cbt;
    let r9 = e11.length;
    this._$Cbt = i10;
    const o12 = this._$CK, c9 = this._$CX;
    this.isConnected || this.disconnected();
    for (let t8 = 0; t8 < i10.length && !(t8 > this._$Cwt); t8++) {
      const s12 = i10[t8];
      if (!n10(s12)) return this._$Cwt = t8, s12;
      t8 < r9 && s12 === e11[t8] || (this._$Cwt = h5, r9 = 0, Promise.resolve(s12).then(async (t9) => {
        for (; c9.get(); ) await c9.get();
        const i11 = o12.deref();
        if (void 0 !== i11) {
          const e12 = i11._$Cbt.indexOf(s12);
          e12 > -1 && e12 < i11._$Cwt && (i11._$Cwt = e12, i11.setValue(t9));
        }
      }));
    }
    return E2;
  }
  disconnected() {
    this._$CK.disconnect(), this._$CX.pause();
  }
  reconnected() {
    this._$CK.reconnect(this), this._$CX.resume();
  }
};
var m3 = e8(c8);

// node_modules/@a2ui/lit/src/v0_9/directives/markdown.js
var MarkdownDirective = class _MarkdownDirective extends i7 {
  constructor() {
    super(...arguments);
    this.lastValue = null;
    this.lastTagClassMap = null;
  }
  update(_part, [value, markdownRenderer, markdownOptions]) {
    const jsonTagClassMap = JSON.stringify(markdownOptions?.tagClassMap);
    if (this.lastValue === value && jsonTagClassMap === this.lastTagClassMap) {
      return E2;
    }
    this.lastValue = value;
    this.lastTagClassMap = jsonTagClassMap;
    return this.render(value, markdownRenderer, markdownOptions);
  }
  static {
    this.defaultMarkdownWarningLogged = false;
  }
  /**
   * Renders the markdown string to HTML using the injected markdown renderer,
   * if present. Otherwise, it returns the value wrapped in a span.
   */
  render(value, markdownRenderer, markdownOptions) {
    if (markdownRenderer) {
      const rendered = markdownRenderer(value, markdownOptions).then((value2) => {
        return o8(value2);
      });
      return m3(rendered, b3`<span class="no-markdown-renderer">${value}</span>`);
    }
    if (!_MarkdownDirective.defaultMarkdownWarningLogged) {
      console.warn("[MarkdownDirective]", "can't render markdown because no markdown renderer is configured.\n", "Use `@a2ui/markdown-it`, or your own markdown renderer.");
      _MarkdownDirective.defaultMarkdownWarningLogged = true;
    }
    return b3`<span class="no-markdown-renderer">${value}</span>`;
  }
};
var markdown2 = e8(MarkdownDirective);

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Text.js
var __esDecorate3 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers3 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiBasicTextElement = (() => {
  let _classDecorators = [t4("a2ui-basic-text")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  let _markdownRenderer_decorators;
  let _markdownRenderer_initializers = [];
  let _markdownRenderer_extraInitializers = [];
  var A2uiBasicTextElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _markdownRenderer_decorators = [c6({ context: Context.markdown, subscribe: true })];
      __esDecorate3(this, null, _markdownRenderer_decorators, { kind: "accessor", name: "markdownRenderer", static: false, private: false, access: { has: (obj) => "markdownRenderer" in obj, get: (obj) => obj.markdownRenderer, set: (obj, value) => {
        obj.markdownRenderer = value;
      } }, metadata: _metadata }, _markdownRenderer_initializers, _markdownRenderer_extraInitializers);
      __esDecorate3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiBasicTextElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: inline-block;
      color: var(--_a2ui-text-color, var(--a2ui-text-color-text, var(--a2ui-color-on-background)));
    }
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ol,
    ul,
    li,
    blockquote,
    pre {
      margin: var(--_a2ui-text-margin, 0);
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
      font-family: var(--a2ui-font-family-title, inherit);
      line-height: var(--a2ui-line-height-headings, 1.2);
    }
    h1 {
      font-size: var(--a2ui-font-size-2xl);
    }
    h2 {
      font-size: var(--a2ui-font-size-xl);
    }
    h3 {
      font-size: var(--a2ui-font-size-l);
    }
    p,
    h4 {
      font-size: var(--a2ui-font-size-m);
    }
    h5 {
      font-size: var(--a2ui-font-size-s);
    }
    p,
    ol,
    ul,
    li,
    blockquote,
    .a2ui-caption {
      line-height: var(--a2ui-line-height-body, 1.5);
    }
    .a2ui-caption,
    .a2ui-caption > *,
    .a2ui-caption ::slotted(*) {
      font-size: var(--a2ui-font-size-xs);
      color: var(--a2ui-text-caption-color, light-dark(#666, #aaa));
    }
    a {
      color: var(--a2ui-text-a-color, inherit);
      font-weight: var(--a2ui-text-a-font-weight, inherit);
    }
  `;
    }
    #markdownRenderer_accessor_storage = __runInitializers3(this, _markdownRenderer_initializers, void 0);
    // Retrieve a MarkdownRenderer provided by the application.
    get markdownRenderer() {
      return this.#markdownRenderer_accessor_storage;
    }
    set markdownRenderer(value) {
      this.#markdownRenderer_accessor_storage = value;
    }
    createController() {
      return new A2uiController(this, TextApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      let markdownText = typeof props.text === "string" ? props.text : String(props.text ?? "");
      switch (props.variant) {
        case "h1":
          markdownText = `# ${markdownText}`;
          break;
        case "h2":
          markdownText = `## ${markdownText}`;
          break;
        case "h3":
          markdownText = `### ${markdownText}`;
          break;
        case "h4":
          markdownText = `#### ${markdownText}`;
          break;
        case "h5":
          markdownText = `##### ${markdownText}`;
          break;
        default:
          break;
      }
      const renderedMarkdown = markdown2(markdownText, this.markdownRenderer);
      if (props.variant === "caption") {
        return b3`<span class="a2ui-caption">${renderedMarkdown}</span>`;
      }
      return b3`${renderedMarkdown}`;
    }
    constructor() {
      super(...arguments);
      __runInitializers3(this, _markdownRenderer_extraInitializers);
    }
    static {
      __runInitializers3(_classThis, _classExtraInitializers);
    }
  };
  return A2uiBasicTextElement2 = _classThis;
})();
var A2uiText = {
  ...TextApi,
  tagName: "a2ui-basic-text"
};

// node_modules/lit-html/directives/class-map.js
var e10 = e8(class extends i7 {
  constructor(t8) {
    if (super(t8), t8.type !== t6.ATTRIBUTE || "class" !== t8.name || t8.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t8) {
    return " " + Object.keys(t8).filter((s11) => t8[s11]).join(" ") + " ";
  }
  update(s11, [i10]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s11.strings && (this.nt = new Set(s11.strings.join(" ").split(/\s/).filter((t8) => "" !== t8)));
      for (const t8 in i10) i10[t8] && !this.nt?.has(t8) && this.st.add(t8);
      return this.render(i10);
    }
    const r9 = s11.element.classList;
    for (const t8 of this.st) t8 in i10 || (r9.remove(t8), this.st.delete(t8));
    for (const t8 in i10) {
      const s12 = !!i10[t8];
      s12 === this.st.has(t8) || this.nt?.has(t8) || (s12 ? (r9.add(t8), this.st.add(t8)) : (r9.remove(t8), this.st.delete(t8)));
    }
    return E2;
  }
});

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Button.js
var __esDecorate4 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers4 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiBasicButtonElement = (() => {
  let _classDecorators = [t4("a2ui-basic-button")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiBasicButtonElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate4(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiBasicButtonElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: inline-block;
      margin: var(--a2ui-button-margin, var(--a2ui-spacing-m));
    }
    :where(:host) {
      --_color-primary: var(--a2ui-color-primary, #17e);
      --_button-border-radius: var(--a2ui-button-border-radius, var(--a2ui-spacing-s, 0.25rem));
      --_button-padding: var(
        --a2ui-button-padding,
        var(--a2ui-spacing-m, 0.5rem) var(--a2ui-spacing-l, 1rem)
      );
      --_button-border: var(
        --a2ui-button-border,
        var(--a2ui-border-width, 1px) solid var(--a2ui-color-border, #ccc)
      );
    }
    .a2ui-button {
      --_a2ui-text-margin: 0;
      --_a2ui-text-color: var(--a2ui-color-on-secondary, #333);
      padding: var(--_button-padding);
      background: var(--a2ui-button-background, var(--a2ui-color-surface, #fff));
      box-shadow: var(--a2ui-button-box-shadow, none);
      font-weight: var(--a2ui-button-font-weight, normal);
      color: var(--_a2ui-text-color);
      border: var(--_button-border);
      border-radius: var(--_button-border-radius);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .a2ui-button.a2ui-button-primary {
      --_a2ui-text-color: var(--a2ui-color-on-primary, #fff);
      background-color: var(--_color-primary);
      color: var(--_a2ui-text-color);
    }
    .a2ui-button:hover {
      background-color: var(--a2ui-color-secondary-hover, #ddd);
    }
    .a2ui-button.a2ui-button-primary:hover {
      background-color: var(--a2ui-color-primary-hover, #fbd);
    }
    .a2ui-button.a2ui-button-borderless {
      background: none;
      padding: 0;
      color: var(--_color-primary);
    }
  `;
    }
    createController() {
      return new A2uiController(this, ButtonApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      const isDisabled = props.isValid === false;
      const classes = {
        "a2ui-button": true,
        ["a2ui-button-" + (props.variant || "default")]: true
      };
      return b3`
      <button
        class=${e10(classes)}
        @click=${() => !isDisabled && props.action && props.action()}
        ?disabled=${isDisabled}
      >
        ${props.child ? b3`${this.renderNode(props.child)}` : A}
      </button>
    `;
    }
    static {
      __runInitializers4(_classThis, _classExtraInitializers);
    }
  };
  return A2uiBasicButtonElement2 = _classThis;
})();
var A2uiButton = {
  ...ButtonApi,
  tagName: "a2ui-basic-button"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/TextField.js
var __esDecorate5 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers5 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiBasicTextFieldElement = (() => {
  let _classDecorators = [t4("a2ui-basic-textfield")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiBasicTextFieldElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate5(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiBasicTextFieldElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--a2ui-spacing-xs, 0.25rem);
    }
    .a2ui-textfield {
      background-color: var(--a2ui-color-input, #fff);
      color: var(--a2ui-color-on-input, #333);
      border: var(--a2ui-textfield-border, var(--a2ui-border));
      border-radius: var(--a2ui-textfield-border-radius, var(--a2ui-spacing-m));
      padding: var(--a2ui-textfield-padding, var(--a2ui-spacing-m));
      font-family: inherit;
    }
    .a2ui-textfield:focus {
      outline: none;
      border-color: var(--a2ui-textfield-color-border-focus, var(--a2ui-color-primary, #17e));
    }
    .a2ui-textfield.invalid {
      border-color: var(--a2ui-textfield-color-error, red);
    }
    label {
      font-size: var(
        --a2ui-textfield-label-font-size,
        var(--a2ui-label-font-size, var(--a2ui-font-size-s))
      );
      font-weight: var(--a2ui-textfield-label-font-weight, var(--a2ui-label-font-weight, bold));
    }
    .error {
      color: var(--a2ui-textfield-color-error, red);
      font-size: var(--a2ui-font-size-xs, 0.75rem);
    }
  `;
    }
    createController() {
      return new A2uiController(this, TextFieldApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      const isInvalid = props.isValid === false;
      const onInput = (e11) => props.setValue?.(e11.target.value);
      let type = "text";
      if (props.variant === "number")
        type = "number";
      if (props.variant === "obscured")
        type = "password";
      const classes = { "a2ui-textfield": true, invalid: isInvalid };
      return b3`
      ${props.label ? b3`<label>${props.label}</label>` : A}
      ${props.variant === "longText" ? b3`<textarea
            class=${e10(classes)}
            .value=${props.value || ""}
            @input=${onInput}
          ></textarea>` : b3`<input
            type=${type}
            class=${e10(classes)}
            .value=${props.value || ""}
            @input=${onInput}
          />`}
      ${isInvalid && props.validationErrors?.length ? b3`<div class="error">${props.validationErrors[0]}</div>` : A}
    `;
    }
    static {
      __runInitializers5(_classThis, _classExtraInitializers);
    }
  };
  return A2uiBasicTextFieldElement2 = _classThis;
})();
var A2uiTextField = {
  ...TextFieldApi,
  tagName: "a2ui-basic-textfield"
};

// node_modules/lit-html/directives/map.js
function* o10(o12, f5) {
  if (void 0 !== o12) {
    let i10 = 0;
    for (const t8 of o12) yield f5(t8, i10++);
  }
}

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Row.js
var __esDecorate6 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers6 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var JUSTIFY_MAP = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  spaceBetween: "space-between",
  spaceAround: "space-around",
  spaceEvenly: "space-evenly",
  stretch: "stretch"
};
var ALIGN_MAP = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch"
};
var A2uiBasicRowElement = (() => {
  let _classDecorators = [t4("a2ui-basic-row")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiBasicRowElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate6(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiBasicRowElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: flex;
      flex-direction: row;
      gap: var(--a2ui-row-gap, var(--a2ui-spacing-m));
    }
  `;
    }
    createController() {
      return new A2uiController(this, RowApi);
    }
    updated(changedProperties) {
      super.updated(changedProperties);
      const props = this.controller.props;
      if (props) {
        this.style.justifyContent = JUSTIFY_MAP[props.justify ?? ""] ?? "flex-start";
        this.style.alignItems = ALIGN_MAP[props.align ?? ""] ?? "stretch";
      }
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      const children = Array.isArray(props.children) ? props.children : [];
      return b3` ${o10(children, (child) => b3`${this.renderNode(child)}`)} `;
    }
    static {
      __runInitializers6(_classThis, _classExtraInitializers);
    }
  };
  return A2uiBasicRowElement2 = _classThis;
})();
var A2uiRow = {
  ...RowApi,
  tagName: "a2ui-basic-row"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Column.js
var __esDecorate7 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers7 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var JUSTIFY_MAP2 = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  spaceBetween: "space-between",
  spaceAround: "space-around",
  spaceEvenly: "space-evenly",
  stretch: "stretch"
};
var ALIGN_MAP2 = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch"
};
var A2uiBasicColumnElement = (() => {
  let _classDecorators = [t4("a2ui-basic-column")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiBasicColumnElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate7(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiBasicColumnElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--a2ui-column-gap, var(--a2ui-spacing-m));
    }
  `;
    }
    createController() {
      return new A2uiController(this, ColumnApi);
    }
    updated(changedProperties) {
      super.updated(changedProperties);
      const props = this.controller.props;
      if (props) {
        this.style.justifyContent = JUSTIFY_MAP2[props.justify ?? ""] ?? "flex-start";
        this.style.alignItems = ALIGN_MAP2[props.align ?? ""] ?? "stretch";
      }
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      const children = Array.isArray(props.children) ? props.children : [];
      return b3` ${o10(children, (child) => b3`${this.renderNode(child)}`)} `;
    }
    static {
      __runInitializers7(_classThis, _classExtraInitializers);
    }
  };
  return A2uiBasicColumnElement2 = _classThis;
})();
var A2uiColumn = {
  ...ColumnApi,
  tagName: "a2ui-basic-column"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/List.js
var __esDecorate8 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers8 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiListElement = (() => {
  let _classDecorators = [t4("a2ui-list")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiListElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate8(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiListElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: flex;
      overflow: auto;
      gap: var(--a2ui-list-gap, var(--a2ui-spacing-m, 0.5rem));
      padding: var(--a2ui-list-padding, 0);
    }
  `;
    }
    createController() {
      return new A2uiController(this, ListApi);
    }
    updated(changedProperties) {
      super.updated(changedProperties);
      const props = this.controller.props;
      if (props) {
        this.style.flexDirection = props.direction === "horizontal" ? "row" : "column";
      }
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      const children = Array.isArray(props.children) ? props.children : [];
      return b3`${o10(children, (child) => b3`${this.renderNode(child)}`)}`;
    }
    static {
      __runInitializers8(_classThis, _classExtraInitializers);
    }
  };
  return A2uiListElement2 = _classThis;
})();
var A2uiList = {
  ...ListApi,
  tagName: "a2ui-list"
};

// node_modules/lit-html/directives/style-map.js
var n11 = "important";
var i9 = " !" + n11;
var o11 = e8(class extends i7 {
  constructor(t8) {
    if (super(t8), t8.type !== t6.ATTRIBUTE || "style" !== t8.name || t8.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t8) {
    return Object.keys(t8).reduce((e11, r9) => {
      const s11 = t8[r9];
      return null == s11 ? e11 : e11 + `${r9 = r9.includes("-") ? r9 : r9.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s11};`;
    }, "");
  }
  update(e11, [r9]) {
    const { style: s11 } = e11.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r9)), this.render(r9);
    for (const t8 of this.ft) null == r9[t8] && (this.ft.delete(t8), t8.includes("-") ? s11.removeProperty(t8) : s11[t8] = null);
    for (const t8 in r9) {
      const e12 = r9[t8];
      if (null != e12) {
        this.ft.add(t8);
        const r10 = "string" == typeof e12 && e12.endsWith(i9);
        t8.includes("-") || r10 ? s11.setProperty(t8, r10 ? e12.slice(0, -11) : e12, r10 ? n11 : "") : s11[t8] = e12;
      }
    }
    return E2;
  }
});

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Image.js
var __esDecorate9 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers9 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiImageElement = (() => {
  let _classDecorators = [t4("a2ui-image")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiImageElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate9(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiImageElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: var(--a2ui-image-border-radius, 0);
    }
    :host(.icon),
    img.icon {
      width: var(--a2ui-image-icon-size, 24px);
      height: var(--a2ui-image-icon-size, 24px);
    }
    img.avatar {
      width: var(--a2ui-image-avatar-size, 40px);
      height: var(--a2ui-image-avatar-size, 40px);
      border-radius: 50%;
    }
    :host(.smallFeature),
    img.smallFeature {
      max-width: var(--a2ui-image-small-feature-size, 100px);
    }
    :host(.largeFeature),
    img.largeFeature {
      max-height: var(--a2ui-image-large-feature-size, 400px);
    }
    :host(.header),
    img.header {
      height: var(--a2ui-image-header-size, 200px);
      object-fit: cover;
    }
  `;
    }
    createController() {
      return new A2uiController(this, ImageApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      const classes = {
        "a2ui-image": true,
        [props.variant || ""]: !!props.variant
      };
      const styles = {
        objectFit: props.fit || "fill"
      };
      return b3`<img
      src=${props.url}
      alt=${props.description || ""}
      class=${e10(classes)}
      style=${o11(styles)}
    />`;
    }
    static {
      __runInitializers9(_classThis, _classExtraInitializers);
    }
  };
  return A2uiImageElement2 = _classThis;
})();
var A2uiImage = {
  ...ImageApi,
  tagName: "a2ui-image"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Icon.js
var __esDecorate10 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers10 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var ICON_NAME_OVERRIDES = {
  play: "play_arrow",
  rewind: "fast_rewind",
  favoriteOff: "favorite_border",
  starOff: "star_border"
};
function toMaterialSymbol(name) {
  if (ICON_NAME_OVERRIDES[name])
    return ICON_NAME_OVERRIDES[name];
  return name.replace(/[A-Z]/g, (letter) => "_" + letter.toLowerCase());
}
var A2uiIconElement = (() => {
  let _classDecorators = [t4("a2ui-icon")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiIconElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate10(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiIconElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :where(:host) {
      --_icon-size: var(--a2ui-icon-size, var(--a2ui-font-size-xl, 24px));
    }
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .material-symbol {
      font-family: var(--a2ui-icon-font-family, 'Material Symbols Outlined', sans-serif);
      font-size: var(--_icon-size);
      font-weight: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      color: var(--a2ui-icon-color, inherit);
      font-variation-settings: var(--a2ui-icon-font-variation-settings, 'FILL' 1);
    }
    .svg {
      fill: currentColor;
      width: var(--_icon-size);
      height: var(--_icon-size);
    }
  `;
    }
    createController() {
      return new A2uiController(this, IconApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      const name = props.name;
      const isPath = typeof name === "object" && name !== null && "svgPath" in name;
      if (isPath) {
        const path = name.svgPath;
        return b3`<svg class="svg" viewBox="0 0 24 24"><path d=${path}></path></svg>`;
      }
      const iconName = typeof name === "string" ? toMaterialSymbol(name) : "";
      return b3`<span class="material-symbol">${iconName}</span>`;
    }
    static {
      __runInitializers10(_classThis, _classExtraInitializers);
    }
  };
  return A2uiIconElement2 = _classThis;
})();
var A2uiIcon = {
  ...IconApi,
  tagName: "a2ui-icon"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Video.js
var __esDecorate11 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers11 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiVideoElement = (() => {
  let _classDecorators = [t4("a2ui-video")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiVideoElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate11(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiVideoElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: block;
      width: 100%;
    }
    video {
      display: block;
      width: 100%;
      height: auto;
      border-radius: var(--a2ui-video-border-radius, 0);
    }
  `;
    }
    createController() {
      return new A2uiController(this, VideoApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      return b3`<video src=${props.url} controls class="a2ui-video"></video>`;
    }
    static {
      __runInitializers11(_classThis, _classExtraInitializers);
    }
  };
  return A2uiVideoElement2 = _classThis;
})();
var A2uiVideo = {
  ...VideoApi,
  tagName: "a2ui-video"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/AudioPlayer.js
var __esDecorate12 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers12 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiAudioPlayerElement = (() => {
  let _classDecorators = [t4("a2ui-audioplayer")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiAudioPlayerElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate12(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiAudioPlayerElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--a2ui-spacing-xs, 0.25rem);
      background: var(--a2ui-audioplayer-background, transparent);
      border-radius: var(--a2ui-audioplayer-border-radius, 0);
      padding: var(--a2ui-audioplayer-padding, 0);
    }
  `;
    }
    createController() {
      return new A2uiController(this, AudioPlayerApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      return b3`
      ${props.description ? b3`<p>${props.description}</p>` : A}
      <audio src=${props.url} controls></audio>
    `;
    }
    static {
      __runInitializers12(_classThis, _classExtraInitializers);
    }
  };
  return A2uiAudioPlayerElement2 = _classThis;
})();
var A2uiAudioPlayer = {
  ...AudioPlayerApi,
  tagName: "a2ui-audioplayer"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Card.js
var __esDecorate13 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers13 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiCardElement = (() => {
  let _classDecorators = [t4("a2ui-card")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiCardElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate13(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiCardElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: block;
      border: var(
        --a2ui-card-border,
        var(--a2ui-border-width, 1px) solid var(--a2ui-color-border, #ccc)
      );
      border-radius: var(--a2ui-card-border-radius, var(--a2ui-border-radius, 8px));
      padding: var(--a2ui-card-padding, var(--a2ui-spacing-m, 16px));
      background: var(--a2ui-card-background, var(--a2ui-color-surface, #fff));
      color: var(--a2ui-color-on-surface, #333);
      box-shadow: var(--a2ui-card-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      margin: var(--a2ui-card-margin, var(--a2ui-spacing-m));
    }
  `;
    }
    createController() {
      return new A2uiController(this, CardApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      return b3` ${props.child ? b3`${this.renderNode(props.child)}` : A} `;
    }
    static {
      __runInitializers13(_classThis, _classExtraInitializers);
    }
  };
  return A2uiCardElement2 = _classThis;
})();
var A2uiCard = {
  ...CardApi,
  tagName: "a2ui-card"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Divider.js
var __esDecorate14 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers14 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiDividerElement = (() => {
  let _classDecorators = [t4("a2ui-divider")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiDividerElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate14(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiDividerElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: block;
      align-self: stretch;
    }
    .a2ui-divider.horizontal {
      height: 0;
      overflow: hidden;
      font-size: 0.1px;
      line-height: 0;
      border: 0;
      border-top: var(
        --a2ui-divider-border,
        var(--a2ui-border-width, 1px) solid var(--a2ui-color-border, #ccc)
      );
      margin: var(--a2ui-divider-spacing, var(--a2ui-spacing-m, 0.5rem)) 0;
      width: 100%;
    }
    .a2ui-divider.vertical {
      width: var(--a2ui-border-width, 1px);
      background-color: var(--a2ui-color-border, #ccc);
      height: 100%;
      margin: 0 var(--a2ui-divider-spacing, var(--a2ui-spacing-m, 0.5rem));
    }
  `;
    }
    createController() {
      return new A2uiController(this, DividerApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      const classes = {
        "a2ui-divider": true,
        vertical: props.axis === "vertical",
        horizontal: props.axis !== "vertical"
      };
      return props.axis === "vertical" ? b3`<div class=${e10(classes)}></div>` : b3`<hr class=${e10(classes)} />`;
    }
    static {
      __runInitializers14(_classThis, _classExtraInitializers);
    }
  };
  return A2uiDividerElement2 = _classThis;
})();
var A2uiDivider = {
  ...DividerApi,
  tagName: "a2ui-divider"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/CheckBox.js
var __esDecorate15 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers15 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiCheckBoxElement = (() => {
  let _classDecorators = [t4("a2ui-checkbox")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiCheckBoxElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate15(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiCheckBoxElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: block;
    }
    .container {
      display: flex;
      flex-direction: column;
      margin: var(--a2ui-checkbox-margin, var(--a2ui-spacing-m));
    }
    label.a2ui-checkbox {
      display: inline-flex;
      align-items: center;
      gap: var(--a2ui-checkbox-gap, var(--a2ui-spacing-s, 0.5rem));
      font-size: var(
        --a2ui-checkbox-label-font-size,
        var(--a2ui-label-font-size, var(--a2ui-font-size-s))
      );
      font-weight: var(--a2ui-checkbox-label-font-weight, var(--a2ui-label-font-weight, bold));
      cursor: pointer;
    }
    label.invalid {
      color: var(--a2ui-checkbox-color-error, red);
    }
    input {
      width: var(--a2ui-checkbox-size, 1rem);
      height: var(--a2ui-checkbox-size, 1rem);
      background: var(--a2ui-checkbox-background, inherit);
      border: var(--a2ui-checkbox-border, var(--a2ui-border));
      border-radius: var(--a2ui-checkbox-border-radius, 4px);
    }
    input.invalid {
      outline: 1px solid var(--a2ui-checkbox-color-error, red);
    }
    .error {
      color: var(--a2ui-checkbox-color-error, red);
      font-size: var(--a2ui-font-size-xs, 0.75rem);
      margin-top: 4px;
    }
  `;
    }
    createController() {
      return new A2uiController(this, CheckBoxApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      const isInvalid = props.isValid === false;
      const labelClasses = { "a2ui-checkbox": true, invalid: isInvalid };
      const inputClasses = { invalid: isInvalid };
      return b3`
      <div class="container">
        <label class=${e10(labelClasses)}>
          <input
            type="checkbox"
            class=${e10(inputClasses)}
            .checked=${props.value || false}
            @change=${(e11) => props.setValue?.(e11.target.checked)}
          />
          ${props.label}
        </label>
        ${isInvalid && props.validationErrors?.length ? b3`<div class="error">${props.validationErrors[0]}</div>` : A}
      </div>
    `;
    }
    static {
      __runInitializers15(_classThis, _classExtraInitializers);
    }
  };
  return A2uiCheckBoxElement2 = _classThis;
})();
var A2uiCheckBox = {
  ...CheckBoxApi,
  tagName: "a2ui-checkbox"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Slider.js
var __esDecorate16 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers16 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiSliderElement = (() => {
  let _classDecorators = [t4("a2ui-slider")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiSliderElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate16(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiSliderElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--a2ui-spacing-xs, 0.25rem);
      margin: var(--a2ui-slider-margin, var(--a2ui-spacing-m));
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header label {
      font-size: var(
        --a2ui-slider-label-font-size,
        var(--a2ui-label-font-size, var(--a2ui-font-size-s))
      );
      font-weight: var(--a2ui-slider-label-font-weight, var(--a2ui-label-font-weight, bold));
    }
    input[type='range'] {
      width: 100%;
      accent-color: var(--a2ui-slider-thumb-color, var(--a2ui-color-primary, #007bff));
      background: var(--a2ui-slider-track-color, var(--a2ui-color-secondary, #e9ecef));
    }
  `;
    }
    createController() {
      return new A2uiController(this, SliderApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      return b3`
      <div class="header">
        ${props.label ? b3`<label>${props.label}</label>` : A}
        <span>${props.value}</span>
      </div>
      <input
        type="range"
        min=${props.min ?? 0}
        max=${props.max ?? 100}
        .value=${props.value?.toString() || "0"}
        @input=${(e11) => props.setValue?.(Number(e11.target.value))}
      />
    `;
    }
    static {
      __runInitializers16(_classThis, _classExtraInitializers);
    }
  };
  return A2uiSliderElement2 = _classThis;
})();
var A2uiSlider = {
  ...SliderApi,
  tagName: "a2ui-slider"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/DateTimeInput.js
var __esDecorate17 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers17 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
function normalizeDateTimeValue(value, type) {
  if (!value)
    return "";
  const hasT = value.includes("T");
  const split = value.split("T");
  const datePart = (hasT ? split[0] : value)?.substring(0, 10) ?? "";
  const timePart = (hasT ? split[1] : value)?.substring(0, 5) ?? "";
  switch (type) {
    case "date":
      return datePart;
    case "time":
      return timePart;
    case "datetime-local":
      return `${datePart}T${timePart}`;
  }
  return "";
}
var A2uiDateTimeInputElement = (() => {
  let _classDecorators = [t4("a2ui-datetimeinput")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  var A2uiDateTimeInputElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate17(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiDateTimeInputElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--a2ui-spacing-xs, 0.25rem);
    }
    input {
      background-color: var(--a2ui-datetimeinput-background, var(--a2ui-color-input, #fff));
      color: var(--a2ui-datetimeinput-color, var(--a2ui-color-on-input, #333));
      border: var(--a2ui-datetimeinput-border, var(--a2ui-border));
      border-radius: var(--a2ui-datetimeinput-border-radius, var(--a2ui-border-radius));
      padding: var(--a2ui-datetimeinput-padding, var(--a2ui-spacing-s));
    }
    .a2ui-date-time-input::-webkit-datetime-edit,
    .a2ui-date-time-input::-webkit-datetime-edit-fields-wrapper {
      color: var(--a2ui-datetimeinput-color, var(--a2ui-color-on-input, #333));
    }
    label {
      font-size: var(
        --a2ui-datetimeinput-label-font-size,
        var(--a2ui-label-font-size, var(--a2ui-font-size-s))
      );
      font-weight: var(--a2ui-datetimeinput-label-font-weight, var(--a2ui-label-font-weight, bold));
    }
  `;
    }
    createController() {
      return new A2uiController(this, DateTimeInputApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      if (!(props.enableDate || props.enableTime))
        return A;
      const inputType = props.enableDate && props.enableTime ? "datetime-local" : props.enableDate ? "date" : "time";
      const normalizedValue = normalizeDateTimeValue(props.value, inputType);
      return b3`
      ${props.label ? b3`<label>${props.label}</label>` : A}
      <input
        class="a2ui-date-time-input"
        type=${inputType}
        .value=${normalizedValue}
        @input=${(e11) => props.setValue?.(e11.target.value)}
      />
    `;
    }
    static {
      __runInitializers17(_classThis, _classExtraInitializers);
    }
  };
  return A2uiDateTimeInputElement2 = _classThis;
})();
var A2uiDateTimeInput = {
  ...DateTimeInputApi,
  tagName: "a2ui-datetimeinput"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/ChoicePicker.js
var __esDecorate18 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers18 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiChoicePickerElement = (() => {
  let _classDecorators = [t4("a2ui-choicepicker")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  let _filter_decorators;
  let _filter_initializers = [];
  let _filter_extraInitializers = [];
  var A2uiChoicePickerElement2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _filter_decorators = [r6()];
      __esDecorate18(this, null, _filter_decorators, { kind: "accessor", name: "filter", static: false, private: false, access: { has: (obj) => "filter" in obj, get: (obj) => obj.filter, set: (obj, value) => {
        obj.filter = value;
      } }, metadata: _metadata }, _filter_initializers, _filter_extraInitializers);
      __esDecorate18(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiChoicePickerElement2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--a2ui-choicepicker-gap, var(--a2ui-spacing-xs, 0.25rem));
      padding: var(--a2ui-choicepicker-padding, 0);
    }
    .options {
      display: flex;
      flex-direction: column;
      gap: var(--a2ui-choicepicker-gap, var(--a2ui-spacing-xs, 0.25rem));
    }
    label {
      color: var(--a2ui-choicepicker-label-color, inherit);
      font-size: var(--a2ui-choicepicker-label-font-size, inherit);
    }
    :host > label {
      font-size: var(
        --a2ui-choicepicker-label-font-size,
        var(--a2ui-label-font-size, var(--a2ui-font-size-s))
      );
      font-weight: var(--a2ui-choicepicker-label-font-weight, var(--a2ui-label-font-weight, bold));
    }
    .filter-input {
      background-color: var(--a2ui-color-input, #fff);
      color: var(--a2ui-color-on-input, #333);
      border: var(--a2ui-textfield-border, var(--a2ui-border));
      border-radius: var(--a2ui-textfield-border-radius, var(--a2ui-spacing-m));
      padding: var(
        --a2ui-choicepicker-filter-padding,
        var(--a2ui-spacing-xs, 4px) var(--a2ui-spacing-s, 8px)
      );
      font-family: inherit;
    }
    .filter-input:focus {
      outline: none;
      border-color: var(--a2ui-textfield-color-border-focus, var(--a2ui-color-primary, #17e));
    }
    .chips {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--a2ui-choicepicker-gap, var(--a2ui-spacing-xs, 0.25rem));
    }
    .chip {
      padding: var(
        --a2ui-choicepicker-chip-padding,
        var(--a2ui-spacing-s, 4px) var(--a2ui-spacing-m, 8px)
      );
      border-radius: var(--a2ui-choicepicker-chip-border-radius, 999px);
      border: 1px solid var(--a2ui-color-border, #ccc);
      background-color: var(--a2ui-color-surface, #fff);
      color: var(--a2ui-color-on-surface, inherit);
      cursor: pointer;
      font-size: var(--a2ui-font-size-xs, 0.75rem);
      font-family: inherit;
    }
    .chip.selected {
      background-color: var(--a2ui-color-primary, #007bff);
      color: var(--a2ui-color-on-primary, #fff);
      border-color: var(--a2ui-color-primary, #007bff);
    }
  `;
    }
    #filter_accessor_storage = __runInitializers18(this, _filter_initializers, "");
    get filter() {
      return this.#filter_accessor_storage;
    }
    set filter(value) {
      this.#filter_accessor_storage = value;
    }
    createController() {
      return new A2uiController(this, ChoicePickerApi);
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      const selected = Array.isArray(props.value) ? props.value : [];
      const isMulti = props.variant === "multipleSelection";
      const isChips = props.displayStyle === "chips";
      const toggle = (val) => {
        if (!props.setValue)
          return;
        if (isMulti) {
          if (selected.includes(val)) {
            props.setValue(selected.filter((v3) => v3 !== val));
          } else {
            props.setValue([...selected, val]);
          }
        } else {
          props.setValue([val]);
        }
      };
      const options = (props.options || []).filter((opt) => !props.filterable || this.filter === "" || String(opt.label).toLowerCase().includes(this.filter.toLowerCase()));
      return b3`
      ${props.label ? b3`<label>${props.label}</label>` : A}
      ${props.filterable ? b3`
            <input
              type="text"
              class="filter-input"
              placeholder="Filter options..."
              aria-label="Filter options"
              .value=${this.filter}
              @input=${(e11) => this.filter = e11.target.value}
            />
          ` : A}
      <div class=${e10({ options: true, chips: isChips })}>
        ${options.map((opt) => isChips ? b3`
                <button
                  class=${e10({
        chip: true,
        selected: selected.includes(opt.value)
      })}
                  aria-pressed=${selected.includes(opt.value)}
                  @click=${() => toggle(opt.value)}
                >
                  ${opt.label}
                </button>
              ` : b3`
                <label>
                  <input
                    type=${isMulti ? "checkbox" : "radio"}
                    .checked=${selected.includes(opt.value)}
                    @change=${() => toggle(opt.value)}
                  />
                  ${opt.label}
                </label>
              `)}
      </div>
    `;
    }
    constructor() {
      super(...arguments);
      __runInitializers18(this, _filter_extraInitializers);
    }
    static {
      __runInitializers18(_classThis, _classExtraInitializers);
    }
  };
  return A2uiChoicePickerElement2 = _classThis;
})();
var A2uiChoicePicker = {
  ...ChoicePickerApi,
  tagName: "a2ui-choicepicker"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Tabs.js
var __esDecorate19 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers19 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiLitTabs = (() => {
  let _classDecorators = [t4("a2ui-tabs")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  let _activeIndex_decorators;
  let _activeIndex_initializers = [];
  let _activeIndex_extraInitializers = [];
  var A2uiLitTabs2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _activeIndex_decorators = [r6()];
      __esDecorate19(this, null, _activeIndex_decorators, { kind: "accessor", name: "activeIndex", static: false, private: false, access: { has: (obj) => "activeIndex" in obj, get: (obj) => obj.activeIndex, set: (obj, value) => {
        obj.activeIndex = value;
      } }, metadata: _metadata }, _activeIndex_initializers, _activeIndex_extraInitializers);
      __esDecorate19(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiLitTabs2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: block;
    }
    .a2ui-tabs-headers {
      display: flex;
      gap: var(--a2ui-spacing-xs, 0.25rem);
      border-bottom: var(
        --a2ui-tabs-border,
        var(--a2ui-border-width, 1px) solid var(--a2ui-color-border, #ccc)
      );
      margin-bottom: var(--a2ui-spacing-m, 0.5rem);
    }
    .a2ui-tabs-header {
      padding: var(--a2ui-spacing-m, 0.5rem) var(--a2ui-spacing-l, 1rem);
      background: var(--a2ui-tabs-header-background, transparent);
      color: var(--a2ui-tabs-header-color, var(--a2ui-color-on-surface));
      border: none;
      border-radius: var(--a2ui-border-radius, 0.25rem) var(--a2ui-border-radius, 0.25rem) 0 0;
      cursor: pointer;
      font-family: inherit;
    }
    .a2ui-tabs-header.active {
      background: var(--a2ui-tabs-header-background-active, var(--a2ui-color-secondary, #eee));
      color: var(--a2ui-tabs-header-color-active, var(--a2ui-color-on-secondary, #333));
    }
    .a2ui-tabs-content {
      padding: var(--a2ui-tabs-content-padding, 0 var(--a2ui-spacing-m, 0.5rem));
    }
  `;
    }
    createController() {
      return new A2uiController(this, TabsApi);
    }
    #activeIndex_accessor_storage = __runInitializers19(this, _activeIndex_initializers, 0);
    get activeIndex() {
      return this.#activeIndex_accessor_storage;
    }
    set activeIndex(value) {
      this.#activeIndex_accessor_storage = value;
    }
    render() {
      const props = this.controller.props;
      if (!props || !props.tabs)
        return A;
      return b3`
      <div class="a2ui-tabs-headers">
        ${props.tabs.map((tab, i10) => b3`
            <button
              class=${e10({
        "a2ui-tabs-header": true,
        "a2ui-tab-button": true,
        active: i10 === this.activeIndex
      })}
              @click=${() => this.activeIndex = i10}
            >
              ${tab.title}
            </button>
          `)}
      </div>
      <div class="a2ui-tabs-content">
        ${props.tabs[this.activeIndex] ? b3`${this.renderNode(props.tabs[this.activeIndex].child)}` : A}
      </div>
    `;
    }
    constructor() {
      super(...arguments);
      __runInitializers19(this, _activeIndex_extraInitializers);
    }
    static {
      __runInitializers19(_classThis, _classExtraInitializers);
    }
  };
  return A2uiLitTabs2 = _classThis;
})();
var A2uiTabs = {
  ...TabsApi,
  tagName: "a2ui-tabs"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/components/Modal.js
var __esDecorate20 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f5) {
    if (f5 !== void 0 && typeof f5 !== "function") throw new TypeError("Function expected");
    return f5;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _3, done = false;
  for (var i10 = decorators.length - 1; i10 >= 0; i10--) {
    var context = {};
    for (var p4 in contextIn) context[p4] = p4 === "access" ? {} : contextIn[p4];
    for (var p4 in contextIn.access) context.access[p4] = contextIn.access[p4];
    context.addInitializer = function(f5) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f5 || null));
    };
    var result = (0, decorators[i10])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_3 = accept(result.get)) descriptor.get = _3;
      if (_3 = accept(result.set)) descriptor.set = _3;
      if (_3 = accept(result.init)) initializers.unshift(_3);
    } else if (_3 = accept(result)) {
      if (kind === "field") initializers.unshift(_3);
      else descriptor[key] = _3;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers20 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i10 = 0; i10 < initializers.length; i10++) {
    value = useValue ? initializers[i10].call(thisArg, value) : initializers[i10].call(thisArg);
  }
  return useValue ? value : void 0;
};
var A2uiLitModal = (() => {
  let _classDecorators = [t4("a2ui-modal")];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = BasicCatalogA2uiLitElement;
  let _dialog_decorators;
  let _dialog_initializers = [];
  let _dialog_extraInitializers = [];
  var A2uiLitModal2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _dialog_decorators = [e6("dialog")];
      __esDecorate20(this, null, _dialog_decorators, { kind: "accessor", name: "dialog", static: false, private: false, access: { has: (obj) => "dialog" in obj, get: (obj) => obj.dialog, set: (obj, value) => {
        obj.dialog = value;
      } }, metadata: _metadata }, _dialog_initializers, _dialog_extraInitializers);
      __esDecorate20(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      A2uiLitModal2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static {
      this.styles = i2`
    :host {
      display: inline-block;
    }
    dialog {
      border: 1px solid var(--a2ui-color-border, #ccc);
      border-radius: var(--a2ui-modal-border-radius, 8px);
      padding: var(--a2ui-modal-padding, 24px);
      min-width: 300px;
      background: var(--a2ui-color-surface, #fff);
    }
    dialog::backdrop {
      background: var(--a2ui-modal-backdrop-bg, rgba(0, 0, 0, 0.5));
    }
  `;
    }
    createController() {
      return new A2uiController(this, ModalApi);
    }
    #dialog_accessor_storage = __runInitializers20(this, _dialog_initializers, void 0);
    get dialog() {
      return this.#dialog_accessor_storage;
    }
    set dialog(value) {
      this.#dialog_accessor_storage = value;
    }
    render() {
      const props = this.controller.props;
      if (!props)
        return A;
      return b3`
      <div
        @click=${() => this.dialog?.showModal()}
        class="a2ui-modal-trigger"
        style="display: contents;"
      >
        ${props.trigger ? b3`${this.renderNode(props.trigger)}` : A}
      </div>
      <dialog class="a2ui-modal a2ui-modal-overlay">
        <form method="dialog" style="text-align: right;">
          <button class="a2ui-modal-close">×</button>
        </form>
        ${props.content ? b3`${this.renderNode(props.content)}` : A}
      </dialog>
    `;
    }
    constructor() {
      super(...arguments);
      __runInitializers20(this, _dialog_extraInitializers);
    }
    static {
      __runInitializers20(_classThis, _classExtraInitializers);
    }
  };
  return A2uiLitModal2 = _classThis;
})();
var A2uiModal = {
  ...ModalApi,
  tagName: "a2ui-modal"
};

// node_modules/@a2ui/lit/src/v0_9/catalogs/basic/index.js
var basicCatalog = new Catalog("https://a2ui.org/specification/v0_9/catalogs/basic/catalog.json", [
  A2uiText,
  A2uiButton,
  A2uiTextField,
  A2uiRow,
  A2uiColumn,
  A2uiList,
  A2uiImage,
  A2uiIcon,
  A2uiVideo,
  A2uiAudioPlayer,
  A2uiCard,
  A2uiDivider,
  A2uiCheckBox,
  A2uiSlider,
  A2uiDateTimeInput,
  A2uiChoicePicker,
  A2uiTabs,
  A2uiModal
], BASIC_FUNCTIONS);
export {
  MessageProcessor,
  basicCatalog
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
@lit/context/lib/decorators/provide.js:
lit-html/directive.js:
lit-html/directives/unsafe-html.js:
lit-html/async-directive.js:
lit-html/directives/until.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
@lit/context/lib/decorators/consume.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
@lit/context/lib/context-request-event.js:
@lit/context/lib/create-context.js:
@lit/context/lib/controllers/context-consumer.js:
@lit/context/lib/value-notifier.js:
@lit/context/lib/controllers/context-provider.js:
@lit/context/lib/context-root.js:
lit-html/directives/private-async-helpers.js:
lit-html/directives/map.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
