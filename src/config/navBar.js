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
    { name: "Manipal Teaching Hospital", link: "/partners/manipal", image: logoMap.manipal },
    { name: "Prativa Secondary School", link: "/partners/prativa", image: logoMap.prativa },
    { name: "Swift Holidays", link: "/partners/swift", image: logoMap.swift }
  ];

  export default {shopItems, partnersItems};