export const getIdFromUrl = (url) => {
  if (url) {
    const url_splited = url.split("/");
    return url_splited[url_splited.length - 2];
  }
};

export const getCatFromUrl = (url) => {
  if (url) {
    const url_splited = url.split("/");
    return url_splited[url_splited.length - 3];
  }
};

export const remplazar_img = (ref, img) => {
  ref.current.src = img;
};
