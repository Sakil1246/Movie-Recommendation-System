
export const bgUrl="https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web_tall_panel/IN-en-20250303-TRIFECTA-perspective_8d2f60cf-007f-4f25-99b0-7c0b77f38bc1_large.jpg"
export const profileImg="https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg"
export const SEARCH_ICON="https://cdn-icons-png.flaticon.com/512/10629/10629681.png"
export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_TOKEN,
    }
  };

export const IMG_URL="https://image.tmdb.org/t/p/w200/"
export const W_LOGO="https://cdn-icons-png.flaticon.com/128/16566/16566143.png"

export const optionsPost = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: import.meta.env.VITE_TOKEN,
  }
};
