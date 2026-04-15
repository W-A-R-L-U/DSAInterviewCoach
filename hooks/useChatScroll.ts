import { useEffect, useRef } from "react";

/**
 * Attach the returned ref to your scrollable messages container.
 * Whenever `trigger` changes (e.g. messages array, loading flag),
 * the container is instantly scrolled to its bottom.
 *
 * Usage:
 *   const scrollRef = useChatScroll(messages);
 *   <div ref={scrollRef} className="overflow-y-auto ...">
 *     {messages.map(...)}
 *   </div>
 */
export function useChatScroll<T>(trigger: T) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // requestAnimationFrame ensures the new message node is painted
    // before we measure scrollHeight, so we always land at the true bottom.
    const raf = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });

    return () => cancelAnimationFrame(raf);
  }, [trigger]);

  return ref;
}