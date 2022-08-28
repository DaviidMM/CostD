import { useEffect, useState } from 'react';
import ColoredText from '../ColoredText';

export default function Typed({
  bold = false,
  colored = false,
  color = 'orange',
  cursor = '|',
  loop = false,
  loopDelay = 1000,
  text,
  typeSpeed = 50,
}) {
  const [shownLetters, setShownLetters] = useState('');
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShownLetters(text.substring(0, counter));
      setCounter(counter + 1);
    }, typeSpeed);

    if (counter > text.length) {
      clearTimeout(timer);
      if (loop) {
        setTimeout(() => {
          setCounter(1);
        }, loopDelay);
      }
    }
  }, [counter, text, typeSpeed, loopDelay, loop]);

  return (
    <span className={bold ? 'font-bold' : ''}>
      {colored ? (
        <ColoredText color={color}>{shownLetters}</ColoredText>
      ) : (
        shownLetters
      )}
      {cursor ? (
        <span className="transition-none animate-blink">{cursor}</span>
      ) : (
        ''
      )}
    </span>
  );
}
