import logoMap from './logoMap';

  const shopItems = [
    { name: "Toyota", link: "/shop/toyota", image: logoMap.toyota },
    { name: "Bull", link: "/shop/bull", image: logoMap.bull },
    { name: "Eicher", link: "/shop/eciher", image: logoMap.eicher },
    { name: "Komatsu", link: "/shop/komatsu", image: logoMap.komatsu },
    { name: "Dongfeng", link: "/shop/dongfeng", image: logoMap.dongfeng },
    { name: "XCMG", link: "/shop/xcmg", image: logoMap.xcmg },
    { name: "Ather", link: "/shop/ather", image: logoMap.ather },
  ];

  // Partners dropdown items
  const partnersItems = [
    { name: "Manipal", link: "/partners/manipal" },
    { name: "Prativa", link: "/partners/prativa" }
  ];

  export default {shopItems, partnersItems};