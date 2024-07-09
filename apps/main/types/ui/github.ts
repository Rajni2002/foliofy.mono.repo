export type HeatDataType = {
  date: string;
  count: number;
};

export type GithubInfo = {
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  company: string;
};

export type GitHubtype = {
  heatData: HeatDataType[] | null;
  info: GithubInfo | null;
};
