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
    yin: [
        {path: require('./yin/top/Bra1.png'), name: 'Black Bra 1', price: 0.01},
        {path: require('./yin/top/black_and_green_bra.png'), name: 'Black and Green Bra', price: 0.05},
        {path: require('./yin/top/black_and_pink_bra.png'), name: 'Black and Pink Bra', price: 0.05},
        {path: require('./yin/top/black_bra.png'), name: 'Black Bra 2', price: 0.05},
        {path: require('./yin/top/black_corset.png'), name: 'Black Corset', price: 0.50},
        {path: require('./yin/top/black_fishnet_top.png'), name: 'Black Fishnet Top', price: 0.29},
        {path: require('./yin/top/black_strapless.png'), name: 'Black Strapless', price: 0.17},
        {path: require('./yin/top/white_strapless.png'), name: 'White Strapless', price: 0.17},
    ],
    yang: [
        {path: require('./yang/top/black_tshirt.png'), name: 'Black T-shirt', price: 0.01},
        {path: require('./yang/top/black_degen_hoodie.png'), name: 'Degen Hoodie', price: 0.29},
        {path: require('./yang/top/black_ripped_hoodie.png'), name: 'Black Ripped Hoodie', price: 0.11},
        {path: require('./yang/top/black_tank_top.png'), name: 'Black Tank Top', price: 0.04},
        {path: require('./yang/top/black_embroidered_button_up.png'), name: 'Black Embroidered Button Up', price: 0.24},
        {path: require('./yang/top/mint_rainbow_button_up.png'), name: 'Mint Rainbow Button Up', price: 0.39},
        {path: require('./yang/top/white_crewneck.png'), name: 'White Crewneck', price: 0.19},
    ],
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
        {path: require('./yin/hair/black.png'), name: 'Black Basic', price: 0.01},
        {path: require('./yin/hair/brown.png'), name: 'Brown Basic', price: 0.01},
        {path: require('./yin/hair/blonde.png'), name: 'Blonde Basic', price: 0.01},
        {path: require('./yin/hair/black_bob.png'), name: 'Blacl Bob', price: 0.14},
        {path: require('./yin/hair/blonde_bob.png'), name: 'Blonde Bob', price: 0.14},
        {path: require('./yin/hair/black_mini_pigtails.png'), name: 'Black Mini Pigtails', price: 0.05},
        {path: require('./yin/hair/blonde_side_waves.png'), name: 'Blonde Side Waves', price: 0.34},
        {path: require('./yin/hair/blonde_waves.png'), name: 'Blonde Waves', price: 0.27},
        {path: require('./yin/hair/mint_split.png'), name: 'Mint Split', price: 0.49},
        {path: require('./yin/hair/purple_braids.png'), name: 'Purple Braids', price: 0.69},
        {path: require('./yin/hair/purple_highlights.png'), name: 'Purple Highlights', price: 0.49},
        {path: require('./yin/hair/silver_bangs.png'), name: 'Silver Bangs', price: 0.99}
    ],
    yang: [
        {path: require('./yang/hair/bald.png'), name: 'Bald', price: 0.00},
        {path: require('./yang/hair/black_dreads.png'), name: 'Black Dreads', price: 0.01},
        {path: require('./yang/hair/black_hair_short.png'), name: 'Black Short Hair', price: 0.01},
        {path: require('./yang/hair/brown_slickback.png'), name: 'Brown Slicked Back Hair', price: 0.01},
        {path: require('./yang/hair/blonde_curls.png'), name: 'Blonde Curls', price: 0.01},
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