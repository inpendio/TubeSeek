import { parseLoginToken } from './parsers';
import { getBitchuteLoginData } from './localStorage';

async function bitchuteLoginHtml() {
  const res = await fetch('https://www.bitchute.com/accounts/login/', {
    credentials: 'include',
  });
  const txt = await res.text();
  const token = parseLoginToken(txt);
  return token;
}

async function bitchuteLoginWithToken(csrfmiddlewaretoken) {
  const { key, password } = await getBitchuteLoginData();
  const formData = new FormData();
  formData.append('username', key);
  formData.append('password', password);
  formData.append('csrfmiddlewaretoken', csrfmiddlewaretoken);

  const res = await fetch('https://www.bitchute.com/accounts/login/', {
    credentials: 'include',
    method: 'post',
    body: formData,
    headers: {
      referer: 'https://www.bitchute.com/accounts/login/',
    },
  });

  const txt = await res.json();
  console.log(txt);
  return txt;
}

export async function bitchuteLogin() {
  const token = await bitchuteLoginHtml();
  return { token, response: bitchuteLoginWithToken(token) };
}

export async function bitchuteHomePage() {
  const res = await fetch('https://www.bitchute.com', {
    credentials: 'include',
  });
  const txt = await res.text();
  return txt;
}
