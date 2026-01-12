// "use client";

// import { useEffect, useState } from "react";

// export const useMediaQuery = (query: string = "(min-width: 1023px)") => {
//   const [matches, setMatches] = useState(false);

//   useEffect(() => {
//     const media = window.matchMedia(query);
//     if (media.matches !== matches) {
//       setMatches(media.matches);
//     }

//     const listener = () => setMatches(media.matches);
//     media.addEventListener("change", listener);

//     return () => media.removeEventListener("change", listener);
//   }, [matches, query]);

//   return !matches;
// };
