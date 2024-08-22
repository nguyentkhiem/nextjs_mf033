import { Modal, Slider } from "antd";
import { debounce } from "lodash";
import OpenSeadragon from "openseadragon";
import React, { useCallback, useEffect, useState } from "react";
interface Props {
  id: string;
  slideUrl: string;
  isShowViewer: boolean;
  setShowViewer: any;
}

const PreviewModal: React.FC<Props> = ({
  id,
  slideUrl,
  isShowViewer,
  setShowViewer,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [viewer, setViewer] = useState<OpenSeadragon.Viewer>();
  const [defaultZoomLevel, setDefaultZoomLevel] = useState(1);
  const [defaultZoomPoint, setDefaultZoomPoint] = useState({
    x: 0,
    y: 0,
  });
  let viewer_: OpenSeadragon.Viewer | null = null;

  const changeHandler = (x: number, y: number) => {
    setDefaultZoomPoint({ x, y });
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 100), []);
  useEffect(() => {
    if (isShowViewer) {
      viewer_ = OpenSeadragon({
        id,
        showFullPageControl: false,
        showHomeControl: false,
        showZoomControl: false,
        showNavigator: true,
        navigatorPosition: "TOP_RIGHT",
        showNavigationControl: true,
        navigationControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
        prefixUrl: "",
        sequenceMode: false,
        zoomInButton: "",
        zoomOutButton: "",
        fullPageButton: "",
        maxZoomLevel: 20,
        minZoomLevel: 1,
        minZoomImageRatio: 10e20,
        maxZoomPixelRatio: 1,
        gestureSettingsMouse: {
          scrollToZoom: false,
          clickToZoom: false,
          dblClickToZoom: false,
        },
        navImages: {
          zoomIn: {
            REST: "/images/zoomin_rest.png",
            DOWN: "/images/zoomin_rest.png",
            GROUP: "/images/zoomin_rest.png",
            HOVER: "/images/zoomin_rest.png",
          },
          zoomOut: {
            REST: "/images/zoomout_rest.png",
            DOWN: "/images/zoomout_rest.png",
            GROUP: "/images/zoomout_rest.png",
            HOVER: "/images/zoomout_rest.png",
          },
          fullpage: {
            REST: "/images/fullpage_rest.png",
            DOWN: "/images/fullpage_rest.png",
            GROUP: "/images/fullpage_rest.png",
            HOVER: "/images/fullpage_rest.png",
          },
          home: {
            REST: "",
            DOWN: "",
            GROUP: "",
            HOVER: "",
          },
          previous: {
            REST: "",
            DOWN: "",
            GROUP: "",
            HOVER: "",
          },
          next: {
            REST: "",
            DOWN: "",
            GROUP: "",
            HOVER: "",
          },
          rotateleft: {
            REST: "",
            DOWN: "",
            GROUP: "",
            HOVER: "",
          },
          rotateright: {
            REST: "",
            DOWN: "",
            GROUP: "",
            HOVER: "",
          },
          flip: {
            REST: "",
            DOWN: "",
            GROUP: "",
            HOVER: "",
          },
        },
        tileSources: slideUrl.includes(".dzi")
          ? slideUrl
          : {
              type: "image",
              url: slideUrl,
            },
      });
      setViewer(viewer_);
      viewer_.addHandler(
        "pan",
        (e: any) => {
          debouncedChangeHandler(e.center.x, e.center.y);
        },
        { eventType: "navigator pan" }
      );
      viewer_.addHandler("resize", (e: any) => {});
    }

    return () => {
      viewer_?.destroy();
    };
  }, [isShowViewer, id, slideUrl, viewer_]);

  useEffect(() => {
    return () => {
      setShowViewer(false);
      setDefaultZoomLevel(1);
    };
  }, []);

  return (
    <div>
      {isShowViewer ? (
        <Modal
          onCancel={() => {
            setShowViewer(false);
          }}
          // destroyOnClose
          width={"1200px"}
          footer={null}
          open={true}
        >
          <div className="w-full flex justify-center items-center px-[12px]">
            <div id={id} style={{ width: 1200, height: 800 }}></div>
          </div>
          <div>
            <div className="absolute flex flex-col left-[24px] bottom-[40px] space-y-[12px] ">
              <div
                onClick={() => {
                  setDefaultZoomLevel(15);
                  if (viewer?.viewport) {
                    viewer?.viewport.zoomTo(15);
                  }
                }}
                className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-20"
              >
                15x
              </div>
              <div
                onClick={() => {
                  setDefaultZoomLevel(3);
                  if (viewer?.viewport) {
                    viewer?.viewport.zoomTo(3);
                  }
                }}
                className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-20"
              >
                3x
              </div>
              <div
                onClick={() => {
                  setDefaultZoomLevel(2);
                  if (viewer?.viewport) {
                    viewer?.viewport.zoomTo(2);
                  }
                }}
                className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-20"
              >
                2x
              </div>
              <div
                onClick={() => {
                  setDefaultZoomLevel(1);
                  if (viewer?.viewport) {
                    viewer?.viewport.zoomTo(1);
                  }
                }}
                className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-20"
              >
                1x
              </div>
            </div>
            <div className="h-[226px] absolute bottom-[48px] left-[70px]  z-20">
              <Slider
                onChange={(value) => {
                  setDefaultZoomLevel(value);
                  if (viewer?.viewport) {
                    viewer?.viewport.zoomTo(value);
                  }
                }}
                step={0.25}
                vertical
                max={20}
                min={1}
                value={defaultZoomLevel}
              />
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
export default PreviewModal;
