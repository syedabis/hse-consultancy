"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about-us/", label: "About Us" },
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Projects" },
  { href: "/our-team/", label: "Our Team" },
  { href: "/contact-us/", label: "Contact Us" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname?.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <div className="custom-header-builder flexitype-transparent-header">
      <header id="masthead" itemScope itemType="https://schema.org/WPHeader">
        <div data-elementor-type="wp-post" data-elementor-id="1275" className="elementor elementor-1275">
          <section
            className="elementor-section elementor-top-section elementor-element elementor-element-1bff562 elementor-section-boxed elementor-section-height-default"
            data-id="1bff562"
            data-element_type="section"
          >
            <div className="elementor-container elementor-column-gap-no">
              {/* Left Column: Logo */}
              <div
                className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-99b0bc4"
                data-id="99b0bc4"
                data-element_type="column"
              >
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div
                    className="elementor-element elementor-element-d6ff4ea elementor-widget__width-auto elementor-widget elementor-widget-flexitype-logo"
                    data-id="d6ff4ea"
                    data-element_type="widget"
                  >
                    <div className="elementor-widget-container">
                      <div className="flexitype-builder-logo">
                        <Link href="/" className="custom-logo-link">
                          <img src="/kazain_ventures_Logo.png" alt="Kazain Ventures Logo" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Column: Navigation Menu Pill */}
              <div
                className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-a9618a7"
                data-id="a9618a7"
                data-element_type="column"
              >
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div
                    className="elementor-element elementor-element-b57196b elementor-widget-tablet__width-auto responsive elementor-widget__width-auto elementor-widget elementor-widget-flexitype-megamenu"
                    data-id="b57196b"
                    data-element_type="widget"
                  >
                    <div className="elementor-widget-container">
                      <div className="header_mega mega-menu-main">
                        {/* Desktop Navigation Menu */}
                        <div className="header_mega-menu">
                          <div className="menu-main-menu-container">
                            <ul id="menu-main-menu" className="menu">
                              {NAV_ITEMS.map((item) => {
                                const active = isActive(item.href);
                                return (
                                  <li
                                    key={item.href}
                                    className={`menu-item menu-item-type-post_type menu-item-object-page ${
                                      active ? "current-menu-item" : ""
                                    }`}
                                  >
                                    <Link href={item.href} className="menu-link">
                                      {item.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>

                        {/* Mobile Responsive Hamburger Bar & Drawer */}
                        <div className="header_nav-menu-responsive nav_menu_popup-990">
                          <div
                            className="nav_menu_bar"
                            onClick={() => setMobileOpen(true)}
                            role="button"
                            aria-label="Open Navigation Menu"
                          >
                            <i className="flaticon flaticon-menu-3"></i>
                          </div>

                          <div className={`nav_menu_bar-popup ${mobileOpen ? "show" : ""}`}>
                            <div className="nav_menu_bar-popup-top">
                              <div className="nav_menu_bar-popup-top-logo">
                                <Link href="/" onClick={() => setMobileOpen(false)}>
                                  <img src="/kazain_ventures_Logo.png" alt="Mobile Logo" />
                                </Link>
                              </div>
                              <div
                                className="nav_menu_bar-popup-close"
                                onClick={() => setMobileOpen(false)}
                                role="button"
                                aria-label="Close Navigation Menu"
                              >
                                <i className="fal fa-times"></i>
                              </div>
                            </div>
                            <div className="vertical-menu vertical_menu-990">
                              <div className="menu-main-menu-container">
                                <ul id="mobilemenu" className="d-block">
                                  {NAV_ITEMS.map((item) => (
                                    <li
                                      key={item.href}
                                      className="menu-item menu-item-type-post_type menu-item-object-page"
                                    >
                                      <Link
                                        href={item.href}
                                        className="menu-link"
                                        onClick={() => setMobileOpen(false)}
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: CTA Button */}
              <div
                className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-9f45500 elementor-hidden-tablet elementor-hidden-mobile"
                data-id="9f45500"
                data-element_type="column"
              >
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div
                    className="elementor-element elementor-element-e1f7b0b elementor-widget__width-auto xxl-display-n elementor-widget elementor-widget-flexitype-creative-button"
                    data-id="e1f7b0b"
                    data-element_type="widget"
                  >
                    <div className="elementor-widget-container">
                      <div className="flexitype-btn">
                        <Link
                          className="flexitype-btn-wrapper button-isi right"
                          href="/contact-us/"
                          data-text="Contact Us"
                        >
                          <span>Contact Us</span>
                          <i className="flaticon flaticon-right-up"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>
    </div>
  );
}
