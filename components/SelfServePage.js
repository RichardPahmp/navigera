import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import SelfServeCarousel from "./SelfServeCarousel";
import SelfServeMap from "./SelfServeMap";
import { getAllCorners } from "../utilities";
const win = Dimensions.get("window");
import {
  sortPackagesBySize,
  sortPackagesByWeight,
  sortPackagesByDistance,
  sortPackagesClassic
} from "../utilities";

export default class SelfServePage extends Component {
  constructor(props) {
    super(props);

    this.sortPackages = this.sortPackages.bind(this);
  }

  sortPackages() {
    const { packages, chosenRoute } = this.props.screenProps;

    var hasData = true;

    for (var i = 0; i < packages.length; i++) {
      if (!packages[i].data) {
        hasData = false;
        break;
      }
    }

    var packageList;

    if (hasData) {
      //Sortera packageList
      switch (chosenRoute) {
        case "classic":
          packageList = sortPackagesClassic(packages);
          break;
        case "quickest":
          packageList = sortPackagesByDistance(packages);
          break;
        case "volume":
          packageList = sortPackagesBySize(packages);
          break;
        case "weight":
          packageList = sortPackagesByWeight(packages);
          break;
      }
    } else {
      packageList = packages;
    }

    return packageList;
  }

  render() {

    const {setPickedCallback, setActiveCallback } = this.props.screenProps;

    //const packagePositions = getAllCorners();
    console.log("SelfServePage packages: ", packages);

    const packages = this.sortPackages();

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <SelfServeMap packages={packages} style={styles.map} />
        </View>
        <View style={styles.carouselContainer}>
          <SelfServeCarousel
            setPickedCallback={setPickedCallback}
            setActiveCallback={setActiveCallback}
            style={styles.carouselContainer}
            entries={packages}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#0058a3"
  },
  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  carouselContainer: {
    position: "absolute",
    bottom: 0
  }
});
