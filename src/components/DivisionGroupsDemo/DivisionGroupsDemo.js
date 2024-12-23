'use client';
import Card from '@/components/Card';
import SliderControl from '@/components/SliderControl';
import { range } from '@/utils';
import clsx from 'clsx';
import { MotionConfig } from 'framer-motion';
import React from 'react';

import { motion } from 'framer-motion';
import styles from './DivisionGroupsDemo.module.css';
import Equation from './Equation';

const SPRING = {
  type: 'spring',
  stiffness: 200,
  damping: 40,
};

function DivisionGroupsDemo({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}) {
  const [numOfGroups, setNumOfGroups] = React.useState(
    initialNumOfGroups
  );

  const numOfItemsPerGroup = Math.floor(
    numOfItems / numOfGroups
  );

  const remainder = includeRemainderArea
    ? numOfItems % numOfGroups
    : null;

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
        };

  return (
    <Card as="section" className={styles.wrapper}>
      <header className={styles.header}>
        <SliderControl
          label="Number of Groups"
          className={styles.slider}
          step={1}
          min={1}
          max={4}
          value={numOfGroups}
          onChange={(ev) =>
            setNumOfGroups(Number(ev.target.value))
          }
        />
      </header>

      <div className={styles.demoWrapper}>
        <div
          className={clsx(styles.demoArea)}
          style={gridStructure}
        >
          <MotionConfig reducedMotion="user">
          {range(numOfGroups).map((groupIndex) => (
            <motion.div key={groupIndex} className={styles.group} layout={true} transition={SPRING}>
              {range(numOfItemsPerGroup).map((index) => {
                return (
                  <motion.div
                    layout="size"
                    key={index}
                    className={styles.item}
                  />
                );
              })}
            </motion.div>
          ))}
          </MotionConfig>
        </div>
      </div>

      {includeRemainderArea && (
        <div className={styles.remainderArea}>
          <p className={styles.remainderHeading}>
            Remainder Area
          </p>

          {range(remainder).map((index) => {
            return (
              <div key={index} className={styles.item} />
            );
          })}
        </div>
      )}

      <Equation
        dividend={numOfItems}
        divisor={numOfGroups}
        remainder={remainder}
      />
    </Card>
  );
}

export default DivisionGroupsDemo;
