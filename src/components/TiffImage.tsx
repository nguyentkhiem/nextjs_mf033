/* eslint-disable react/no-deprecated */
import { Slider } from "antd";
import Image from "next/image";
import OpenSeadragon, { Rect } from "openseadragon";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../openseadragon-scalebar";
import CircularSlider from "@fseehawer/react-circular-slider";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
interface Props {
  id: string;
  slideUrl: string;
  slideId?: number;
}

const TiffImage: React.FC<Props> = ({ slideUrl, slideId }) => {
  const slideDetail = useAppSelector((state) => state.donorReducer.detail);
  const [defaultZoomLevel, setDefaultZoomLevel] = useState(0);
  const [defaultRotation, setDefaultRotation] = useState(0);
  const [viewer, setViewer] = useState<OpenSeadragon.Viewer>();
  const [isDragging, setIsDragging] = useState(false);
  const id: string = "slide-viewer-page";
  const [maxZoom, setMaxZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(viewer?.viewport.getHomeZoom());
  let viewer_: OpenSeadragon.Viewer | null = null;
  const [homeZoom, setHomeZoom] = useState(0);
  const router = useRouter();
  const { get } = useSearchParams();
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
      navigatorPosition: "TOP_RIGHT",
      showNavigationControl: true,
      navigationControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
      animationTime: 0.5,
      blendTime: 0.1,
      pixelsPerWheelLine: 1e3,
      constrainDuringPan: false,
      // defaultZoomLevel: 1,
      // maxZoomPixelRatio: 1.25,
      maxZoomLevel: 40,
      minZoomImageRatio: 0.5,
      tileSources: slideUrl.includes(".dzi")
        ? slideUrl
        : {
            type: "image",
            url: slideUrl,
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
      var maxZoom = viewer_?.viewport.getMaxZoom() || 1;
      // viewer_?.viewport.zoomTo(maxZoom, undefined, true);
      // viewer_?.viewport.zoomTo(
      //   viewer_?.viewport.getHomeZoom(),
      //   undefined,
      //   true
      // );
      // const bounds = viewer_?.viewport.getBounds();
      // viewer_?.viewport.fitBounds(bounds as Rect);
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
        pixelsPerMeter: (1 / 2) * 1e7,
        stayInsideImage: false,
        color: "#333333",
        barThickness: 3,
        class: "scale",
        fontColor: "#333333",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderBottom: "2px solid #333333 !important",
        size: 100,
        // minWidth: "75px",
      });
    });

    setViewer(viewer_);
    return () => {
      viewer_?.destroy();
    };
  }, [slideUrl, homeZoom]);

  return (
    <div className="w-full bg-[#E5E9F480] border-[#213E6F] border-[2px] border-solid rounded-[4px] relative">
      <div className="w-full flex justify-center items-center  ">
        <div
          className="relative"
          id={id}
          style={{
            width: "100%",
            height: 645,
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
              className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-20"
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
              className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-20"
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
              className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-20"
            >
              2x
            </div>
            <div
              onClick={() => {
                setDefaultZoomLevel(1);
                if (viewer?.viewport) {
                  viewer?.viewport?.zoomTo(homeZoom * 1);
                }
              }}
              className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-20"
            >
              1x
            </div>
            <div className=" cursor-pointer text-[#FFF] flex items-center justify-center w-[48px] h-[48px] rounded-[6.4px] bg-[#333333] z-20">
              {defaultZoomLevel.toFixed(1)}x
            </div>
          </div>
          <div className="h-[226px] absolute top-[32px] left-[70px]  z-20">
            <Slider
              onChange={(value) => {
                setDefaultZoomLevel(value);
                if (viewer?.viewport) {
                  viewer?.viewport?.zoomTo(value * homeZoom);
                }
              }}
              vertical
              step={0.5}
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
                    if (viewer?.viewport) {
                      viewer?.viewport?.zoomTo(homeZoom * defaultZoomLevel);
                    }
                  }, 100);
                }
              }}
              width={120}
            />
          </div>
          {slideDetail?.organ === "LIVER" &&
            (slideDetail?.slide?.originalFilename?.includes(".svs") ||
              slideDetail?.slide?.originalFilename?.includes(".tif")) && (
              <a
                target="_blank"
                href={`/analysis-results?id=${slideId}&donorId=${slideDetail?.donorCode}`}
                className="absolute cursor-pointer bottom-[40px] right-[24px] bg-[#FFF] border-[#213E6F] border-[2px] border-solid px-[24px] py-[8px] rounded-[8px] text-[18px] font-[600] text-[#213E6F]"
              >
                Steatosis results
              </a>
            )}
        </div>
      </div>
    </div>
  );
};
export default TiffImage;
