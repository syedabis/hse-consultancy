import Link from "next/link";

export default function Footer() {
  return (
    <footer
      itemType="https://schema.org/WPFooter"
      itemScope
      id="colophon"
      role="contentinfo"
    >
      <div className="footer-width-fixer">
        <div data-elementor-type="wp-post" data-elementor-id="1276" className="elementor elementor-1276">
          <section
            className="elementor-section elementor-top-section elementor-element elementor-element-83bdf65 elementor-section-full_width elementor-section-height-default"
            data-id="83bdf65"
            data-element_type="section"
            data-settings='{"background_background":"gradient"}'
          >
            <div className="elementor-container elementor-column-gap-no">
              <div
                className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-5925f11"
                data-id="5925f11"
                data-element_type="column"
              >
                <div className="elementor-widget-wrap elementor-element-populated">
                  {/* CTA Banner Card */}
                  <div className="gasco-cta-banner-wrapper">
                    <div className="gasco-cta-banner-card">
                      <div className="gasco-cta-banner-overlay"></div>
                      <div className="gasco-cta-banner-content">
                        <h2 className="gasco-cta-banner-title">
                          Partner With Kazain for Complete HSE &amp; Risk Management Solutions
                        </h2>
                        <Link href="/contact-us/" className="gasco-cta-btn">
                          <span>CONTACT US</span>
                          <i className="flaticon flaticon-right-up"></i>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* 4 Footer Columns */}
                  <section
                    className="elementor-section elementor-inner-section elementor-element elementor-element-377ed52 elementor-section-boxed elementor-section-height-default"
                    data-id="377ed52"
                    data-element_type="section"
                  >
                    <div className="elementor-container elementor-column-gap-default">
                      {/* Column 1: Logo & About Text */}
                      <div
                        className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-8f62354"
                        data-id="8f62354"
                        data-element_type="column"
                      >
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div
                            className="elementor-element elementor-element-6f82a1a elementor-widget elementor-widget-flexitype-logo"
                            data-id="6f82a1a"
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
                          <div
                            className="elementor-element elementor-element-0f1907d elementor-widget__width-initial elementor-widget elementor-widget-heading"
                            data-id="0f1907d"
                            data-element_type="widget"
                          >
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">
                                We’re your trusted HSE &amp; Environmental Risk Advisory partner
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Address & Phone */}
                      <div
                        className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-81afc7c"
                        data-id="81afc7c"
                        data-element_type="column"
                      >
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div
                            className="elementor-element elementor-element-c757d49 elementor-widget elementor-widget-heading"
                            data-id="c757d49"
                            data-element_type="widget"
                          >
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">Address</h2>
                            </div>
                          </div>
                          <div
                            className="elementor-element elementor-element-89e5cf9 elementor-widget__width-initial elementor-widget elementor-widget-heading"
                            data-id="89e5cf9"
                            data-element_type="widget"
                          >
                            <div className="elementor-widget-container">
                              <p className="elementor-heading-title elementor-size-default">
                                <a
                                  href="https://www.google.com/maps"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Dubai, United Arab Emirates
                                </a>
                              </p>
                            </div>
                          </div>
                          <div
                            className="elementor-element elementor-element-644a745 elementor-widget elementor-widget-heading"
                            data-id="644a745"
                            data-element_type="widget"
                          >
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">
                                <a href="tel:+97145550000">+971 4 555 0000</a>
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Quick links */}
                      <div
                        className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-5d18356"
                        data-id="5d18356"
                        data-element_type="column"
                      >
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div
                            className="elementor-element elementor-element-d75549d elementor-widget elementor-widget-heading"
                            data-id="d75549d"
                            data-element_type="widget"
                          >
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">Quick links</h2>
                            </div>
                          </div>
                          <div
                            className="elementor-element elementor-element-1cc6d72 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list"
                            data-id="1cc6d72"
                            data-element_type="widget"
                          >
                            <div className="elementor-widget-container">
                              <ul className="elementor-icon-list-items">
                                <li className="elementor-icon-list-item">
                                  <Link href="/about-us/">
                                    <span className="elementor-icon-list-text">About Us</span>
                                  </Link>
                                </li>
                                <li className="elementor-icon-list-item">
                                  <Link href="/services/">
                                    <span className="elementor-icon-list-text">Services</span>
                                  </Link>
                                </li>
                                <li className="elementor-icon-list-item">
                                  <Link href="/projects/">
                                    <span className="elementor-icon-list-text">Projects</span>
                                  </Link>
                                </li>
                                <li className="elementor-icon-list-item">
                                  <Link href="/contact-us/">
                                    <span className="elementor-icon-list-text">Contact Us</span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Column 4: Support */}
                      <div
                        className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-b6f094f"
                        data-id="b6f094f"
                        data-element_type="column"
                      >
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div
                            className="elementor-element elementor-element-1af5fd6 elementor-widget elementor-widget-heading"
                            data-id="1af5fd6"
                            data-element_type="widget"
                          >
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">Support</h2>
                            </div>
                          </div>
                          <div
                            className="elementor-element elementor-element-7b22e3a elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list"
                            data-id="7b22e3a"
                            data-element_type="widget"
                          >
                            <div className="elementor-widget-container">
                              <ul className="elementor-icon-list-items">
                                <li className="elementor-icon-list-item">
                                  <Link href="/about-us/">
                                    <span className="elementor-icon-list-text">Terms &amp; Conditions</span>
                                  </Link>
                                </li>
                                <li className="elementor-icon-list-item">
                                  <Link href="/about-us/">
                                    <span className="elementor-icon-list-text">Privacy policy</span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Copyright & Social Icons Row */}
                  <section
                    className="elementor-section elementor-inner-section elementor-element elementor-element-cc678b5 elementor-section-boxed elementor-section-height-default"
                    data-id="cc678b5"
                    data-element_type="section"
                  >
                    <div className="elementor-container elementor-column-gap-default">
                      <div
                        className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-8d1d627"
                        data-id="8d1d627"
                        data-element_type="column"
                      >
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div
                            className="elementor-element elementor-element-f2d1070 elementor-widget elementor-widget-text-editor"
                            data-id="f2d1070"
                            data-element_type="widget"
                          >
                            <div className="elementor-widget-container">
                              <p>Copyright 2026 – All Rights Reserved By Kazain</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-c6fe7ad"
                        data-id="c6fe7ad"
                        data-element_type="column"
                      >
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div
                            className="elementor-element elementor-element-220097e e-grid-align-right e-grid-align-mobile-center elementor-shape-rounded elementor-grid-0 elementor-widget elementor-widget-social-icons"
                            data-id="220097e"
                            data-element_type="widget"
                          >
                            <div className="elementor-widget-container">
                              <div className="elementor-social-icons-wrapper elementor-grid" role="list">
                                <span className="elementor-grid-item" role="listitem">
                                  <a
                                    className="elementor-icon elementor-social-icon elementor-social-icon-facebook-f"
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="elementor-screen-only">Facebook</span>
                                    <i aria-hidden="true" className="fab fa-facebook-f"></i>
                                  </a>
                                </span>
                                <span className="elementor-grid-item" role="listitem">
                                  <a
                                    className="elementor-icon elementor-social-icon elementor-social-icon-x-twitter"
                                    href="https://x.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="elementor-screen-only">Twitter</span>
                                    <i aria-hidden="true" className="fab fa-x-twitter"></i>
                                  </a>
                                </span>
                                <span className="elementor-grid-item" role="listitem">
                                  <a
                                    className="elementor-icon elementor-social-icon elementor-social-icon-instagram"
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="elementor-screen-only">Instagram</span>
                                    <i aria-hidden="true" className="fab fa-instagram"></i>
                                  </a>
                                </span>
                                <span className="elementor-grid-item" role="listitem">
                                  <a
                                    className="elementor-icon elementor-social-icon elementor-social-icon-linkedin-in"
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="elementor-screen-only">LinkedIn</span>
                                    <i aria-hidden="true" className="fab fa-linkedin-in"></i>
                                  </a>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
