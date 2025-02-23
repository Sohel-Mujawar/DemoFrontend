/*eslint-disable */
import React from 'react';
import {user, userbw, golden} from '../../assets/images/user';

const textLayout = {
  vertical: {
    title: {
      textAnchor: 'start',
      x: 40,
    },
    attributes: {},
    attribute: {
      x: 40,
      dy: '1.2em',
    },
  },
  horizontal: {
    title: {
      textAnchor: 'start',
      y: 40,
    },
    attributes: {
      x: 0,
      y: 40,
    },
    attribute: {
      x: 0,
      dy: '1.2em',
    },
  },
};

const PureSvgNodeElement = ({
  nodeDatum,
  orientation,
  toggleNode,
  onNodeClick,
}) => {
  return (
    <>
      <image
        href={
          nodeDatum.attributes.IsGolden
            ? golden
            : nodeDatum.children.length
              ? user
              : userbw
        }
        width={40}
        height={40}
        onClick={toggleNode}
        style={{cursor: 'pointer'}} // Add styles as needed
        x={-20} // Adjust x and y to center the image if needed
        y={-20}
      />

      <g className="rd3t-label">
        <text
          className="rd3t-label__title"
          {...textLayout[orientation].title}
          onClick={onNodeClick}
        >
          {nodeDatum.name}
        </text>
        <text
          className="rd3t-label__attributes"
          {...textLayout[orientation].attributes}
        >
          {nodeDatum.attributes &&
            Object.entries(nodeDatum.attributes).map(
              ([labelKey, labelValue], i) => (
                <tspan
                  key={`${labelKey}-${i}`}
                  {...textLayout[orientation].attribute}
                >
                  {labelKey}: {labelValue}
                </tspan>
              ),
            )}
        </text>
      </g>
    </>
  );
};

export default PureSvgNodeElement;
