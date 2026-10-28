import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="C++ Lab 首頁">
      <span className="brand-mark" aria-hidden="true">
        C++
      </span>
      <span className="brand-name">C++ Lab</span>
    </Link>
  );
}
