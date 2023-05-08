const excludedFields = (object: any, keys: string[]) => {
  for (const key of keys) {
    delete object[key];
  };
  return object;
};

export default excludedFields;