// src/components/VirtualizedResults.jsx
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import './VirtualizedResults.css';

const VirtualizedResults = ({ emails }) => (
  <div className="virtualized-results">
    {emails.length > 0 ? (
      <List
        height={400}
        itemCount={emails.length}
        itemSize={35}
        width={'100%'}
      >
        {({ index, style }) => (
          <div style={style} className="virtualized-item">
            {emails[index]}
          </div>
        )}
      </List>
    ) : (
      <p>No email variations generated yet.</p>
    )}
  </div>
);

export default VirtualizedResults;
