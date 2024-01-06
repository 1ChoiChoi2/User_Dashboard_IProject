import React, { useState, useEffect } from "react";
import { MdOutlineZoomOutMap } from "react-icons/md";

interface Props {
  containerSelector: string;
}

const TableFullScreen: React.FC<Props> = ({ containerSelector }) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const tableContainer = document.querySelector(containerSelector);

  function toggleFullScreen() {
    if (tableContainer) {
      try {
        if (isFullScreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        } else {
          if (tableContainer.requestFullscreen) {
            tableContainer.requestFullscreen();
          }
        }
        setIsFullScreen((prev) => !prev);
      } catch (err) {
        console.error("Error toggling fullscreen:", err);
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullScreen) {
        document.exitFullscreen();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isFullScreen]);

  return <MdOutlineZoomOutMap cursor={"pointer"} onClick={toggleFullScreen} />;
};

export default TableFullScreen;
