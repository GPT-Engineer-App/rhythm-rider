import React, { useState, useRef } from "react";
import { Container, VStack, Text, IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, HStack } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const songs = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "GPTENG:get_audio('song 1')",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "GPTENG:get_audio('song 2')",
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    src: "GPTENG:get_audio('song 3')",
  },
];

const Index = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">{songs[currentSongIndex].title}</Text>
        <Text>{songs[currentSongIndex].artist}</Text>
        <audio ref={audioRef} src={songs[currentSongIndex].src} onTimeUpdate={handleTimeUpdate} onEnded={handleNext} />
        <HStack spacing={4}>
          <IconButton aria-label="Previous" icon={<FaBackward />} size="lg" onClick={handlePrev} />
          <IconButton aria-label="Play/Pause" icon={isPlaying ? <FaPause /> : <FaPlay />} size="lg" onClick={handlePlayPause} />
          <IconButton aria-label="Next" icon={<FaForward />} size="lg" onClick={handleNext} />
        </HStack>
        <Box width="100%">
          <Slider value={progress} onChange={(val) => (audioRef.current.currentTime = (val / 100) * audioRef.current.duration)}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
