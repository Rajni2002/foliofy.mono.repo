import { TopTrackType } from '@/types/ui/spotify-preview';
import { H3, Large, Muted } from '@foliofy/ui/typography';
import Image from 'next/image';
import React from 'react';

const TrackCard = ({ data, selectTrack }: { data: TopTrackType, selectTrack: (id: string) => void }) =>
    <div onClick={() => {
        selectTrack(data.id)
    }} className='flex items-center gap-3 my-1 transition-colors hover:bg-[#9cffc2] p-2 hover:dark:bg-green-300/10 rounded-xl cursor-pointer'>
        <Image width={data.images[2].width} height={data.images[2].height} src={data.images[2].url} alt='track cover'
            className='rounded-xl aspect-square' unoptimized />
        <div>
            <Large>{data.name}</Large>
            <Muted>
                {data.artists.reduce((prev, curr, index) => prev + (index === 0 ? "" : ",") + ` ${curr.name}`, "")}
            </Muted>
        </div>
    </div>

const TopTracks = ({ data, active, selectTrack }: { data: TopTrackType[], active: number, selectTrack: (id: string) => void }) => (
    <div className='w-full mt-3'>
        <H3>Top Tracks</H3>
        {data.filter((_, index) => active !== index).map(item => <TrackCard selectTrack={selectTrack} key={item.id} data={item} />)}
    </div>
);

export default TopTracks;
[
    {
      "id": "22249084947",
      "type": "WatchEvent",
      "actor": {
        "id": 583231,
        "login": "octocat",
        "display_login": "octocat",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4"
      },
      "repo": {
        "id": 1296269,
        "name": "octocat/Hello-World",
        "url": "https://api.github.com/repos/octocat/Hello-World"
      },
      "payload": {
        "action": "started"
      },
      "public": true,
      "created_at": "2022-06-09T12:47:28Z"
    },
    {
      "id": "22249084964",
      "type": "PushEvent",
      "actor": {
        "id": 583231,
        "login": "octocat",
        "display_login": "octocat",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4"
      },
      "repo": {
        "id": 1296269,
        "name": "octocat/Hello-World",
        "url": "https://api.github.com/repos/octocat/Hello-World"
      },
      "payload": {
        "push_id": 10115855396,
        "size": 1,
        "distinct_size": 1,
        "ref": "refs/heads/master",
        "head": "7a8f3ac80e2ad2f6842cb86f576d4bfe2c03e300",
        "before": "883efe034920928c47fe18598c01249d1a9fdabd",
        "commits": [
          {
            "sha": "7a8f3ac80e2ad2f6842cb86f576d4bfe2c03e300",
            "author": {
              "email": "octocat@github.com",
              "name": "Monalisa Octocat"
            },
            "message": "commit",
            "distinct": true,
            "url": "https://api.github.com/repos/octocat/Hello-World/commits/7a8f3ac80e2ad2f6842cb86f576d4bfe2c03e300"
          }
        ]
      },
      "public": true,
      "created_at": "2022-06-08T23:29:25Z"
    }
  ]