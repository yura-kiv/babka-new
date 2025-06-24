import { useCallback, useRef } from 'react';

interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  offset?: number;
}

const useScroll = () => {
  const elementsRef = useRef<Record<string, HTMLElement | null>>({});

  const registerElement = useCallback(
    (key: string, element: HTMLElement | null) => {
      if (element) {
        elementsRef.current[key] = element;
      }
    },
    []
  );

  const scrollToElement = useCallback(
    (element: HTMLElement | null, options: ScrollOptions = {}) => {
      if (!element) return;

      const {
        behavior = 'smooth',
        block = 'start',
        inline = 'nearest',
        offset = 0,
      } = options;

      try {
        if (offset) {
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior,
          });
        } else {
          element.scrollIntoView({
            behavior,
            block,
            inline,
          });
        }
      } catch (error) {
        console.error('Error scrolling to element:', error);
      }
    },
    []
  );

  const scrollToRegisteredElement = useCallback(
    (key: string, options: ScrollOptions = {}) => {
      const element = elementsRef.current[key];
      scrollToElement(element, options);
    },
    [scrollToElement]
  );

  const scrollToId = useCallback(
    (id: string, options: ScrollOptions = {}) => {
      const element = document.getElementById(id);
      scrollToElement(element, options);
    },
    [scrollToElement]
  );

  const scrollToPosition = useCallback(
    (x: number, y: number, behavior: ScrollBehavior = 'smooth') => {
      window.scrollTo({
        left: x,
        top: y,
        behavior,
      });
    },
    []
  );

  const scrollToTop = useCallback((behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior,
    });
  }, []);

  return {
    registerElement,
    scrollToElement,
    scrollToRegisteredElement,
    scrollToId,
    scrollToPosition,
    scrollToTop,
    scrollToBottom,
  };
};

export default useScroll;
