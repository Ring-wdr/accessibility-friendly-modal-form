const focusableTags = ["INPUT", "SELECT", "TEXTAREA", "BUTTON", "A", "IFRAME"];

export function isFocusable(
  el: HTMLElement | null
): el is HTMLElement & { focus: () => void } {
  if (!el) return false;

  if (Reflect.get(el, "disabled") || el.hidden) return false;
  if (el.offsetParent === null && getComputedStyle(el).position !== "fixed")
    return false;
  if (getComputedStyle(el).visibility === "hidden") return false;

  if (focusableTags.includes(el.tagName)) {
    if (el instanceof HTMLLinkElement) return !!el.href && el.rel !== "ignore";
    return !Reflect.get(el, "disabled");
  }

  if (el.hasAttribute("contenteditable")) return true;

  const tabIndex = el.getAttribute("tabindex");
  return tabIndex !== null && !isNaN(Number(tabIndex));
}
