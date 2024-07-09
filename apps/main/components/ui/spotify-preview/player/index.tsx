import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// icons & components
import { Play, Pause } from "@foliofy/ui/icons";
import { Slider } from "@foliofy/ui/slider";
import { Toggle } from "@foliofy/ui/toggle";
import { H3, P, Small } from "@foliofy/ui/typography";

//utils
import { mergeCN as cn } from "@foliofy/utils";
import { getLyricsClientSide } from "@/utils/api-methods/spotify";

// types
import { LyricsType, TopTrackType } from "@/types/ui/spotify-preview";
import { Label } from "@foliofy/ui/label";
import IframePlayer from "./iframe";

export default function SpotifyLyricsSlider({ data }: { data: TopTrackType }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lyrics, setLyrics] = useState<LyricsType[] | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [duration, setDuration] = useState(0);
  const [fullMode, setFullMode] = useState<boolean>(!data.preview_url);

  const fetchLyrics = async (trackId: string) => {
    setLoad(true);
    try {
      const res = await getLyricsClientSide(trackId);
      let localLyrics = JSON.parse(localStorage.getItem("lyrics") ?? "{}");
      localLyrics[trackId] = res
      localStorage.setItem("lyrics", JSON.stringify(localLyrics));
      setLyrics(res.lyrics.lines);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    let localLyrics = JSON.parse(localStorage.getItem("lyrics") ?? "{}");
    if (data.id in localLyrics) {
      const res = localLyrics[data.id];
      setLyrics(res.lyrics.lines);
    } else {
      fetchLyrics(data.id)
    }
  }, [])

  // creating a time tracking manager to change and manage time stamps for lyrics render
  const [currentTime, setCurrentTime] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);
  // toggle manager to check if the song is ON
  const [isPlaying, setIsPlaying] = useState(false);
  // value manager for handle the bias according to string length -- lyrics line
  const [lyricDelay, setLyricDelay] = useState(10);

  // methods to constantly change the lyrics when song is getting played -- only if the player is ON
  useEffect(() => {
    if (isPlaying) {
      // setting a reseter check, when song ends, the player will be reset
      if (timeStamp === lyrics?.length) {
        setTimeStamp(0);
        setIsPlaying(false);
        return;
      }
      setTimeout(() => {
        manageCurrentTime();
      }, 100 * lyricDelay);
    }
  }, [timeStamp, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.load();
      setIsPlaying(false);
      setFullMode(!data.preview_url);
    }
  }, [data])

  const manageCurrentTime = () => {
    setTimeStamp(currentTime + 1);
    // fetching the current line from the lyrics which is getting pointed
    // and getting it's length for adding custom delay, on every line Toggle
    const CURRENT_POINTED_LYRICS_STRING = lyrics?.[timeStamp]?.words ?? "";
    const CURRENT_POINTED_LYRICS_STRING_LENGTH =
      CURRENT_POINTED_LYRICS_STRING.length;
    setLyricDelay(CURRENT_POINTED_LYRICS_STRING_LENGTH);

    // scrolling if the slider time is more than 2
    if (timeStamp >= 1 || timeStamp % 2 === 0) {
      document?.querySelector("#lyrics-container")?.scroll({
        top: 100 * timeStamp,
        left: 100,
        behavior: "smooth",
      });
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      const newTime: number = (+value / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const renderLyrics = ({ lyrics, songLength }: { lyrics?: string[], songLength?: number }) => {
    let lines: string[] = [];
    if (!songLength || !lyrics) return lines;
    for (let count = 0; count < songLength; count++) {
      lines.push(lyrics[count]);
    }
    return lines;
  };

  return (
    <div className="sm:w-6/12 mt-4">
      {data.preview_url && data.preview_url.length !== 0 &&
        <div className="flex items-center space-x-2">
          <Toggle checked={fullMode} onCheckedChange={(value: boolean) => {
            if (audioRef.current) {
              audioRef.current.pause();
              setIsPlaying(false);
            }
            setFullMode(value);
          }} id="player-mode" />
          <Label htmlFor="player-mode" className="bg-gray-600 py-1 px-2 rounded-full text-white font-semibold text-xs">{fullMode ? "EMBED" : "BLEND"}</Label>
        </div>}
      <audio ref={audioRef} id={data.id}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}>
        <source src={data.preview_url ?? ""} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className="spotify-lyrics-slider-component">
        {lyrics && lyrics.length !== 0 && <AnimatePresence>
          <motion.div
            className="song-lyrics-wrapper my-12 w-full h-[240px] bg-gray-200 rounded-xl shadow-inner p-2 overflow-y-scroll"
            id="lyrics-container"
          >
            {renderLyrics({
              lyrics: lyrics?.map(item => item.words),
              songLength: lyrics?.length,
            })?.map((songLine, songLineIndex) => {
              return (
                <motion.button
                  className={cn(
                    "song-lyric-line font-semibold text-3xl text-left p-3 bg-transparent hover:bg-gray-300 mb-1 rounded-lg",
                    songLineIndex === timeStamp
                      ? "text-gray-800"
                      : "text-gray-400"
                  )}
                  key={songLineIndex}
                  onClick={() => setTimeStamp(songLineIndex)}
                >
                  {songLine}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>}
        {!fullMode ? <>
          {lyrics && lyrics.length !== 0 && <AnimatePresence>
            <motion.div className="slider-wrapper">
              <Slider max={100} min={0} step={1} value={[(currentTime / duration) * 100]} onValueChange={handleProgressChange} />
            </motion.div>
          </AnimatePresence>}
          <div className="music-details-wrapper mt-4 flex flex-row items-center justify-between px-2">
            <div className="flex flex-row items-center gap-3">
              <img
                src={data.images[1].url}
                className="w-[60px] h-[60px] rounded-lg shadow-md"
              />
              <div className="music-text-details-wrapper">
                <H3 className="font-medium text-xl"
                  aria-label={data.name}
                >
                  {data.name}
                </H3>
                <Small>
                  {data.artists.reduce((prev, curr, index) => prev + (index === 0 ? "" : ",") + ` ${curr.name}`, "")}
                </Small>
              </div>
            </div>
            <div className="song-player-actions-wrapper my-4 flex flex-row items-center justify-center">
              <button
                className={cn(
                  "text-3xl w-fit p-4 bg-white shadow-md rounded-2xl cursor-pointer select-none transition-all text-gray-800 hover:scale-125 z-10"
                )}
                onClick={togglePlayPause}
              >
                {!isPlaying ? <Play /> : <Pause />}
              </button>
            </div>
          </div>
          {!(lyrics && lyrics.length !== 0) && <AnimatePresence>
            <motion.div className="slider-wrapper">
              <Slider max={100} min={0} value={[(currentTime / duration) * 100]} onValueChange={handleProgressChange} />
            </motion.div>
          </AnimatePresence>}
          <P className={cn("admin-playing-status font-medium",
            isPlaying ? "text-green-600 dark:text-green-200 animate-pulse" : "dark:text-gray-300 text-gray-600")} >
            {`${isPlaying ? "you are vibing..." : "music paused"}`}
          </P>
        </> :
          <IframePlayer id={data.id} />}
      </div>
    </div>
  );
}

// I've beenn o my own for long enough
// words: 8
// on: 2
// enough: 6
// 2+6/2 = 4
// 8*4 time delay
