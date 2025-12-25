import { useMemo } from "react";
import { useContent } from "../context/globalContext";

const useLogoMap = () => {
  const { content, isLoading } = useContent();

  const logoMap = useMemo(() => ({
    default: "/autoways-logo.svg",

    toyota: content?.logos?.toyota || "/assets/images/brands/toyota/toyota-logo.png",
    eicher: content?.logos?.eicher || "/assets/images/brands/eicher/eicher-logo.png",
    bull: content?.logos?.bull || "/assets/images/brands/bull/bull-machine-logo.png",
    dongfeng: content?.logos?.dongfeng || "/assets/images/brands/dongfeng/dongfeng-logo.png",
    komatsu: content?.logos?.komatsu || "/assets/images/brands/xcmg/xcmg-logo.png",
    xcmg: content?.logos?.xcmg || "/assets/images/brands/komatsu/komatsu-logo.png",
    ather: content?.logos?.ather || "/assetsLogos.AtherLogo",

    infomax: content?.logos?.infomax || "/assets/images/sister-companies/infomax-logo.png",
    manipal: content?.logos?.manipal || "/assets/images/sister-companies/manipal-logo.webp",
    prativa: content?.logos?.prativa || "/assets/images/sister-companies/prativa-logo.webp",
    swift: content?.logos?.swift || "/assets/images/sister-companies/swift-logo.png",
    evergreen: content?.logos?.evergreen || "/assets/images/sister-companies/evergreen-logo.webp",

    autoways: "/assets/images/autoways-logo.png",
    autowaysA: "/assetsimages/autoways-a.png",
    autowaysTextLogo: "/assets/images/autoways-text-logo.png",
  }), [content]);

  return { logoMap, isLoading };
}

export default useLogoMap;