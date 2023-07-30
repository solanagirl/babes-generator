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
}

const Eyes = {
    yin: {
        blue: require('./yin/eyes/blue.png'),
        black: require('./yin/eyes/black.png'),
        green: require('./yin/eyes/green.png'),
        pink: require('./yin/eyes/pink.png'),
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
    ]
}

const Eyebrows = {
    yin: [
        {blonde: require('./yin/eyebrows/blonde.png')},
        {pointed: require('./yin/eyebrows/pointed.png')},
        {straight: require('./yin/eyebrows/straight.png')},
    ]
}

const Lips = {
    yin: [
        {natural: require('./yin/lips/natural.png')},
    ]
}



  
export { Skins, Tops, Eyes, Hair, Eyebrows, Lips }