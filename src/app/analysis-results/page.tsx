"use client";

import {
  userGetAnalysisResultsRequest,
  userPutCalculationParamsRequest,
} from "@/redux/analysis-results/actions";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Radio, Slider, Space } from "antd";
import html2canvas from "html2canvas";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { useSearchParams } from "next/navigation";
import Loading from "../loading";
import PlotlyChart from "./components/Plotly";
import { userGetMeRequest } from "@/redux/auth/actions";
const Lato = localFont({
  src: "../../assets/fonts/Lato-Bold.ttf",
  preload: true,
});
const LatoRegular = localFont({
  src: "../../assets/fonts/Lato-Regular.ttf",
  preload: true,
});
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const AnalysisResultsPage = () => {
  const dispatch = useDispatch();
  const [imageTarger, setImageTarger] = useState(2); // [1, 2]
  const [imageIndex, setImageIndex] = useState(0);
  const data = useAppSelector((state) => state.slideReducer.data);
  const [imageTarget, setImageTarget] = useState<"individual" | "total">(
    "total"
  );
  const loading = useAppSelector((state) => state.slideReducer.loading);
  const [state, setState] = useState<{
    macroMicroFatThreshold: number;
    fatMinThreshold: number;
    rangeForMicroFatSemiQuantification: number;
  }>({
    macroMicroFatThreshold: 2.5,
    fatMinThreshold: 0.1,
    rangeForMicroFatSemiQuantification: 2,
  });

  useEffect(() => {
    dispatch(userGetMeRequest());
  }, []);

  const user = useAppSelector((state) => state.auth.user);
  const { get } = useSearchParams();
  const [chartInfo, setChartInfo] = useState<{
    data: Array<any>;
    layout: any;
  }>({ data: [], layout: null });

  const id = get("id");

  useEffect(() => {
    if (id) {
      dispatch(userGetAnalysisResultsRequest({ id: Number(id) }));
    }
  }, [id]);

  useEffect(() => {
    setState({
      macroMicroFatThreshold: data?.calcParams?.macroMicroFatThreshold || 2.5,
      fatMinThreshold: data?.calcParams?.fatMinThreshold || 0.1,
      rangeForMicroFatSemiQuantification:
        data?.calcParams?.rangeForMicroFatSemiQuantification || 2,
    });
  }, [data]);

  useEffect(() => {
    // interval
    let interval: any;
    if (
      id &&
      (data?.calcStatus === "PROCESSING" || data?.calcStatus === "PENDING")
    ) {
      interval = setInterval(() => {
        dispatch(userGetAnalysisResultsRequest({ id: Number(id) }));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [data?.calcStatus, id]);

  useEffect(() => {
    if (data?.calcResult?.nucleusSizeDistribution) {
      setChartInfo({
        data: data?.calcResult?.nucleusSizeDistributionTotal?.data,
        layout: data?.calcResult?.nucleusSizeDistributionTotal?.layout,
      });
    }
  }, [data?.calcResult?.nucleusSizeDistribution]);

  useEffect(() => {
    if (data) {
      setState({
        macroMicroFatThreshold: data?.calcResult?.macroMicroFatThreshold,
        fatMinThreshold: data?.calcResult?.fatMinThreshold,
        rangeForMicroFatSemiQuantification:
          data?.calcResult?.rangeForMicroFatSemiQuantification,
      });
    }
  }, []);

  const onNext = () => {
    if (
      imageIndex <
      (data?.calcResult?.originalImage
        ? data?.calcResult?.originalImage?.length
        : 0) -
        1
    ) {
      setImageIndex((prev) => prev + 1);
    }
  };
  const onPrev = () => {
    if (imageIndex > 0) {
      setImageIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      style={LatoRegular.style}
      className={`pt-[20px] min-h-screen bg-[#FFF]  space-y-[10px] text-[#212529] ${LatoRegular.className}`}
    >
      {(loading ||
        data?.calcStatus === "PROCESSING" ||
        data?.calcStatus === "PENDING") && <Loading />}
      <div className="flex space-x-4 px-2">
        <div className="px-[16px] py-[6px] bg-[#F3F3F3] text-[#A2A0A0] rounded font-bold w-full break-words">
          Donor ID: {get("donorId")}
        </div>
        <div
          onClick={() => {
            const element = document.body;

            html2canvas(element).then((canvas) => {
              // Tạo một thẻ <a> để tải ảnh về
              const link = document.createElement("a");
              link.download = "screenshot.png";
              link.href = canvas.toDataURL();
              link.click();
            });
          }}
          className="bg-[#2c3e50] px-[16px] py-[6px]  rounded font-bold text-[#ffffff] cursor-pointer"
        >
          DOWNLOAD
        </div>
      </div>
      <div className="grid grid-cols-12 ">
        <div className="flex items-center col-span-1  justify-center">
          {imageIndex > 0 && (
            <div
              onClick={() => {
                onPrev();
              }}
              style={Lato.style}
              className="font-[500] cursor-pointer bg-[#2c3e50] w-[30px] text-[#FFF] h-[5vh] rounded-[4px] text-[1.5rem] flex justify-center items-center"
            >
              {"<"}
            </div>
          )}
        </div>
        <div className="col-span-5 px-[calc(1.5rem * .5)]">
          <p
            style={Lato.style}
            className="text-[19.5px] text-[#212529] font-bold mb-[0.5vh] pl-[0.5rem] "
          >
            Original Image
          </p>
          <div className="flex items-center justify-center  pt-[8px] ">
            <Plot
              style={{ height: "50vh", width: "40vw" }}
              data={
                data?.calcResult?.originalImage
                  ? structuredClone(
                      data?.calcResult?.originalImage[imageIndex].data
                    )
                  : []
              }
              layout={
                data?.calcResult?.originalImage
                  ? structuredClone({
                      ...data?.calcResult?.originalImage[imageIndex].layout,
                      showlegend: false,
                      xaxis: { visible: false },
                      yaxis: { visible: false },
                    })
                  : {
                      showlegend: false,
                      xaxis: { visible: false },
                      yaxis: { visible: false },
                    }
              }
              config={{
                responsive: true,
              }}
            />
          </div>
        </div>
        <div className="col-span-5 pl-[calc(0.75rem)]">
          <p
            style={Lato.style}
            className="text-[19.5px] text-[#212529] font-bold mb-[0.5vh] pl-[1px]"
          >
            Result Image
          </p>
          <div className="flex items-center justify-center pt-[8px] ">
            <Plot
              style={{ height: "50vh", width: "40vw" }}
              data={
                data?.calcResult?.resultImage
                  ? structuredClone(
                      data?.calcResult?.resultImage[imageIndex].data
                    )
                  : []
              }
              layout={
                data?.calcResult?.resultImage
                  ? structuredClone({
                      ...data?.calcResult?.resultImage[imageIndex].layout,
                      showlegend: false,
                      xaxis: { visible: false },
                      yaxis: { visible: false },
                    })
                  : {
                      showlegend: false,
                      xaxis: { visible: false },
                      yaxis: { visible: false },
                    }
              }
              config={{
                responsive: true,
              }}
            />
          </div>
        </div>
        <div className="flex items-center col-span-1  justify-center  ">
          {imageIndex <
            (data?.calcResult?.originalImage
              ? data?.calcResult?.originalImage?.length
              : 1) -
              1 && (
            <div
              onClick={() => {
                onNext();
              }}
              style={Lato.style}
              className="font-[500]  cursor-pointer bg-[#2c3e50] w-[30px] text-[#FFF] h-[5vh] rounded-[4px] text-[1.5rem] flex justify-center items-center"
            >
              {">"}
            </div>
          )}
        </div>
      </div>
      <div className="flex space-x-5 w-full px-[0.75rem]">
        <div className="flex !w-[50%]">
          <div className="flex-1 flex ">
            <div className="text-[0.75rem] w-[200px]">
              <div
                style={Lato.style}
                className="text-[19.5px] text-[#212529] font-bold mb-[0.5vh]"
              >
                Parameters
              </div>
              <div style={LatoRegular.style} className="text-[12px]">
                Macro/Micro Fat Threshold
              </div>
              <div className="slider-red flex ">
                <div className="flex-1">
                  <Slider
                    min={1}
                    max={10}
                    step={0.1}
                    marks={{ 2.5: "default" }}
                    onChange={(value) => {
                      if (user) {
                        setState((state) => ({
                          ...state,
                          macroMicroFatThreshold: value,
                        }));
                        dispatch(
                          userPutCalculationParamsRequest({
                            id: Number(id),
                            macroMicroFatThreshold: value,
                            fatMinThreshold: state.fatMinThreshold,
                            rangeForMicroFatSemiQuantification:
                              state.rangeForMicroFatSemiQuantification,
                          })
                        );
                      }
                    }}
                    value={state.macroMicroFatThreshold}
                    styles={{
                      track: {
                        background: "red",
                      },
                      rail: {
                        background: "#e9e9e9",
                      },
                    }}
                  />
                </div>
                <div
                  className="w-[15px] pt-[8.5px] text-[16px] ml-[5px] "
                  style={LatoRegular.style}
                >
                  {state.macroMicroFatThreshold}
                </div>
              </div>
              <div style={LatoRegular.style} className="text-[12px]">
                Fat Min Threshold
              </div>
              <div className="flex slider-blue">
                <div className="flex-1">
                  <Slider
                    min={0.1}
                    max={1}
                    step={0.1}
                    value={state.fatMinThreshold}
                    marks={{ 0.5: "default" }}
                    onChange={(value) => {
                      if (user) {
                        setState((state) => ({
                          ...state,
                          fatMinThreshold: value,
                        }));
                        dispatch(
                          userPutCalculationParamsRequest({
                            id: Number(id),
                            macroMicroFatThreshold:
                              state.macroMicroFatThreshold,
                            fatMinThreshold: value,
                            rangeForMicroFatSemiQuantification:
                              state.rangeForMicroFatSemiQuantification,
                          })
                        );
                      }
                    }}
                    styles={{
                      track: {
                        background: "blue",
                      },
                      rail: {
                        background: "#e9e9e9",
                      },
                    }}
                  />
                </div>
                <div
                  className="w-[15px] pt-[8.5px] text-[16px] ml-[5px]"
                  style={LatoRegular.style}
                >
                  {state.fatMinThreshold}
                </div>
              </div>

              <div style={LatoRegular.style} className="text-[12px]">
                Range for Micro Fat Semi-
                <br />
                Quantification
              </div>
              <div className="slider-green flex ">
                <div className="flex-1">
                  <Slider
                    min={1}
                    max={3}
                    step={0.1}
                    value={state.rangeForMicroFatSemiQuantification}
                    marks={{ 2: "default" }}
                    onChange={(value) => {
                      if (user) {
                        setState((state) => ({
                          ...state,
                          rangeForMicroFatSemiQuantification: value,
                        }));
                        dispatch(
                          userPutCalculationParamsRequest({
                            id: Number(id),
                            macroMicroFatThreshold:
                              state.macroMicroFatThreshold,
                            fatMinThreshold: state.fatMinThreshold,
                            rangeForMicroFatSemiQuantification: value,
                          })
                        );
                      }
                    }}
                    styles={{
                      track: {
                        background: "green",
                      },

                      rail: {
                        background: "#e9e9e9",
                      },
                    }}
                  />
                </div>
                <div
                  className="w-[15px] pt-[8.5px] text-[16px] ml-[5px]"
                  style={LatoRegular.style}
                >
                  {state.rangeForMicroFatSemiQuantification}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[0.65]">
            <div className="text-[0.75rem]">
              <div
                style={Lato.style}
                className="text-[19.5px] text-[#212529] font-bold mb-[0.5vh]"
              >
                Image Target
              </div>
              <Radio.Group
                onChange={(e) => {
                  setImageTarget(e.target.value);
                }}
                value={imageTarget}
              >
                <Space direction="vertical">
                  <Radio
                    value="total"
                    className="text-[16px]"
                    style={LatoRegular.style}
                  >
                    Total
                  </Radio>
                  <Radio
                    value="individual"
                    className="text-[16px]"
                    style={LatoRegular.style}
                  >
                    Individual
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
          <div className="flex-[1.5]">
            {" "}
            <div className="text-[0.75rem] space-y-[10px]">
              <div>
                <div
                  style={Lato.style}
                  className="text-[19.5px] text-[#212529] font-bold mb-[0.5vh]"
                >
                  Colors Info
                </div>
                <div
                  style={LatoRegular.style}
                  className=" grid grid-cols-2 gap-[5px]"
                >
                  <div>
                    <span className="text-[darkorange] mr-2">■</span>:Macro Fat
                  </div>
                  <div>
                    <span className="text-[deepskyblue] mr-2">■</span>:Nucleus
                  </div>
                  <div>
                    <span className="text-[limegreen] mr-2">■</span>:Micro Fat
                  </div>
                  <div>
                    <span className="text-[blue] mr-2">■</span>:Nucleus with
                    MicroFat
                  </div>
                  <div>
                    <span className="text-[grey] mr-2">■</span>:Artefact
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div
                  style={Lato.style}
                  className="text-[19.5px] text-[#212529] font-bold mb-[0.5vh]"
                >
                  Statistics Info
                </div>
                <div className="grid grid-cols-9 gap-[10px] items-center">
                  <div
                    className="col-span-6 text-right text-[16px]"
                    style={LatoRegular.style}
                  >
                    Cell Area Ratio
                  </div>
                  {imageTarget === "total" ? (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfoTotal?.cellAreaRatio
                        ? data?.calcResult?.statisticsInfoTotal?.cellAreaRatio
                        : "-"}
                    </div>
                  ) : (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfo[imageIndex]
                        ?.cellAreaRatio
                        ? data?.calcResult?.statisticsInfo[imageIndex]
                            ?.cellAreaRatio
                        : "-"}
                    </div>
                  )}
                  <div style={LatoRegular.style} className="text-center">
                    %
                  </div>
                </div>
                <div className="grid grid-cols-9 gap-[10px] items-center">
                  <div className="col-span-6 text-right text-[16px]">
                    Nucleus Area Ratio
                  </div>
                  {imageTarget === "total" ? (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfoTotal?.nucleusAreaRatio
                        ? data?.calcResult?.statisticsInfoTotal
                            ?.nucleusAreaRatio
                        : "-"}
                    </div>
                  ) : (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfo[imageIndex]
                        ?.nucleusAreaRatio
                        ? data?.calcResult?.statisticsInfo[imageIndex]
                            ?.nucleusAreaRatio
                        : "-"}
                    </div>
                  )}
                  <div style={LatoRegular.style} className="text-center">
                    %
                  </div>
                </div>
                <div className="grid grid-cols-9 gap-[10px] items-center">
                  <div
                    className="col-span-6 text-right text-[16px]"
                    style={LatoRegular.style}
                  >
                    Nucleus Mean Size
                  </div>
                  {imageTarget === "total" ? (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfoTotal?.nucleusMeanSize
                        ? data?.calcResult?.statisticsInfoTotal?.nucleusMeanSize
                        : "-"}
                    </div>
                  ) : (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfo[imageIndex]
                        ?.nucleusMeanSize
                        ? data?.calcResult?.statisticsInfo[imageIndex]
                            ?.nucleusMeanSize
                        : "-"}
                    </div>
                  )}
                  <div style={LatoRegular.style} className="text-center">
                    μm^2
                  </div>
                </div>
                <div className="grid grid-cols-9 gap-[10px] items-center">
                  <div
                    className="col-span-6 text-right text-[16px]"
                    style={LatoRegular.style}
                  >
                    Fat Area Ratio
                  </div>
                  {imageTarget === "total" ? (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfoTotal?.fatAreaRatio
                        ? data?.calcResult?.statisticsInfoTotal?.fatAreaRatio
                        : "-"}
                    </div>
                  ) : (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfo[imageIndex]
                        ?.fatAreaRatio
                        ? data?.calcResult?.statisticsInfo[imageIndex]
                            ?.fatAreaRatio
                        : "-"}
                    </div>
                  )}
                  <div style={LatoRegular.style} className="text-center">
                    %
                  </div>
                </div>
                <div className="grid grid-cols-9 gap-[10px] items-center">
                  <div
                    className="col-span-6 text-right text-[16px]"
                    style={LatoRegular.style}
                  >
                    Macro Fat Ratio
                  </div>
                  {imageTarget === "total" ? (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfoTotal?.macroFatRatio
                        ? data?.calcResult?.statisticsInfoTotal?.macroFatRatio
                        : "-"}
                    </div>
                  ) : (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfo[imageIndex]
                        ?.macroFatRatio
                        ? data?.calcResult?.statisticsInfo[imageIndex]
                            ?.macroFatRatio
                        : "-"}
                    </div>
                  )}
                  <div style={LatoRegular.style} className="text-center">
                    %
                  </div>
                </div>
                <div className="grid grid-cols-9 gap-[10px] items-center">
                  <div
                    className="col-span-6 text-right text-[16px]"
                    style={LatoRegular.style}
                  >
                    Adjusted Macro Fat Ratio
                  </div>
                  {imageTarget === "total" ? (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfoTotal
                        ?.adjustedMacroFatRatio
                        ? data?.calcResult?.statisticsInfoTotal
                            ?.adjustedMacroFatRatio
                        : "-"}
                    </div>
                  ) : (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfo[imageIndex]
                        ?.adjustedMacroFatRatio
                        ? data?.calcResult?.statisticsInfo[imageIndex]
                            ?.adjustedMacroFatRatio
                        : "-"}
                    </div>
                  )}
                  <div style={LatoRegular.style} className="text-center">
                    %
                  </div>
                </div>
                <div className="grid grid-cols-9 gap-[10px] items-center">
                  <div
                    className="col-span-6 text-right text-[16px]"
                    style={LatoRegular.style}
                  >
                    Micro Fat Ratio
                  </div>
                  {imageTarget === "total" ? (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfoTotal?.microFatRatio
                        ? data?.calcResult?.statisticsInfoTotal?.microFatRatio
                        : "-"}
                    </div>
                  ) : (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfo[imageIndex]
                        ?.microFatRatio
                        ? data?.calcResult?.statisticsInfo[imageIndex]
                            ?.microFatRatio
                        : "-"}
                    </div>
                  )}
                  <div style={LatoRegular.style} className="text-center">
                    %
                  </div>
                </div>
                <div className="grid grid-cols-9 gap-[10px] items-center">
                  <div
                    className="col-span-6 text-right text-[16px]"
                    style={LatoRegular.style}
                  >
                    Micro Fat Ratio(Semi-Quantification)
                  </div>
                  {imageTarget === "total" ? (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfoTotal
                        ?.microFatRatioSemiQuantification
                        ? data?.calcResult?.statisticsInfoTotal
                            ?.microFatRatioSemiQuantification
                        : "-"}
                    </div>
                  ) : (
                    <div
                      className="border-[1px] border-solid w-[100%] col-span-2 p-1 flex items-center justify-end h-[26px]"
                      style={LatoRegular.style}
                    >
                      {data?.calcResult?.statisticsInfo[imageIndex]
                        ?.microFatRatioSemiQuantification
                        ? data?.calcResult?.statisticsInfo[imageIndex]
                            ?.microFatRatioSemiQuantification
                        : "-"}
                    </div>
                  )}
                  <div style={LatoRegular.style} className="text-center">
                    %
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-3 w-1/2">
          <div className="flex flex-col flex-1 px-[12px]">
            <div
              style={Lato.style}
              className="text-[19.5px] text-[#212529] font-bold mb-[0.5vh]"
            >
              Nucleus Size Distribution
            </div>
            {imageTarget === "total" ? (
              <PlotlyChart
                data={
                  data?.calcResult?.nucleusSizeDistributionTotal?.data as any
                }
                layout={{
                  ...data?.calcResult?.nucleusSizeDistributionTotal?.layout,
                  showlegend: false,
                  xaxis: { visible: false },
                  yaxis: { visible: false },
                }}
              ></PlotlyChart>
            ) : (
              <PlotlyChart
                data={
                  data?.calcResult?.fatSizeDistribution[imageIndex]?.data as any
                }
                layout={{
                  ...data?.calcResult?.fatSizeDistribution[imageIndex]?.layout,
                  showlegend: false,
                  xaxis: { visible: false },
                  yaxis: { visible: false },
                }}
              ></PlotlyChart>
            )}
          </div>
          <div className="flex flex-col flex-1 px-[12px]">
            <div
              style={Lato.style}
              className="text-[19.5px] text-[#212529] font-bold mb-[0.5vh]"
            >
              Fat Size Distribution
            </div>
            {imageTarget === "total" ? (
              <PlotlyChart
                data={data?.calcResult?.fatSizeDistributionTotal?.data as any}
                layout={{
                  ...data?.calcResult?.fatSizeDistributionTotal?.layout,
                  showlegend: false,
                  xaxis: { visible: false },
                  yaxis: { visible: false },
                }}
              ></PlotlyChart>
            ) : (
              <PlotlyChart
                data={
                  data?.calcResult?.fatSizeDistribution[imageIndex]?.data as any
                }
                layout={{
                  ...data?.calcResult?.fatSizeDistribution[imageIndex]?.layout,
                  showlegend: false,
                  xaxis: { visible: false },
                  yaxis: { visible: false },
                }}
              ></PlotlyChart>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultsPage;
