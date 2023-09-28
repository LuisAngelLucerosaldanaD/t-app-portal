import {Signatures} from "@app/core/utils/constant/constant";

export const onlyNumbers = (value: any): boolean => {
  const key = value.charCode;
  return key >= 48 && key <= 57;
};

export const GetExtensionOfBase64 = (base64: string): string => {
  const signatures = {
    pdf: "PDF",
    gif: "GIF",
    gif2: "GIF",
    png: "PNG",
    jpg: "JPG"
  };
  if (base64.indexOf('JVBERi0') !== -1) return signatures.pdf;
  if (base64.indexOf('R0lGODdh') !== -1) return signatures.gif;
  if (base64.indexOf('R0lGODlh') !== -1) return signatures.gif2;
  if (base64.indexOf('iVBORw0KGgo') !== -1) return signatures.png;
  if (base64.indexOf('/9j/') !== -1) return signatures.jpg;
  return 'JPG';
}

export const GetMimeTypeOfBase64 = (base64: string): string => {
  const signatures = {
    pdf: "application/pdf",
    gif: "image/gif",
    gif2: "image/gif",
    png: "image/png",
    jpg: "image/jpg"
  };
  if (base64.indexOf('JVBERi0') !== -1) return signatures.pdf;
  if (base64.indexOf('R0lGODdh') !== -1) return signatures.gif;
  if (base64.indexOf('R0lGODlh') !== -1) return signatures.gif2;
  if (base64.indexOf('iVBORw0KGgo') !== -1) return signatures.png;
  if (base64.indexOf('/9j/') !== -1) return signatures.jpg;
  return 'image/jpg';
}

export const GetFullSrcImg = (base64: string): string => {
  const type = getType(base64);
  return `data:${type?.contentType};base64,${base64}`;
}

const getType = (b64: string): { contentType: string; extension: string } => {
  for (const s in Signatures) {
    if (b64.indexOf(s) === 0) return Signatures[s];
  }
  return {
    contentType: '',
    extension: ''
  }
}
