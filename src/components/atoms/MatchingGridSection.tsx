function MatchingGridSection({ children }: { children: React.ReactNode }) {
  return <main className="grid grid-cols-2 gap-[15px]">{children}</main>;
}

export default MatchingGridSection;
