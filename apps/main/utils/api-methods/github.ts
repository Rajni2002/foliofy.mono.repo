import apiConfig from "@/config/api-config";
import { GithubInfo, HeatDataType } from "@/types/ui/github";
import { format } from "date-fns";

export const getGithubDataHeatmap = async (
  id: string
): Promise<HeatDataType[]> => {
  try {
    // page - 1
    const res1 = await fetch(apiConfig.endpoints.github.get_user_events(id), {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GIT_KEY}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    const data1 = await res1.json();

    // page -2
    const res2 = await fetch(
      apiConfig.endpoints.github.get_user_events(id) + "&page=2",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GIT_KEY}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const data2 = await res2.json();

    // page - 3
    const res3 = await fetch(
      apiConfig.endpoints.github.get_user_events(id) + "&page=3",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GIT_KEY}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const data3 = await res3.json();

    const pushEvents = [...data1, ...data2, ...data3].filter(
      (event) => event.type === "PushEvent" || event.type === "PullRequestEvent"
    );
    const contributionsData: HeatDataType[] = pushEvents.map((event) => ({
      date: format(new Date(event.created_at), "yyyy-MM-dd"),
      count: event.payload.commits ? event.payload.commits.length : 1,
    }));
    return contributionsData;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (id: string): Promise<GithubInfo> => {
  try {
    // page - 1
    const res = await fetch(apiConfig.endpoints.github.get_user_info(id), {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GIT_KEY}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    const data = await res.json();

    return {
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      company: data.company,
    };
  } catch (error) {
    throw error;
  }
};
