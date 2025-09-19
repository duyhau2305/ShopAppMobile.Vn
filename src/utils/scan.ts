type Parsed = {type: 'json' | 'url' | 'emvco' | 'text'; data: any; raw: string};

export const parseEMVCoTLV = (payload: string) => {
  try {
    let i = 0;
    const out: Record<string, any> = {};

    const readPair = () => {
      if (i + 4 > payload.length) {
        return null;
      }
      const tag = payload.slice(i, i + 2);
      i += 2;
      const lenStr = payload.slice(i, i + 2);
      i += 2;
      const len = Number(lenStr);
      const val = payload.slice(i, i + len);
      i += len;
      return {tag, val};
    };

    const parseGroup = (val: string) => {
      let j = 0;
      const group: Record<string, any> = {};
      while (j + 4 <= val.length) {
        const t = val.slice(j, j + 2);
        j += 2;
        const lStr = val.slice(j, j + 2);
        j += 2;
        const l = Number(lStr);
        const v = val.slice(j, j + l);
        j += l;
        group[t] = v;
      }
      return group;
    };

    while (i < payload.length) {
      const pair = readPair();
      if (!pair) {
        break;
      }
      const tagNum = Number(pair.tag);
      if (!Number.isNaN(tagNum) && tagNum >= 26 && tagNum <= 51) {
        out[pair.tag] = parseGroup(pair.val);
      } else {
        out[pair.tag] = pair.val;
      }
    }
    return out;
  } catch {
    return null;
  }
};

export const parseQRCodeContent = (input: string): Parsed => {
  const str = (input || '').trim();

  // JSON
  if (str.startsWith('{') || str.startsWith('[')) {
    const json = JSON.parse(str);
    return {type: 'json', data: json, raw: str};
  }

  // URL
  try {
    const url = new URL(str);
    const params: Record<string, string> = {};
    url.searchParams.forEach((v, k) => (params[k] = v));
    return {
      type: 'url',
      data: {host: url.host, path: url.pathname, params},
      raw: str,
    };
  } catch {}

  // EMVCo/VietQR (TLV)
  const emv = parseEMVCoTLV(str);
  if (emv) {
    return {type: 'emvco', data: emv, raw: str};
  }

  return {type: 'text', data: str, raw: str};
};
