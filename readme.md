You can fix the problem changing some code in the file \node_modules\metro-config\src\defaults\blacklist.js .

Search this variable:

var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

and change to this:

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];


expo install react-native-gesture-handler

npm install react-native-gesture-handler react-native-reanimated react-native-screens

npm install --save expo-font

npm install --save-dev redux-devtools-extension
npm install --save @expo/vector-icons
npm install --save moment