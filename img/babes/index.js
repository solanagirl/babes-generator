const Skins = {
    yin: {
        pale: require('./yin/base/Skin1.png'),
        dark: require('./yin/base/Skin2.png'),
        brown: require('./yin/base/Skin3.png'),
        tan: require('./yin/base/Skin4.png'),
        light: require('./yin/base/Skin5.png'),
    },
    yang: {
        pale: require('./yang/base/pale.png'),
        dark: require('./yang/base/dark.png'),
        brown: require('./yang/base/brown.png'),
        tan: require('./yang/base/tan.png'),
        light: require('./yang/base/light.png'),
    },
  };

const Tops = {
    yin: {
        bra1: require('./yin/top/Bra1.png'),
    },
    yang: {
        blackTshirt: require('./yang/top/black_tshirt.png'),
    },
}

const Eyes = {
    yin: {
        blue: require('./yin/eyes/blue.png'),
        black: require('./yin/eyes/black.png'),
        green: require('./yin/eyes/green.png'),
        pink: require('./yin/eyes/pink.png'),
    },
    yang: {
        blue: require('./yang/eyes/blue.png'),
        pink: require('./yang/eyes/pink.png'),
    },
}

const Hair = {
    yin: [
        // {blackMessy: require('./yin/hair/black_messy.png')},
        // {blackPixie: require('./yin/hair/black_pixiecut.png')},
        // {blondeBob: require('./yin/hair/blonde_bob.png')},
        // {blondeWaves: require('./yin/hair/blonde_waves.png')},
        // {brownAfro: require('./yin/hair/brown_afro.png')},
        // {brownBraids: require('./yin/hair/brown_braids.png')},
        // {gingerWaves: require('./yin/hair/ginger_waves.png')},
        // {mintSplit: require('./yin/hair/mint_split.png')},
        {black: require('./yin/hair/black.png')},
        {brown: require('./yin/hair/brown.png')},
        {blonde: require('./yin/hair/blonde.png')}
    ],
    yang: [
        {bald: require('./yang/hair/bald.png')},
        {blackDreads: require('./yang/hair/black_dreads.png')},
        {black: require('./yang/hair/black_hair_short.png')},
        {brown: require('./yang/hair/brown_slickback.png')},
        {blonde: require('./yang/hair/blonde_curls.png')}
    ]
}

const Eyebrows = {
    yin: [
        {blonde: require('./yin/eyebrows/blonde.png')},
        {pointed: require('./yin/eyebrows/pointed.png')},
        {straight: require('./yin/eyebrows/straight.png')},
    ],
    yang: [
        {blonde: require('./yang/eyebrows/blonde.png')},
        {pointed: require('./yang/eyebrows/pointed.png')},
        {straight: require('./yang/eyebrows/straight.png')},
    ]

}

const Lips = {
    yin: [
        {natural: require('./yin/lips/natural.png')},
    ],
    yang: [
        {smile: require('./yang/lips/smile.png')},
    ]
}



  
export { Skins, Tops, Eyes, Hair, Eyebrows, Lips }