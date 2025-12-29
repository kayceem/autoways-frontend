import { useMemo } from "react";
import { useContent } from "../context/globalContext";

const useLogoMap = () => {
  const { content, isLoading } = useContent();

  const logoMap = useMemo(() => ({
    default: "/autoways-logo.webp",
    autoways: "/autoways-logo.webp",
    autowaysA: "/autoways-a.webp",
    autowaysTextLogo: "/autoways-text-logo.webp",

    toyota: content?.logos?.toyota,
    eicher: content?.logos?.eicher,
    bull: content?.logos?.bull,
    dongfeng: content?.logos?.dongfeng,
    komatsu: content?.logos?.komatsu,
    xcmg: content?.logos?.xcmg,
    ather: content?.logos?.ather,

    infomax: content?.logos?.infomax,
    manipal: content?.logos?.manipal,
    prativa: content?.logos?.prativa,
    swift: content?.logos?.swift,
    evergreen: content?.logos?.evergreen,

  }), [content]);

  return { logoMap, isLoading };
}

export default useLogoMap;