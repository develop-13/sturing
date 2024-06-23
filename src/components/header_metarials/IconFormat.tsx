function IconFormat({
  size = 24,
  icon,
  onClick,
}: {
  size?: number;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className={`text-[${size}px]`}>
      {icon}
    </div>
  );
}

export default IconFormat;
