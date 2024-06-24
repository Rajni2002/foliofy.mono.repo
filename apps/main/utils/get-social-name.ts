import { PrimarySocialMediaLinks } from "@/types/ui/link-preview";

const socialIconPath = (target: string) => `/icons/socials/${target}`;

type PlatformType = {
  title: string;
  iconURL: string;
  url: string;
  platform: keyof PrimarySocialMediaLinks;
};

export default function getPlatformName(
  url: string
): PlatformType | "invalid URL" {
  const cleanedUrl = url.replace(/\/+$/, "");

  const platformMapping: {
    [key: string]: PlatformType;
  } = {
    "twitter.com": {
      title: "Twitter",
      iconURL: socialIconPath("twitter.svg"),
      url,
      platform: "twitter",
    },
    "x.com": {
      title: "Twitter",
      iconURL: socialIconPath("twitter.svg"),
      url,
      platform: "twitter",
    },
    "linkedin.com": {
      title: "Linkedin",
      iconURL: socialIconPath("linkedin.svg"),
      url,
      platform: "linkedin",
    },
    "facebook.com": {
      title: "Facebook",
      iconURL: socialIconPath("facebook.svg"),
      url,
      platform: "facebook",
    },
    "pinterest.com": {
      title: "Pinterest",
      iconURL: socialIconPath("pinterest.svg"),
      url,
      platform: "pinterest",
    },
    "spotify.com": {
      title: "Spotify",
      iconURL: socialIconPath("spotify.svg"),
      url,
      platform: "spotify",
    },
    "instagram.com": {
      title: "Instagram",
      iconURL: socialIconPath("instagram.svg"),
      url,
      platform: "instagram"
    },
    "youtube.com": {
      title: "Youtube",
      iconURL: socialIconPath("youtube.svg"),
      url,
      platform: "youtube"
    },
    "github.com": {
      title: "Github",
      iconURL: socialIconPath("github.svg"),
      url,
      platform: "github"
    },
  };

  try {
    const parsedURL = new URL(cleanedUrl);
    const domain = parsedURL.hostname.replace(/^www\./, "");
    const platform = platformMapping[domain] || "unknown";

    let userID: string | null = null;
    const pathSegments = parsedURL.pathname
      .split("/")
      .filter((segment) => segment);

    if (pathSegments.length > 0) {
      userID = pathSegments[pathSegments.length - 1];
    }

    return (
      { ...platform, title: userID ? userID : platform.title } || "unknown"
    );
  } catch (e) {
    return "invalid URL";
  }
}
