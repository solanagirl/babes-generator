import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import ConnectButton from '../components/ConnectButton';
import { Menu } from '../components/Menu'
import { Colors } from '../components/Colors'
import { Eyebrows, Eyes, Hair, Lips, Skins, Tops } from '../img/babes';
import { useGuardedCallback } from '../src/useGuardedCallback';
import ViewShot from "react-native-view-shot";
import { Switch, TextInput } from 'react-native-paper';
import { createNFT } from '../src';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { PermissionsAndroid, Platform } from "react-native";

export default function Calendar({ navigation }: any) {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const [selectedSkin, setSelectedSkin] = useState('pale');
  const [selectedEyes, setSelectedEyes] = useState('pink');
  const [selectedHairIndex, setSelectedHairIndex] = useState(0);
  const [selectedEyebrowIndex, setSelectedEyebrowIndex] = useState(0);
  const [imageURI, setImageURI] = useState<string>();
  const [name, setName] = useState<string>('Babe');
  const [attributes, setAttributes] = useState<any>({});
  const ref = useRef();

  const [yang, setYang] = useState(false);
  const toggleSwitch = () => {setYang(previousState => !previousState); setSelectedEyebrowIndex(0); setSelectedHairIndex(0)};

  const fetchAndUpdateBalance = useGuardedCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('Balance fetched: ' + fetchedBalance);
      setBalance(fetchedBalance);
    },
    [balance],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

  const generateImage = useCallback(async() => {
    // @ts-expect-error
    ref.current.capture().then((uri: string) => {
      setImageURI(uri)
    });
  }, []);

  const generateNFT = useCallback(async () => {
    if (name) {
      const result = await createNFT(name, selectedAccount!.publicKey, imageURI!, attributes);
      console.log(result)  
    }
  }, [])


  function updateHair(hair: any) {
    if (selectedHairIndex == hair.length - 1) {
      setSelectedHairIndex(0);
    } else {
      setSelectedHairIndex((prevState) => prevState+1);
    }
  }

  function updateEyebrows(eyebrows: any) {
    if (selectedEyebrowIndex == eyebrows.length - 1) {
      setSelectedEyebrowIndex(0);
    } else {
      setSelectedEyebrowIndex((prevState) => prevState+1);
    }
  }

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      // @ts-expect-error
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }
    };
  
    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      // @ts-expect-error
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };
  
    return await getRequestPermissionPromise();
  }
  
  async function savePicture() {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
  
    if (imageURI) {
      CameraRoll.save(imageURI);
    }
  };
  
  

  if (imageURI !== undefined) {
    return (
      <ImageBackground source={require('../img/bg-pattern-4.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <TextInput placeholder='Name your Babe' style={styles.name} onChangeText={(e) => {setName(e)}}/>
          <View style={styles.mainContainer}>
            <Image source={{uri: imageURI}} style={styles.image} />
          </View>
          <View style={styles.paddedContainer}>
            <View style={styles.horizontalContainer}>
              <Text>
                Want to upgrade your babe?
              </Text>
              {
                selectedAccount?.publicKey ? (
                  <TouchableOpacity style={styles.button} onPress={() => {generateNFT()}}>
                    <Text>Put Babe on Solana</Text>
                  </TouchableOpacity>  
                ) : (
                  <ConnectButton title='Connect'/>
                )
              }
            </View>
            <View style={styles.horizontalContainer}>
              <TouchableOpacity onPress={() => {savePicture();}}>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Menu navigation={navigation} />
      </ImageBackground>
    )
  }

  if (yang) {
    let skin;
    switch (selectedSkin) {
      case 'dark':
        skin = (Skins.yang.dark);
        break;
      case 'tan':
        skin = (Skins.yang.tan);  
        break;
      case 'light':
        skin = Skins.yang.light;
        break;
      case 'pale':
        skin = Skins.yang.pale;  
        break;
      case 'brown':
        skin = Skins.yang.brown;  
        break;  
    }
    let eyes;
    switch (selectedEyes) {
        case 'pink':
        eyes = Eyes.yang.pink;  
        break;
    case 'blue':
      eyes = Eyes.yang.blue;  
      break;  
    }
  
    return (
      <ImageBackground source={require('../img/bg-pattern-4.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
          <ViewShot style={styles.mainContainer} ref={ref} options={{ fileName: "Babe", format: "jpg", quality: 1 }}>
              <Image source={skin} style={styles.image} />
              <Image source={Lips.yang[0].smile} style={styles.image} />
              <Image source={Tops.yang.blackTshirt} style={styles.image} />
              <Image source={eyes} style={styles.image} />
              <Image source={Object.values(Eyebrows.yang[selectedEyebrowIndex])[0]} style={styles.image} />
              <Image source={Object.values(Hair.yang[selectedHairIndex])[0]} style={styles.image} />
          </ViewShot>
          <Switch trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={yang ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={yang}
            style={styles.switch}
          ></Switch>
          <View style={styles.paddedContainer}>
            <View style={styles.horizontalContainer}>
              <Text style={styles.title}>Skin Color</Text>
              <TouchableOpacity onPress={() => {setSelectedSkin('pale')}} style={styles.pale}>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedSkin('light')}} style={styles.light}>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedSkin('tan')}} style={styles.tan}>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedSkin('brown')}} style={styles.brown}>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedSkin('dark')}} style={styles.dark}>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalContainer}>
              <Text style={styles.title}>Eye Color</Text>
              <TouchableOpacity onPress={() => {setSelectedEyes('blue')}} style={styles.blue}>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedEyes('pink')}} style={styles.pink}>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalContainer}>
              <TouchableOpacity style={styles.button} onPress={() => {updateEyebrows(Eyebrows.yang)}}>
                  <Text style={styles.buttonText}>Eyebrows</Text>
                </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {updateHair(Hair.yang)}}>
                <Text style={styles.buttonText}>Hairstyle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.fullButton} onPress={() => {generateImage()}}>
              <Text style={styles.title}>Generate</Text>
            </TouchableOpacity>
            </View>
          </View>
      </View>
      <Menu navigation={navigation}/>
      </ImageBackground>
    );    
  } else {
    let skin;
    switch (selectedSkin) {
      case 'dark':
        skin = (Skins.yin.dark);
        break;
      case 'tan':
        skin = (Skins.yin.tan);  
        break;
      case 'light':
        skin = Skins.yin.light;
        break;
      case 'pale':
        skin = Skins.yin.pale;  
        break;
      case 'brown':
        skin = Skins.yin.brown;  
        break;  
    }
  
    let eyes;
    switch (selectedEyes) {
      case 'blue':
        eyes = Eyes.yin.blue;
        break;
      case 'pink':
        eyes = Eyes.yin.pink;  
        break;
    }
  
  return (
    <ImageBackground source={require('../img/bg-pattern-4.jpg')} style={styles.backgroundImage}>
    <View style={styles.container}>
        <ViewShot style={styles.mainContainer} ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 1 }}>
            <Image source={skin} style={styles.image} />
            <Image source={Tops.yin.bra1} style={styles.image} />
            <Image source={Lips.yin[0].natural} style={styles.image} />
            <Image source={eyes} style={styles.image} />
            <Image source={Object.values(Eyebrows.yin[selectedEyebrowIndex])[0]} style={styles.image} />
            <Image source={Object.values(Hair.yin[selectedHairIndex])[0]} style={styles.image} />
        </ViewShot>
        <Switch trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={yang ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={yang}
          style={styles.switch}
        ></Switch>
        <View style={styles.paddedContainer}>
          <View style={styles.horizontalContainer}>
            <Text style={styles.title}>Skin Color</Text>
            <TouchableOpacity onPress={() => {setSelectedSkin('pale')}} style={styles.pale}>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setSelectedSkin('light')}} style={styles.light}>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setSelectedSkin('tan')}} style={styles.tan}>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setSelectedSkin('brown')}} style={styles.brown}>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setSelectedSkin('dark')}} style={styles.dark}>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalContainer}>
            <Text style={styles.title}>Eye Color</Text>
            <TouchableOpacity onPress={() => {setSelectedEyes('blue')}} style={styles.blue}>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setSelectedEyes('pink')}} style={styles.pink}>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {updateEyebrows(Eyebrows.yin)}}>
                <Text style={styles.buttonText}>Eyebrows</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {updateHair(Hair.yin)}}>
              <Text style={styles.buttonText}>Hairstyle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fullButton} onPress={() => {generateImage()}}>
            <Text style={styles.title}>Generate</Text>
          </TouchableOpacity>
          </View>
        </View>
    </View>
    <Menu navigation={navigation}/>
    </ImageBackground>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    height: '100%',
    width: "100%"
  },
  button: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderTopColor: Colors.mint,
    borderTopWidth: 12,
    height: 60,
    width: 100,
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: Colors.purple
  },
  fullButton: {
    borderRadius: 30,
    borderBottomColor: Colors.purple,
    borderBottomWidth: 12,
    borderTopWidth: 4,
    borderTopColor: Colors.blue,
    height: 70,
    width: 150,
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: Colors.mint
  },
  mainContainer: {
    backgroundColor: Colors.component,
    height: 420,
    alignItems: "center",
  },
  paddedContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    color: Colors.font,
    fontFamily: 'Nunito',
    textAlign: 'center',
  },
  switch: {
    marginTop: -36
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center'
  },
  image: {
    width: 420,
    height: 420,
    position: 'absolute'
  },  
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
  name: {
    backgroundColor: Colors.backgroundMain
  },
  pale: {
    backgroundColor: Colors.pale,
    borderRadius: 36,
    height: 24,
    width: 24
  },
  light: {
    backgroundColor: Colors.light,
    borderRadius: 36,
    height: 24,
    width: 24
  },
  tan: {
    backgroundColor: Colors.tan,
    borderRadius: 36,
    height: 24,
    width: 24
  },
  brown: {
    backgroundColor: Colors.brown,
    borderRadius: 36,
    height: 24,
    width: 24
  },
  dark: {
    backgroundColor: Colors.dark,
    borderRadius: 36,
    height: 24,
    width: 24
  },
  blue: {
    backgroundColor: Colors.blue,
    borderRadius: 36,
    height: 24,
    width: 24
  },
  pink: {
    backgroundColor: Colors.pink,
    borderRadius: 36,
    height: 24,
    width: 24
  }
});
