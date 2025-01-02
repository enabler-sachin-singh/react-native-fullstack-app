import { useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

import { icons } from "../constants";

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};

const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = true;
  });

  return (
    <Animatable.View
      style={styles.itemContainer}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View>
          <VideoView
            player={player}
            style={styles.video}
            allowsFullscreen
            allowsPictureInPicture
          />
          <TouchableOpacity
            style={styles.stopButton}
            onPress={() => setPlay(false)}
          >
            <Image source={icons.stop} style={styles.controlIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.touchableContainer}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={styles.imageBackground}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginRight: 20,
  },
  video: {
    width: 208,
    height: 288,
    borderRadius: 33,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  touchableContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  imageBackground: {
    width: 208,
    height: 288,
    borderRadius: 33,
    marginVertical: 20,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  playIcon: {
    width: 48,
    height: 48,
    position: "absolute",
  },
  stopButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  controlIcon: {
    width: 24,
    height: 24,
  },
});

export default Trending;
