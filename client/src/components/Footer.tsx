import Link from "next/link"
import React from "react"

const Footer = () => {
  return (
    <div className="footer">
      <p className="">&copy; 2024 COURSENOVA. All Right Reserved.</p>
      <div className="footer__links">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="footer__link"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Footer
