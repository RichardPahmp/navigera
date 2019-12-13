import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import SelfServeCarouselEntryItem from "./SelfServeCarouselEntryItem";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class SelfServeCarousel extends Component {
  constructor() {
    super();
    this.state = {
      activeSlide: 0,
      firstSlide: true
    };

    this.setActiveslide=this.setActiveslide.bind(this);
  }

  _renderItem({ item, index }) {
    const { setPickedCallback } = this.props;
    if (item) {
        if(this.state.firstSlide && index==0){
          console.log("FIRSTSLIDE: ", item.id);
          const { setActiveCallback } = this.props;
          setActiveCallback(item.id);
          this.setState({
            firstSlide:false
          });
        }
      return (
        <SelfServeCarouselEntryItem
        setPickedCallback={setPickedCallback}
        item={item}
        />
        );
    } else {
      return <></>;
    }
  }

  setActiveslide(index, entry){
    const {setActiveCallback} = this.props;
    this.setState({ activeSlide: index })
    setActiveCallback(entry);
  }
  render() {
    const { entries } = this.props;

    console.log("SelfServeCarousel entries: ", entries);
    const sliderWidth = viewportWidth;
    const itemWidth = sliderWidth - 30 * 2;
    
    
    if (entries) {
      return (
        <View style={styles.carouselContainer}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={entries}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            layout={"default"}
            style={styles.carouselStyle}
            onSnapToItem={index => this.setActiveslide(index,entries[index].data.product_info.id)}
          />
          
        </View>
      );
    } else {
      return <></>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  carouselContainer: {},
  carouselStyle: {},
  carouselItemStyle: {
    backgroundColor: "green",
    padding: 10
  }
});
