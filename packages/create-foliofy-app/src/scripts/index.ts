import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { input, number } from "@inquirer/prompts";

type SiteConfig = {
  name: string;
  description: string;
  connect?: {
    primary?: {
      url: string;
      pinned?: string[];
    }[];
    secondary?: string[];
    spotify?: {
      profileURL: string;
      topTracks?: string[];
      topArtists?: string[];
    };
    github?: string;
  };
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDir = path.resolve(__dirname, "/templates");

export const createProject = async (projectName: string) => {
  const projectDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    console.error(chalk.red(`Directory ${projectName} already exists.`));
    process.exit(1);
  }

  let siteConfig: SiteConfig = {
    name: "",
    description: "",
    connect: {
      primary: []
    }
  };

  siteConfig.name = await input({
    message: "Hi👋, What's your name ?",
    required: true,
  });
  siteConfig.description = await input({
    message: "📝 Give me some description...",
    default:
      "Build & deploy your modern portfolio in 60 seconds. Accessible. Customizable. Open Source.",
  });

  // get twitter-info
  const twitter = await input({
    message: "🐦 Put your twitter username ...",
    validate: (input) => {
      if (input.trim() === "") {
        return true; // Allow empty input
      }
      const twitterUrl = `https://twitter.com/${input}`;
      const xUrl = `https://x.com/${input}`;
      const urlPattern =
        /^(https:\/\/twitter\.com\/[A-Za-z0-9_]{1,15}|https:\/\/x\.com\/[A-Za-z0-9_]{1,15})$/;

      if (urlPattern.test(twitterUrl) || urlPattern.test(xUrl)) {
        return true;
      } else {
        return "Please enter a valid Twitter handle.";
      }
    },
  });

  // if user put their handle then prompt for more ...
  if (twitter.length) {
    const twitterObj: {
      url: string;
      pinned?: string[];
    } = {
      url: "",
      pinned: [],
    };
    let pinTweetsCount = await number({
      message: "How many top tweets do you want to pin (0-4)?",
      validate: (input) => {
        input = input ?? 0;
        if (input >= 0 && input <= 4) {
          return true;
        }
        return "Please enter a number between 0 and 4.";
      },
    });

    pinTweetsCount = pinTweetsCount ?? 0;

    if (pinTweetsCount > 0) {
      for (let i = 0; i < pinTweetsCount; i++) {
        const tweetUrl = await input({
          message: `Enter the URL for tweet ${i + 1}:`,
          validate: (input) => {
            const urlPattern =
              /^https:\/\/twitter\.com\/[A-Za-z0-9_]{1,15}\/status\/[0-9]+$/;
            if (urlPattern.test(input.trim())) {
              return true;
            } else {
              return "Please enter a valid tweet URL.";
            }
          },
        });
        twitterObj.pinned?.push(tweetUrl);
      }
    }

    twitterObj.url = `https://twitter.com/${twitter}`;
    siteConfig.connect?.primary?.push(twitterObj);
  }

  console.info(siteConfig.connect?.primary);

  /**
   * 
  fs.mkdirSync(projectDir);
  copyTemplateFiles(template, projectDir);
  
  console.log(chalk.green('Installing dependencies...'));
  execSync('yarn install', { stdio: 'inherit', cwd: projectDir });
  
  console.log(chalk.green('Project created successfully!'));
  console.log(`Navigate to ${projectName} and start coding!`);
  */
};

const copyTemplateFiles = (template: string, projectDir: string) => {
  const templateDir = path.join(templatesDir, template);
  fs.readdirSync(templateDir).forEach((file) => {
    const src = path.join(templateDir, file);
    const dest = path.join(projectDir, file);
    fs.copyFileSync(src, dest);
  });
};
