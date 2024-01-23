export type CreateFileProps = {
  filename: string;
  data: string;
};

export type GetFileContentProps = {
  filename: string;
};

export type SearchFileProps = {
  search: string;
};

export type DeleteFileProps = {
  filename: string;
};
