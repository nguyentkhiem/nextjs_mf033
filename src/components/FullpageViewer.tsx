/* eslint-disable react/no-deprecated */
"use client";

import { useAppSelector } from "@/redux/hooks";
import "../openseadragon-scalebar";
import CircularSlider from "@fseehawer/react-circular-slider";
import { Slider } from "antd";
import { min } from "lodash";
import { useSearchParams } from "next/navigation";
import OpenSeadragon from "openseadragon";
import { useEffect, useState } from "react";

const FullpageViewer = ({
  url,
  slideId,
}: {
  url?: string;
  slideId?: number;
}) => {
  const [defaultZoomLevel, setDefaultZoomLevel] = useState(0);
  const [viewer, setViewer] = useState<OpenSeadragon.Viewer>();
  const id: string = "slide-viewer-full-page";
  const slideDetail = useAppSelector((state) => state.donorReducer.detail);
  const [defaultRotation, setDefaultRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [maxZoom, setMaxZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(viewer?.viewport.getHomeZoom());
  const [homeZoom, setHomeZoom] = useState(0);
  let viewer_: OpenSeadragon.Viewer | null = null;
  const { get } = useSearchParams();
  const sharedUser = useAppSelector((state) => state.homeReducer.sharedUser);
  useEffect(() => {
    viewer_ = OpenSeadragon({
      id,
      showFullPageControl: false,
      showHomeControl: false,
      showZoomControl: false,
      navigatorRotate: true,
      showNavigator: true,
      navigatorAutoFade: false,
      navigatorAutoResize: true,
      navigatorMaintainSizeRatio: false,
      // navigatorWidth: "250px",
      // navigatorHeight: "250px",
      navigatorPosition: "TOP_RIGHT",
      showNavigationControl: true,
      navigationControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
      animationTime: 0.5,
      blendTime: 0.1,
      constrainDuringPan: false,
      // defaultZoomLevel: 1,
      pixelsPerWheelLine: 1e3,
      maxZoomLevel: 40,
      minZoomImageRatio: 0.5,
      tileSources: url?.includes(".dzi")
        ? url
        : {
            type: "image",
            url: url,
          },
    });

    viewer_.addHandler("zoom", function (event) {
      var newPixelsPerMeter = 1e7 * (event.zoom / homeZoom);

      if (homeZoom && event.zoom / homeZoom > 40) {
        viewer_?.viewport.zoomTo(40 * homeZoom);
        setDefaultZoomLevel(40);
      } else {
        setDefaultZoomLevel(event.zoom / homeZoom);
      }
    });

    viewer_.addHandler("open", function () {
      // var maxZoom = viewer_?.viewport.getMaxZoom() || 1;
      // viewer_?.viewport.zoomTo(maxZoom, undefined, true);
      // viewer_?.viewport.zoomTo(
      //   viewer_?.viewport.getHomeZoom(),
      //   undefined,
      //   true
      // );
      setHomeZoom(Number(viewer_?.viewport.getHomeZoom()));
      // setDefaultZoomLevel(Number(viewer_?.viewport.getHomeZoom().toFixed(1)));

      // setMaxZoom(
      //   Number(
      //     Math.round(maxZoom / Number(viewer_?.viewport.getHomeZoom())).toFixed(
      //       1
      //     )
      //   )
      // );
      // setMinZoom(Number(viewer_?.viewport.getHomeZoom().toFixed(1) || 1));
      (viewer_ as any).scalebar({
        size: 100,
        pixelsPerMeter: (1 / 2) * 1e7,
        stayInsideImage: false,
        color: "#333333",
        barThickness: 3,
        class: "scale",
        fontColor: "#333333",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderBottom: "2px solid #333333 !important",
      });
    });

    setViewer(viewer_);
    return () => {
      viewer_?.destroy();
    };
  }, [url, homeZoom]);

  // useEffect(() => {
  //   if (viewer?.viewport && defaultZoomLevel <= 1) {
  //     viewer?.viewport?.zoomTo(Number(viewer?.viewport?.getHomeZoom()));
  //   }
  // }, [defaultZoomLevel, viewer?.viewport]);

  return (
    // <WithAuthSlideLayout>
    <div className="w-full bg-[#E5E9F480] border-[#213E6F] border-[2px] border-solid rounded-[4px] relative">
      <div className="w-full flex justify-center items-center  ">
        <div
          id={id}
          style={{
            width: "100%",
            height: "calc(100vh - 60px)",
            // aspectRatio: "1/1",
          }}
        ></div>
        <div>
          <div className="absolute flex flex-col left-[24px] top-[40px] space-y-[12px] ">
            <div
              onClick={() => {
                setDefaultZoomLevel(20);
                if (viewer?.viewport) {
                  viewer?.viewport?.zoomTo(homeZoom * 20);
                }
              }}
              className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-[9999]"
            >
              20x
            </div>
            <div
              onClick={() => {
                setDefaultZoomLevel(4);
                if (viewer?.viewport) {
                  viewer?.viewport?.zoomTo(homeZoom * 5);
                }
              }}
              className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-[9999]"
            >
              5x
            </div>
            <div
              onClick={() => {
                setDefaultZoomLevel(2);
                if (viewer?.viewport) {
                  viewer?.viewport?.zoomTo(homeZoom * 2);
                }
              }}
              className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-[9999]"
            >
              2x
            </div>
            <div
              onClick={() => {
                setDefaultZoomLevel(1);
                if (viewer?.viewport) {
                  viewer?.viewport?.zoomTo(homeZoom);
                }
              }}
              className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-[9999]"
            >
              1x
            </div>
            <div className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-20">
              {defaultZoomLevel.toFixed(1)}x
            </div>
            {/* <div
              onClick={() => {
                if (viewer?.viewport) {
                  viewer.setFullScreen(!viewer.isFullPage());
                }
              }}
              className="cursor-pointer flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-[9999]"
            >
              <Image
                width={40}
                height={40}
                src="/images/fullpage_rest.png"
                alt=""
              />
            </div> */}
          </div>
          <div className="h-[226px] absolute top-[32px] left-[70px]  z-[9999]">
            <Slider
              onChange={(value) => {
                setDefaultZoomLevel(value);
                if (viewer?.viewport) {
                  viewer?.viewport?.zoomTo(value * homeZoom);
                }
              }}
              step={0.5}
              vertical
              max={40}
              min={0.5}
              value={defaultZoomLevel}
            />
          </div>
          <div className="rotation-container absolute bottom-[40px] left-[24px]  z-20">
            <CircularSlider
              min={0}
              max={360}
              direction={1}
              knobPosition="top"
              appendToValue="°"
              valueFontSize="2rem"
              trackColor="#eeeeee"
              label="    "
              labelFontSize="1.5rem"
              progressColorFrom={isDragging ? "#F0A367" : "#86B1F8"}
              progressColorTo={isDragging ? "#F65749" : "#009c9a"}
              labelColor={isDragging ? "#F0A367" : "#86B1F8"}
              knobColor={isDragging ? "#F0A367" : "#86B1F8"}
              isDragging={(value: boolean) => setIsDragging(value)}
              onChange={(value: number) => {
                setDefaultRotation(value);
                if (viewer?.viewport) {
                  //delay 0.1s to avoid flickering
                  setTimeout(() => {
                    viewer?.viewport?.setRotation(value);
                  }, 100);
                  // setTimeout(() => {
                  //   viewer?.navigator?.update(viewer.viewport);
                  //   viewer?.viewport?.zoomTo(
                  //     Number(viewer?.viewport?.getHomeZoom()) * defaultZoomLevel
                  //   );
                  // }, 200);
                }
              }}
              width={120}
            />
          </div>
          {sharedUser ? (
            <>
              {(sharedUser?.slide?.originalFilename?.includes(".svs") ||
                sharedUser?.slide?.originalFilename?.includes(".tif")) &&
                sharedUser?.organ === "LIVER" && (
                  <a
                    target="_blank"
                    href={`/analysis-results?id=${get("slideId")}&donorId=${
                      sharedUser.donorCode
                    }`}
                    className="absolute cursor-pointer bottom-[40px] right-[24px] bg-[#FFF] border-[#213E6F] border-[2px] border-solid px-[24px] py-[8px] rounded-[8px] text-[18px] font-[600] text-[#213E6F]"
                  >
                    Steatosis results
                  </a>
                )}
            </>
          ) : (
            <>
              {get("type") === "LIVER" &&
                (get("originalFilename")?.includes(".svs") ||
                  get("originalFilename")?.includes(".tif")) && (
                  <a
                    target="_blank"
                    href={`/analysis-results?id=${get("id")}&donorId=${get(
                      "donorCode"
                    )}`}
                    className="absolute cursor-pointer bottom-[40px] right-[24px] bg-[#FFF] border-[#213E6F] border-[2px] border-solid px-[24px] py-[8px] rounded-[8px] text-[18px] font-[600] text-[#213E6F]"
                  >
                    Steatosis results
                  </a>
                )}
            </>
          )}
        </div>
      </div>
    </div>
    // </WithAuthSlideLayout>
  );
};
export default FullpageViewer;
