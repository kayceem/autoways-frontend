import logoMap from './logoMap';

  const shopItems = [
    { name: "Toyota", link: "/shop/toyota", image: logoMap.toyota },
    { name: "Eicher", link: "/shop/eicher", image: logoMap.eicher },
    { name: "Komatsu", link: "/shop/komatsu", image: logoMap.komatsu },
    { name: "Dongfeng", link: "/shop/dongfeng", image: logoMap.dongfeng },
    { name: "XCMG", link: "/shop/xcmg", image: logoMap.xcmg },
    { name: "Ather", link: "/shop/ather", image: logoMap.ather },
  ];

  // Partners dropdown items
  const partnersItems = [
    { name: "Manipal Teaching Hospital", link: "/sister-companies/manipal", image: logoMap.manipal },
    { name: "Prativa Secondary School", link: "/sister-companies/prativa", image: logoMap.prativa },
    { name: "Swift Holidays", link: "/sister-companies/swift", image: logoMap.swift },
    { name: "Info Max College", link: "/sister-companies/info-max",  image: logoMap.infomax },
    { name: "Evergreen Academy", link: "/sister-companies/evergreen", image: logoMap.evergreen },
  ];

  export default {shopItems, partnersItems};