const DownloadIcon = (props: any) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3C9 2.44772 9.4477 2 10 2C10.5523 2 11 2.44772 11 3V10.1578L14.2428 6.91501L15.657 8.3292L10.0001 13.9861L4.34326 8.3292L5.75748 6.91501L9 10.1575V3Z"
      fill={props.fill ? props.fill : "white"}
    />
    <path
      d="M2 12H4V16H16V12H18V16C18 17.1046 17.1046 18 16 18H4C2.89543 18 2 17.1046 2 16V12Z"
      fill={props.fill ? props.fill : "white"}
    />
  </svg>
);
export default DownloadIcon;
