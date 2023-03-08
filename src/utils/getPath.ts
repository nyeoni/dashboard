const getPath = (url: string, param: Record<string, any> = {}): string => {
  let path = url;
  for (let key in param) {
    path = path.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
  }

  return path;
};

export default getPath;
