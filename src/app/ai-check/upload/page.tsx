"use client";

import Loading from "@/app/loading";
import { userGetAnalysisResultsRequest } from "@/redux/analysis-results/actions";
import { useAppSelector } from "@/redux/hooks";
import { Radio, Slider, Space, Upload } from "antd";
import html2canvas from "html2canvas";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PlotlyChart from "./components/Plotly";
const Lato = localFont({
  src: "../../../assets/fonts/Lato-Bold.ttf",
  preload: true,
});
const LatoRegular = localFont({
  src: "../../../assets/fonts/Lato-Regular.ttf",
  preload: true,
});
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const AnalysisResultsPage = () => {
  const [imageURL, setImageURL] = useState<Array<string | undefined>>([]); // Lưu trữ URL của hình ảnh
  const [fileNames, setFileNames] = useState<Array<string>>([]); // Lưu trữ tên của hình ảnh

  // Hàm xử lý tải lên hình ảnh
  const handleImageUpload = ({ fileList }: { fileList: any[] }) => {
    // accept only png file
    const newFileList = fileList.filter((file) => {
      if (file.type === "image/png") {
        return file;
      }
    });

    // Lấy file mới nhất từ fileList
    const imageListURL = newFileList.map((file) => {
      if (file) {
        return URL.createObjectURL(file.originFileObj);
      }
    });

    // Lấy tên của file
    const fileNames = newFileList.map((file) => {
      return file.name;
    });

    // Cập nhật fileNames
    setFileNames(fileNames);

    setImageURL(imageListURL);
  };

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

  console.log("data?.calcResult", data?.calcResult);

  useEffect(() => {
    if (data) {
      setState({
        macroMicroFatThreshold: data?.calcParams?.macroMicroFatThreshold,
        fatMinThreshold: data?.calcParams?.fatMinThreshold,
        rangeForMicroFatSemiQuantification:
          data?.calcParams?.rangeForMicroFatSemiQuantification,
      });
    }
  }, [data]);

  const onNext = () => {
    if (
      imageIndex <
      (data?.calcResult?.originalImage
        ? data?.calcResult?.originalImage?.length
        : imageURL.length || 0) -
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
      className={`pt-2 min-h-screen pb-3 bg-[#FFF]  space-y-[10px] text-[#212529] ${LatoRegular.className}`}
    >
      {(loading ||
        data?.calcStatus === "PROCESSING" ||
        data?.calcStatus === "PENDING") && <Loading />}
      {/* <div className="w-full bg-[#2c3e50] py-[3px] px-2 text-[#FFF]">
        Diagnosis GUI
      </div> */}
      <div className="flex items-center px-2 space-x-2">
        <div className="flex-1 h-[47px] min-w-[932px]">
          <Upload.Dragger
            accept="image/png"
            onChange={handleImageUpload}
            multiple
            showUploadList={false}
            className="flex items-center justify-center h-[47px]"
          >
            <div>
              Drag and Drop or <u className="text-[#18bc9c]">Select Files</u>
            </div>
          </Upload.Dragger>
        </div>
        <div>{fileNames && fileNames[imageIndex]}</div>
        <div className="flex-1 flex justify-end space-x-3">
          <div
            onClick={() => {}}
            className="bg-[#2c3e50] px-[16px] py-[12px]  rounded font-bold text-[#ffffff] cursor-pointer"
          >
            CALCULATE
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
            className="bg-[#2c3e50] px-[16px] py-[12px]  rounded font-bold text-[#ffffff] cursor-pointer"
          >
            DOWNLOAD
          </div>
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
          <div className="flex justify-center  pt-[8px] ">
            {data?.calcResult?.originalImage ? (
              <Plot
                style={{ height: "480px", width: "40vw" }}
                data={
                  data?.calcResult?.originalImage
                    ? structuredClone(
                        data?.calcResult?.originalImage[imageIndex].data
                      )
                    : []
                }
                layout={
                  data?.calcResult?.originalImage
                    ? structuredClone(
                        data?.calcResult?.originalImage[imageIndex].layout
                      )
                    : {}
                }
                config={{
                  responsive: true,
                }}
              />
            ) : (
              <Plot
                config={{
                  responsive: true,
                }}
                data={[]}
                style={{ height: "480px", width: "40vw" }}
                layout={{
                  images: [
                    {
                      source: imageURL[imageIndex] || "",
                      xref: "paper",
                      yref: "paper",
                      x: 0,
                      y: 1,
                      sizex: 1,
                      sizey: 1,
                      opacity: 0.5,
                      layer: "below",
                    },
                  ],
                  showlegend: false,
                  xaxis: { visible: false },
                  yaxis: { visible: false },
                }}
              />
            )}
          </div>
        </div>
        <div className="col-span-5 pl-[calc(0.75rem)]">
          <p
            style={Lato.style}
            className="text-[19.5px] text-[#212529] font-bold mb-[0.5vh] pl-[1px]"
          >
            Result Image
          </p>
          <div className="flex justify-center pt-[8px] ">
            {data?.calcResult?.resultImage ? (
              <Plot
                style={{ height: "480px", width: "40vw" }}
                data={
                  data?.calcResult?.resultImage
                    ? structuredClone(
                        data?.calcResult?.resultImage[imageIndex].data
                      )
                    : []
                }
                layout={
                  data?.calcResult?.resultImage
                    ? structuredClone(
                        data?.calcResult?.resultImage[imageIndex].layout
                      )
                    : {}
                }
                config={{
                  responsive: true,
                }}
              />
            ) : (
              <Plot
                config={{
                  responsive: true,
                }}
                data={[]}
                style={{ height: "480px", width: "40vw" }}
                layout={{
                  images: [
                    {
                      source: imageURL[imageIndex] || "",
                      xref: "paper",
                      yref: "paper",
                      x: 0,
                      y: 1,
                      sizex: 1,
                      sizey: 1,
                      sizing: "contain",
                      opacity: 0.5,
                      layer: "above",
                    },
                  ],
                  showlegend: false,
                  xaxis: { visible: false },
                  yaxis: { visible: false },
                }}
              />
            )}
          </div>
        </div>
        <div className="flex items-center col-span-1  justify-center  ">
          {imageIndex <
            (data?.calcResult?.originalImage
              ? data?.calcResult?.originalImage?.length
              : imageURL.length || 1) -
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
                    value={2.5}
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
                  2.5
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
                    value={0.5}
                    marks={{ 0.5: "default" }}
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
                  0.5
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
                    value={2}
                    marks={{ 2: "default" }}
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
                  2
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
