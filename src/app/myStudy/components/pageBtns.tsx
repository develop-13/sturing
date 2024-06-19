function PageBtns() {
  return (
    <ul className="flex gap-[10px] justify-center">
      {Array(3)
        .fill(null)
        .map((el, idx) => (
          <li
            key={idx}
            className="cursor-pointer w-[5.48px] h-[6px] rounded-full bg-gray-400"
          ></li>
        ))}
    </ul>
  );
}

export default PageBtns;
