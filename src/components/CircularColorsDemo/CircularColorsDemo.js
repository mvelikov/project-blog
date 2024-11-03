'use client';
import clsx from 'clsx';
import React from 'react';
import {
  Pause,
  Play,
  RotateCcw
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const ref = React.useRef(0);
  const [timeElapsed, setTimeElapsed] = React.useState(ref.current);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (!started) return

    const interval = setInterval(() => {
      setTimeElapsed(ref.current++)
    }, 1000)
    return () => clearInterval(interval)
  }, [started])

  function handleClick() {
    setTimeElapsed(ref.current++)
    setStarted(started => !started)
  }

  function resetCounter() {
    ref.current = 0
    setTimeElapsed(0)
  }
  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <div
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button>
            {started ? <Pause onClick={handleClick} /> : <Play onClick={handleClick} />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button>
            <RotateCcw onClick={resetCounter} />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
