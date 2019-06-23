import React, { memo } from 'react';
import { View as RNView } from 'react-native';
import Modal from 'react-native-modal';
/* import Video from 'react-native-video';
 */ import { useSelector, useDispatch } from 'react-redux';
import { actionCleanVideo } from 'store';

function VideoModal() {
  const videoLink = useSelector(s => s.video.link);
  const meta = useSelector(s => s.video.meta);
  const dispatch = useDispatch();
  return (
    <Modal
      isVisible={!!meta}
      avoidKeyboard
      style={{
        height: 300,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
      coverScreen={false}
      onBackButtonPress={() => {
        dispatch(actionCleanVideo());
      }}
    >
      <RNView style={{ flex: 1, backgroundColor: 'red', height: 300 }}>
        {/* videoLink ? (
          <Video
            source={{ uri: videoLink }}
            style={{ height: 300, width: '100%' }}
            controls
          />
        ) : (
          <Image
            source={{ uri: meta && meta.thumbnail }}
            style={{ height: 300 }}
            resizeMode="contain"
          />
        ) */}
      </RNView>
    </Modal>
  );
}

export default memo(VideoModal);
