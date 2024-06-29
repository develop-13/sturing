const DummyTotalPageNum = 5;
const DummyCurrentPageNum = 1;

function ProgressBar() {
  return (
    <div className="h-1 flex">
      {Array(DummyTotalPageNum)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className={` h-full basis-0 flex-1 ${
              idx + 1 <= DummyCurrentPageNum ? `bg-mainColor` : ``
            }`}
          ></div>
        ))}
    </div>
  );
}

export default ProgressBar;
