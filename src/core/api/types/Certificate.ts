export type CertificateTemplateResponse = {
  base64Image: string;
  content: string;
  id: string;
  isCustom: false;
  name: string;
  orientation: string;
};

export type CertificateDto = {
  completeText: string;
  confirmText: string;
  name: string;
  templateId: number;
  type: string;
  base64Logo1: string;
};

export type CertificateResponse = CertificateDto & {
  id: string;
  base64Logo2: string | null;
  curNumber: number | null;
  maxNumber: number | null;
  minNumber: number | null;
  series: string | null;
};
