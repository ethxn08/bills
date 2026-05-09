import AppSelect from "./AppSelect.jsx";
import { useI18n } from "../hooks/useI18n.js";

const THRESHOLD_OPTIONS = [75, 80, 85, 90, 95];

function WarningThresholdControl({ value, onChange }) {
  const { t } = useI18n();

  return (
    <div className="threshold-control">
      <AppSelect
        id="warning-threshold"
        label={t("warningThreshold.label")}
        value={value}
        onChange={(nextValue) => onChange(Number(nextValue))}
        options={THRESHOLD_OPTIONS.map((threshold) => ({
          value: threshold,
          label: `${threshold}%`,
        }))}
      />
    </div>
  );
}

export default WarningThresholdControl;
