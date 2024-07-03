type TProps = {
  title: string[];
  subtitle?: string[];
};

function MatchingHeader(props: TProps) {
  const { title, subtitle } = props;
  return (
    <header className="flex flex-col gap-[11px] ml-4 mt-5">
      <div className="font-semibold text-[20px] leading-[30px] font-[#010101]">
        {title.map((text, idx) => (
          <h1 key={idx}>{text}</h1>
        ))}
      </div>
      {subtitle && (
        <div>
          {subtitle.map((text, idx) => (
            <h6
              key={idx}
              className="font-normal text-[14px] leading-[21px] text-[#676767]"
            >
              {text}
            </h6>
          ))}
        </div>
      )}
    </header>
  );
}

export default MatchingHeader;
