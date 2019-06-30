import React, { memo } from 'react';
import { Card } from 'react-native-elements';
import { Text } from 'components';

const DEFAULT = `There's nothing here.
Try to login or stuff is just loading so wait a bit...`;

function EmptyCard({ text = DEFAULT }) {
  return (
    <Card
      style={{ padding: 40, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={{ textAlign: 'center' }} body1>
        {text}
      </Text>
    </Card>
  );
}

export default memo(EmptyCard);
