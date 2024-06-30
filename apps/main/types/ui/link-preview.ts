import {
  FacebookEmbedProps,
  InstagramEmbedProps,
  LinkedInEmbedProps,
  PinterestEmbedProps,
  XEmbedProps,
  YouTubeEmbedProps,
} from "react-social-media-embed";

export type LinkPreviewProps = {
  iconURL?: string;
  title?: string;
  description?: string;
  coverURL?: string;
  url?: string;
  pinned?: string[];
  platform?: keyof PrimarySocialMediaLinks;
};

export type URLstringType = `https://${string}`;

export type PrimarySocialMediaLinks = {
  twitter: string;
  linkedin: string;
  facebook: string;
  pinterest: string;
  instagram: string;
  youtube: string;
};

interface otherEmbedProps {

}

export type SocialMediaArray = (keyof PrimarySocialMediaLinks)[];

export type PlatformSocialEmbeds = {
  [key in keyof PrimarySocialMediaLinks]: React.FC<
    | XEmbedProps
    | LinkedInEmbedProps
    | FacebookEmbedProps
    | PinterestEmbedProps
    | InstagramEmbedProps
    | YouTubeEmbedProps
  >;
};

export type CachedLinkPreviewType = {
  [key: string]: LinkPreviewProps;
};
