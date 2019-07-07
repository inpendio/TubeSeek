import React, { memo } from 'react';
import { View } from 'react-native';
import { Accordion, TextBlock } from 'components';

function Description({ title, description }) {
  return (
    <Accordion title={title}>
      {<View>{description && <TextBlock data={description} />}</View>}
    </Accordion>
  );
}

export default memo(Description);
