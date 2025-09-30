declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "react-native-swipe-cards-deck" {
  import { Component } from "react";
  import { ViewStyle } from "react-native";

  export interface SwipeCardsProps {
    cards: any[];
    renderCard: (card: any) => JSX.Element;
    renderNoMoreCards?: () => JSX.Element;
    handleYup?: (card: any) => void;
    handleNope?: (card: any) => void;
    handleMaybe?: (card: any) => void;
    hasMaybeAction?: boolean;
    containerStyle?: ViewStyle;
  }

  export default class SwipeCards extends Component<SwipeCardsProps> {}
}
