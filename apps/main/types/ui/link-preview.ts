export type LinkPreviewProps = {
  iconURL: string;
  title: string;
  description: string;
  coverURL: string;
  url: string;
  pinned?: [];
};

export type URLstringType = `https://${string}`;

export type PrimarySocialMediaLinks = {
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  pinterest?: string;
  spotify?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
};

export type SocialMediaArray = (keyof PrimarySocialMediaLinks)[];

export type CachedLinkPreviewType = {
  [key: string]: LinkPreviewProps;
};
