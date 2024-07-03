function TwoIconsFormat({
  gap,
  children,
}: {
  gap: number;
  children: React.ReactNode;
}) {
  return <div className={`flex gap-[${gap}px] items-center`}>{children}</div>;
}

export default TwoIconsFormat;
