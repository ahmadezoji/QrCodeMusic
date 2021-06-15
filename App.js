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

      var API_KEY = "2c597919-cb2c-43da-a16d-21706ba850b3";

      var WEBSITE_ID = 20908; // get this from najva panel setting

      Najva.initializeNajva(API_KEY,WEBSITE_ID,true,false);
  }
  render(){
    return(
      <Main/>
    );
  }
}