import React, { memo } from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import { Text } from 'components';

function EmptyCard() {
  return (
    <Card
      style={{ padding: 40, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={{ textAlign: 'center' }} body1>
        {`There's nothing here.
      Try to login...`}
      </Text>
    </Card>
  );
}

export default memo(EmptyCard);
