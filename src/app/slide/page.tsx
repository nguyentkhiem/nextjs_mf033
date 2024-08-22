"use client";
const FullpageViewer = dynamic(() => import("@/components/FullpageViewer"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import WithAuthSlideLayout from "../hoc/PrivateSlideRoute";
import { useSearchParams } from "next/navigation";

const SlideViewer = () => {
  const { get } = useSearchParams();
  const slideUrl = get("slideUrl");
  const donorCode = get("donorCode");
  return (
    <WithAuthSlideLayout>
      <div className="px-[16px] py-[6px] text-[14px] bg-[#e6e6e6] text-[#A2A0A0] rounded font-bold w-fit break-words mb-1">
        {donorCode}
      </div>
      {slideUrl && <FullpageViewer url={slideUrl || ""} />}
    </WithAuthSlideLayout>
  );
};
export default SlideViewer;
