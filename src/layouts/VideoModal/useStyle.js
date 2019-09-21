import { useState, useEffect } from 'react';
import { StyleSheet, LayoutAnimation } from 'react-native';
import { useSelector } from 'react-redux';
import { ORIENTATION } from 'utils';

const STATES = {
  FULL: 'full',
  DIMINISHED: 'diminished',
};

const styleMap = {
  [ORIENTATION.PORTRAIT]: {
    [STATES.FULL]: {
      wrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 20,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        zIndex: 9999,
      },
      interactable: {
        zIndex: 9,
      },
      video: {},
      controls: {},
      outsideControls: {
        height: 0,
        width: 0,
      },
      meta: {},
    },
    [STATES.DIMINISHED]: {
      wrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // top: 0,
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        zIndex: 9999,
      },
      interactable: {
        zIndex: 9999,
        flex: 1,
      },
      video: {},
      controls: {},
      outsideControls: {},
      meta: {
        height: 0,
        width: 0,
        maxHeight: 0,
        maxwidth: 0,
      },
    },
  },
  [ORIENTATION.LANDSCAPE]: {
    [STATES.FULL]: {
      wrapper: {},
      interactable: {},
      video: {},
      controls: {},
      outsideControls: {},
      meta: {},
    },
    [STATES.DIMINISHED]: {
      wrapper: {},
      interactable: {},
      video: {},
      controls: {},
      outsideControls: {},
      meta: {},
    },
  },
};

export default function () {
  const [styleState, setStyleState] = useState(STATES.FULL);
  const orientation = useSelector(s => s.general.dimensions.orientation);
  const height = useSelector(s => s.general.dimensions.height);
  const width = useSelector(s => s.general.dimensions.width);
  const [styles, setStyles] = useState(styleMap[orientation][styleState]);

  const DIMINISHED_HEIGHT = height * 0.2;

  useEffect(() => {
    const video = { ...styleMap[orientation][styleState].video };
    const wrapper = { ...styleMap[orientation][styleState].wrapper };
    const interactable = { ...styleMap[orientation][styleState].interactable };
    const controls = { ...styleMap[orientation][styleState].controls };
    const outsideControls = {
      ...styleMap[orientation][styleState].outsideControls,
    };
    const meta = { ...styleMap[orientation][styleState].meta };
    if (orientation === ORIENTATION.PORTRAIT) {
      if (styleState === STATES.FULL) {
        video.height = width * 0.5625;
        video.width = width;
        wrapper.height = height;
      } else {
        video.height = DIMINISHED_HEIGHT;
        video.width = DIMINISHED_HEIGHT / 0.5625;
        wrapper.height = DIMINISHED_HEIGHT;
      }
    }
    setStyles({
      wrapper,
      interactable,
      video,
      controls,
      outsideControls,
      meta,
    });
  }, [styleState, orientation]);

  const reset = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStyleState(STATES.FULL);
  };
  const setFull = () => {
    reset();
  };
  const setDiminished = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStyleState(STATES.DIMINISHED);
  };

  return {
    reset,
    setFull,
    setDiminished,
    styles,
    isFull: styleState === STATES.FULL,
    height,
    DIMINISHED_HEIGHT,
  };
}
