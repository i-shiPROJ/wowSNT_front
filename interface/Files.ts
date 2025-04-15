export interface Files {
  id: number,
  originalName: string,
  uploadedFile: {
    fileSize: number,
    hashName: string,
    id: number
  },
  fileName: { name: string | null; extension: string | null }
}

export const parseFileName = (fileName: string) => {
  const parts = fileName.split('.');
  const name = parts.slice(0, -1).join('.');
  const extension = parts.pop();
  return { name, extension };
};

