// export const ServicesMobile = (props: React.SVGProps<SVGSVGElement>) => {
//   return (
//     // <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
//       <path
//         d="M6 19.5L7.5 15.2603M7.5 15.2603L11.0637 5.18776C11.3881 4.27075 12.6119 4.27075 12.9363 5.18776L16.5 
//           15.2603M7.5 15.2603H16.5M16.5 15.2603L18 19.5
//         " 
//         stroke="#747474" 
//         stroke-width="2" 
//         stroke-linecap="square"
//       />
//     </svg>
//   )
// }

export const ServicesMobile = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 19.5L7.5 15.2603M7.5 15.2603L11.0637 5.18776C11.3881 4.27075 12.6119 4.27075 12.9363 5.18776L16.5 
          15.2603M7.5 15.2603H16.5M16.5 15.2603L18 19.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="square"
      />
    </svg>
  );
};