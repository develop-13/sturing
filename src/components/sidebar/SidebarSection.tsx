function SidebarSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-[40px] border-b border-gray-300 flex flex-col gap-[32px]">
      {children}
    </div>
  );
}

export default SidebarSection;
