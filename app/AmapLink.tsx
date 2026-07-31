"use client";

import type {
  AnchorHTMLAttributes,
  MouseEvent as ReactMouseEvent,
} from "react";

type AmapLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  wechatHref: string;
};

export function AmapLink({
  children,
  onClick,
  wechatHref,
  ...props
}: AmapLinkProps) {
  function handleClick(event: ReactMouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (/MicroMessenger/i.test(navigator.userAgent)) {
      event.preventDefault();
      window.location.assign(wechatHref);
    }
  }

  return (
    <a
      {...props}
      data-wechat-href={wechatHref}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
