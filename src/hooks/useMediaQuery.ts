import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function(mediaQuery: string): (c: string, q: string)=> string {
  const query = useMediaQuery(mediaQuery);
  return (className: string, queryClassName: string)=> query?
    `${className} ${queryClassName}` : className
}
