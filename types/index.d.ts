type FileType = "document" | "image" | "video" | "audio" | "other";

interface ActionType {
  label: string;
  icon: string;
  value: string;
}

interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}
interface GetFilesProps {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}
interface RenameFileProps {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}
interface UpdateFileUsersProps {
  fileId: string;
  emails: string[];
  path: string;
}
interface DeleteFileProps {
  fileId: string;
  bucketFileId: string;
  path: string;
}

interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}

interface MobileNavigationProps {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}
interface SidebarProps {
  fullName: string;
  avatar: string;
  email: string;
}

interface ThumbnailProps {
  type: string;
  extension: string;
  url: string;
  className?: string;
  imageClassName?: string;
}

interface ShareInputProps {
  file: Models.Document;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (email: string) => void;
}

type CategoryUsage = {
  size: number;
  latestDate: number;
};

type TotalSpace = {
  document: CategoryUsage;
  image: CategoryUsage;
  video: CategoryUsage;
  audio: CategoryUsage;
  other: CategoryUsage;
};
