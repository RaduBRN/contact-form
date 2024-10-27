const Checkbox = ({ checked, square }) => {
  const shape = square ? "rounded-sm" : "rounded-full";
  const size = square ? "w-[18px] h-[18px]" : "w-[19.5px] h-[19.5px]";
  const checkedBorder = checked ? "border-green600" : "border-grey500";
  const checkedBg = checked ? "bg-green600" : "bg-transparent";
  const innerSpace = square ? "inset-0" : "inset-[3px]";

  return (
    <div
      className={`${size} ${shape} border ${checkedBorder} relative cursor-pointer`}
    >
      {square && checked ? (
        <svg
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" fill="#0C7D69" />
          <path
            d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <div
          className={`absolute ${innerSpace} ${checkedBg} ${shape} cursor-pointer`}
        />
      )}
    </div>
  );
};

export default Checkbox;
