import React from 'react';
import Profile from '../screens/Profile';
import StackNavigator from './StackNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from 'firebase';
import LogOut from '../screens/LogOut';
const Drawer = createDrawerNavigator();
export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      light_theme:true,

    }
  }

  componentDidMount() {
    let theme
       firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
    .on('value',(data) => {
      theme= data.val().current_theme
    })
    this.setState({
       light_theme:theme==='light'?true:false,
      })
  }
  render() {
  return (
    <Drawer.Navigator drawerContentOptions={{
      activeTintColor:"#e91e63", 
      inactiveTintColor: this.state.light_theme?"black":"white",
      itemStyle:{marginVertical:5},
      
    }}
    drawerContent={(props)=><CustomSidebarMenu{...props}/>}
    >
      
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Logout" component={LogOut} />
    </Drawer.Navigator>
  );
}
};
