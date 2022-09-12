import { useEffect, useState } from 'react';
import ColoredText from '../ColoredText';

const colorClasses = {
  black: 'text-black',
};

export default function Typed({
  bold = false,
  color = 'white',
  className,
  cursor = '|',
  gradientColor = false,
  loop = false,
  loopDelay = 1000,
  texts,
  typeSpeed = 50,
}) {
  const [shownLetters, setShownLetters] = useState('');
  const [counter, setCounter] = useState(1);
  const [isWriting, setIsWriting] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShownLetters(texts[textIndex].substring(0, counter));
      isWriting ? setCounter(counter + 1) : setCounter(counter - 1);
    }, typeSpeed);

    if (counter > texts[textIndex].length && isWriting) {
      clearTimeout(timer);
      if (loop || texts.length > 1) {
        setTimeout(() => {
          setIsWriting(false);
        }, loopDelay);
      }
    }
    if (!isWriting && counter < 0) {
      clearTimeout(timer);
      setTimeout(() => {
        setTextIndex(textIndex === texts.length - 1 ? 0 : textIndex + 1);
        setIsWriting(true);
        setCounter(1);
      }, loopDelay);
    }
  }, [counter, isWriting, texts, textIndex, typeSpeed, loopDelay, loop]);

  return (
    <span
      className={
        (className ? className + ' ' : '') +
        (bold ? 'font-bold ' : '') +
        (!gradientColor ? colorClasses[color] : '')
      }
    >
      {gradientColor ? (
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
