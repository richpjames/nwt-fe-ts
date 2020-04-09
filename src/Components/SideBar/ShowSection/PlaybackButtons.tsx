import React from "react";
import styled from "styled-components/macro";
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player";
import {
  PlayFill,
  PauseFill,
  StopFill,
  ForwardTen,
  BackTen,
  VolumeMute,
  Volume
} from "grommet-icons";

import { buttonsHeight, SideBarContainer } from "./SideBarDefinitions";
import { buttonColour, Button } from "../../../GlobalDefinitions";

const Container = styled(SideBarContainer)`
  padding-left: 7.5%;
  padding-right: 7.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface IProps {
  file: string;
}

declare type BackOrForth = "back" | "forth";

const urlPrefix = `https://storage.googleapis.com/files.nowhitetees.co.uk/recordings/`;

const PlaybackButtons: React.FC<IProps> = ({ file }) => {
  const [isMuted, setMuted] = React.useState(false);
  const { playing, seek, stop, togglePlayPause, mute } = useAudioPlayer({
    src: `${urlPrefix}${file}`,
    format: "mp3"
  });
  const { position } = useAudioPosition();

  const seek10Secs = (direction: BackOrForth) => {
    if (direction === "forth") {
      seek(position + 10);
    } else {
      seek(position - 10);
    }
  };

  const setMute = () => {
    if (!isMuted) {
      setMuted(true);
      mute();
    } else {
      setMuted(false);
      mute();
    }
  };

  const muteButton = (isMuted: boolean) =>
    isMuted ? (
      <VolumeMute color={buttonColour} />
    ) : (
      <Volume color={buttonColour} />
    );

  const playPauseButton = (isPlaying: boolean) =>
    isPlaying ? (
      <PauseFill color={buttonColour} />
    ) : (
      <PlayFill color={buttonColour} />
    );

  return (
    <Container height={buttonsHeight} width={100}>
      <Button
        onClick={() => {
          seek10Secs("back");
        }}
      >
        <BackTen color={buttonColour} />
      </Button>
      <div>
        <Button onClick={() => setMute()}>{muteButton(isMuted)}</Button>
        <Button onClick={togglePlayPause}>{playPauseButton(playing)}</Button>
        <Button onClick={() => stop()}>
          <StopFill color={buttonColour} />
        </Button>
      </div>
      <Button
        onClick={() => {
          seek10Secs("forth");
        }}
      >
        <ForwardTen color={buttonColour} />
      </Button>
    </Container>
  );
};

export default PlaybackButtons;
