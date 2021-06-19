import React from 'react';
import {View, Image} from 'react-native';

const Logo = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
     	  <Image source = {require('../img/manga_info_logo.png')} style = {{width: 300, height: 50}}/>
    </View>
  );
};

export default Logo;