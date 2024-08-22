import StatisticCard from "./StatisticCard";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/redux/hooks";

const Overview = () => {
  const overview = useAppSelector((state) => state.adminReducer.overview);
  const total = useAppSelector((state) => state.adminGroup.total);

  const { t } = useTranslation("");
  return (
    <div className="space-y-[8px]">
      <div className="grid grid-cols-5 gap-[8px]">
        <div className="col-span-2">
          <StatisticCard
            title={
              <div className="text-[#2666D0]">{t("admin.organizations")}</div>
            }
            content={total}
          />
        </div>
      </div>
      <div className="grid-cols-5 grid gap-[8px]">
        <div className="grid-cols-1">
          <StatisticCard
            title={t("common.total-users")}
            content={overview.totalUser}
          />
        </div>

        <div>
          <StatisticCard
            title={t("admin.opo-user")}
            content={overview.totalOpoUser}
          />
        </div>
        <div>
          <StatisticCard
            title={t("admin.pathologist-user")}
            content={overview.totalPathologyUser}
          />
        </div>
        <div>
          <StatisticCard
            title={t("admin.transplant-user")}
            content={overview.totalTransplantUser}
          />
        </div>
        <div>
          <StatisticCard
            title={t("admin.other-user")}
            content={overview.totalOtherUser}
          />
        </div>
      </div>
    </div>
  );
};
export default Overview;
