/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import Main from './src/Index';
import {NativeModules,DeviceEventEmitter,AppRegistry} from 'react-native';
var Najva = NativeModules.NajvaModule;
// const App: () => React$Node = () => {
//   return (
//    <Main/>
//   );
// };

// export default App;

 
export default class App extends React.Component {
  constructor(props) {
      super(props);

      var API_KEY = "159e5187-af4c-4e3d-9e85-9cac41b566b6";

      var WEBSITE_ID = 27752; // get this from najva panel setting

      Najva.initializeNajva(API_KEY,WEBSITE_ID,true,false);
  }
  render(){
    return(
      <Main/>
    );
  }
}