import PrivacyToggle from "../atoms/PrivacyToggle";

type TProps = {
  label: string;
  content: string;
  inputType?: "text" | "email";
  hasPrivacyToggle?: boolean;
};

function InfoFieldsFormat({
  label = "text",
  content,
  inputType,
  hasPrivacyToggle = false,
}: TProps) {
  return (
    <section className="border-b border-gray-300">
      <label className="text-[14px] text-gray-700">{label}</label>
      <div className="py-[14px] flex justify-between">
        <input
          type={inputType}
          className="text-[16px] text-gray-1000 font-bold"
          readOnly
          value={content}
        />
        {hasPrivacyToggle && <PrivacyToggle />}
      </div>
    </section>
  );
}

export default InfoFieldsFormat;
