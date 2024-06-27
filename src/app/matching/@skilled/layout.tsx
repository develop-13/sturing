function SkilledLayout({ children }: { children: React.ReactNode }) {
  // context api의 전역 state에 현재 페이지 정보를 식별하고 skilled가 아니면 return => 현재 페이지만 볼 수 있게 하기.

  return (
    <section className="">
      {/* skilled layout */}
      {children}
    </section>
  );
}

export default SkilledLayout;
