import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Apploading from 'expo-app-loading';
import * as Font from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons';

let customFont = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};
export default class StoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme:true,
      story_id: this.props.story.key,
      story_data: this.props.story.value,
      isLiked: false,
      likes: this.props.story.value.likes,
    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFont);
    this.setState({
      fontsLoaded: true,
    });
  }
  componentDidMount() {
    this._loadFontsAsync()
    let theme
       firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
    .on('value',(data) => {
      theme= data.val().current_theme
    })
    this.setState({
       light_theme:theme==='light'?true:false,
      })
  }
  likeaction(){
    if(this.state.isLiked){
      firebase.database().ref("posts").child(this.state.story_id).child("liked").set(firebase.database.ServerValue.increment(-1))
      this.setState({isLiked:false,likes:(this.state.likes-=1)})
    }
    else {
     firebase.database().ref("posts").child(this.state.story_id).child("liked").set(firebase.database.ServerValue.increment(+1))
     this.setState({isLiked:true,likes:(this.setState.likes=+1)})
    }
  }
  render() {
    let story =this.state.story_data
    if (!this.state.fontsLoaded) {
      return <Apploading />;w
    } else {
      let images={
        "image_1": require('../assets/story_image_1.png'),
        "image_2": require('../assets/story_image_2.png'),
        "image_3": require('../assets/story_image_3.png'),
        "image_4": require('../assets/story_image_4.png'),
        "image_5": require('../assets/story_image_5.png'),

      }
    
      return (
        <TouchableOpacity style={styles.container} 
        onPress={()=>{
          this.props.navigation.navigate('StoryScreen', 
          {
            story:this.props.story
          })
        }}
        >
          <View style={this.state.light_theme?styles.cardContainerLight:styles.cardContainer}>
            <Image
              source={images[story.preview_image]}
              style={styles.storyImage}
            />
            <View style={styles.titleContainer}>
              <Text style={this.state.light_theme?styles.storyTitleTextLight:styles.storyTitleText}>
                {this.props.story.title}
              </Text>
              <Text style={this.state.light_theme?styles.storyAuthorTextLight:styles.storyAuthorText}>
                {this.props.story.author}
              </Text>
              <Text style={this.state.light_theme?styles.descriptionTextLight:styles.descriptionText}>
                {this.props.story.description}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity style={this.state.isLiked?styles.likeButtonLiked:styles.likeButtonDisliked} 
              onPress={()=>this.likeaction()}>
                <Ionicons name={'heart'} size={RFValue(30)} color="white" />
                <Text style={this.state.light_theme?styles.likeTextLight:styles.likeText}>12k</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  likeButtonLiked: { width: RFValue(160), height: RFValue(40), justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#eb3948", borderRadius: RFValue(30) }, likeButtonDisliked: { width: RFValue(160), height: RFValue(40), justifyContent: "center", alignItems: "center", flexDirection: "row", borderColor: "#eb3948", borderWidth: 2, borderRadius: RFValue(30) }, likeText: { color: "white", fontFamily: "Bubblegum-Sans", fontSize: 25, marginLeft: 25, marginTop: 6 }, likeTextLight: { fontFamily: "Bubblegum-Sans", fontSize: 25, marginLeft: 25, marginTop: 6 },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  cardContainerLight: {
    margin: RFValue(13),

    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  titleTextContainer: {
    flex: 0.8
  },
  iconContainer: {
    flex: 0.2
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  storyTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  storyAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black"
  },
  descriptionContainer: {
    marginTop: RFValue(5)
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "white"
  },
  descriptionTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "black"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});