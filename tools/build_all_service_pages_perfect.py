import os

epc_path = r"c:\Users\Administrator\.gemini\antigravity\scratch\18 - Gasco Website\content\integrated-epc-services\body.html"
with open(epc_path, "r", encoding="utf-8") as f:
    master_template = f.read()

def generate_service_body(slug, config):
    html = master_template

    # 1. Hero Title & Badge
    html = html.replace("Leading Oil &amp; Gas EPCC Contractor", config["hero_badge"])
    html = html.replace("Integrated EPCC &amp;", config["hero_h2_line1"])
    html = html.replace("Turnkey Solutions", config["hero_h2_line2"])

    # 2. Capabilities Showcase
    html = html.replace("TURNKEY EPCC CAPABILITY", config["showcase_badge"])
    html = html.replace("Pioneering Full-Scope EPC &amp; EPCC Infrastructure Delivery", config["showcase_h2"])
    html = html.replace("GASCO provides end-to-end Integrated EPC (Engineering, Procurement, Fabrication, and Construction) solutions designed to deliver seamless execution for complex oil, gas, and energy processing facilities across Pakistan.", config["showcase_p1"])
    html = html.replace("By unifying front-end engineering design (FEED), global supply chain procurement, heavy workshop skid fabrication, and field construction under a single project management entity, we eliminate client interface risks and guarantee single-point accountability.", config["showcase_p2"])
    html = html.replace("With over 35 million safe man-hours and three decades of proven turnkey delivery, GASCO delivers fast-track facilities that strictly adhere to international ASME, API 6D, and ISO 9001 quality and safety standards.", config["showcase_p3"])
    html = html.replace("Request EPC Proposal ↗", config["showcase_btn"])
    html = html.replace("/pictures/Dhok Sultan - pg 33.jpeg", config["showcase_img"])

    # 3. High Impact Statement & Stats
    old_stmt = 'At GASCO we are committed to revolutionizing the energy infrastructure sector with innovative, sustainable, and cost-effective EPCC solutions. With a proven track record of delivering exceptional projects across Pakistan, we combine <span>state-of-the-art technology</span>, <span>skilled expertise</span>, and <span>customer-centric approaches</span> to bring energy visions to life.'
    html = html.replace(old_stmt, config["statement_text"])

    html = html.replace("<h2>35M+</h2>\n          <p>Safe Man-Hours</p>", f"<h2>{config['stat1_val']}</h2>\n          <p>{config['stat1_lbl']}</p>")
    html = html.replace("<h2>50+</h2>\n          <p>Years of Excellence</p>", f"<h2>{config['stat2_val']}</h2>\n          <p>{config['stat2_lbl']}</p>")
    html = html.replace("<h2>200+</h2>\n          <p>Successful Projects</p>", f"<h2>{config['stat3_val']}</h2>\n          <p>{config['stat3_lbl']}</p>")
    html = html.replace("<h2>100%</h2>\n          <p>Safety &amp; Compliance</p>", f"<h2>{config['stat4_val']}</h2>\n          <p>{config['stat4_lbl']}</p>")

    # 4. Methodology Carousel
    html = html.replace("End-to-End Project Execution Methodology", config["carousel_head"])
    html = html.replace("Our integrated approach eliminates interface risks between engineering design, global procurement, modular shop fabrication, and field commissioning.", config["carousel_desc"])

    # Replace cards in both track loops
    epc_cards = [
        ("Engineering &amp; FEED", "Front-end engineering design, 3D piping layouts, structural calculations, process optimization, and safety hazard analyses (HAZOP)."),
        ("Strategic Procurement", "Global sourcing of certified steel pipes, high-pressure valves, compressors, and specialized equipment with expedited lead times."),
        ("Shop Fabrication", "Precision welding of pressure vessels, gas skid assemblies, and structural steel in our fully-equipped fabrication facilities."),
        ("Field Construction", "Cross-country pipeline trenching, HDD river crossings, civil foundation work, and high-pressure piping installation."),
        ("Testing &amp; Commissioning", "Hydrostatic testing, nitrogen purging, plant start-up, loop checks, and pre-commissioning performance validation."),
        ("Operations &amp; Maintenance", "Operator training, 24/7 long-term maintenance support, asset integrity management, and plant optimization.")
    ]

    for idx, (old_h4, old_p) in enumerate(epc_cards):
        num, new_h4, new_p = config["cards"][idx]
        # Replace occurrences in set 1 and duplicate set 2
        html = html.replace(f"<h4>{old_h4}</h4>\n            <p>{old_p}</p>", f"<h4>{new_h4}</h4>\n            <p>{new_p}</p>")
        html = html.replace(f"<h4>{old_h4}</h4>\n            <p>{old_p}</p>", f"<h4>{new_h4}</h4>\n            <p>{new_p}</p>")

    # 5. Featured Projects
    html = html.replace("Featured EPCC Projects", config["projects_head"])

    # Card 1
    html = html.replace('<img src="/pictures/Pg 16.jpeg" alt="Makori Gas Facility">', f'<img src="{config["proj1"][0]}" alt="{config["proj1"][2]}">')
    html = html.replace('<span class="epc-proj-tag">MOL Pakistan</span>', f'<span class="epc-proj-tag">{config["proj1"][1]}</span>')
    html = html.replace('<h4>Central Front-End Compression Facility</h4>', f'<h4>{config["proj1"][2]}</h4>')
    html = html.replace('<p>Turnkey EPCC for high-pressure gas boosting compressors, gas coolers, and inlet manifolds at Makori Field.</p>', f'<p>{config["proj1"][3]}</p>')

    # Card 2
    html = html.replace('<img src="/pictures/HTDC Project pg 31.jpeg" alt="Adhi Gas Sweetening Unit">', f'<img src="{config["proj2"][0]}" alt="{config["proj2"][2]}">')
    html = html.replace('<span class="epc-proj-tag">PPL (Pakistan Petroleum)</span>', f'<span class="epc-proj-tag">{config["proj2"][1]}</span>')
    html = html.replace('<h4>Gas Sweetening &amp; Turbo Compressor Package</h4>', f'<h4>{config["proj2"][2]}</h4>')
    html = html.replace('<p>Engineering and fabrication of amine sweetening absorbers and high-efficiency turbo compressor skids.</p>', f'<p>{config["proj2"][3]}</p>')

    # Card 3
    html = html.replace('<img src="/pictures/Dhok Sultan - pg 33.jpeg" alt="Mari Gas Pressure Boosting Station">', f'<img src="{config["proj3"][0]}" alt="{config["proj3"][2]}">')
    html = html.replace('<span class="epc-proj-tag">Mari Petroleum (MPCL)</span>', f'<span class="epc-proj-tag">{config["proj3"][1]}</span>')
    html = html.replace('<h4>Gas Pressure Boosting Compressor Station</h4>', f'<h4>{config["proj3"][2]}</h4>')
    html = html.replace('<p>Fast-track EPCC of field booster station, dehydration units, and high-pressure transmission piping.</p>', f'<p>{config["proj3"][3]}</p>')

    target = f"c:\\Users\\Administrator\\.gemini\\antigravity\\scratch\\18 - Gasco Website\\content\\{slug}\\body.html"
    with open(target, "w", encoding="utf-8") as out:
        out.write(html)
    print(f"Generated {slug}/body.html successfully.")

configs = {
    "engineering-consultancy": {
        "hero_badge": "Leading Oil &amp; Gas Engineering Partner",
        "hero_h2_line1": "ENGINEERING &amp;",
        "hero_h2_line2": "Consultancy",
        "showcase_badge": "FULL-SERVICE DESIGN DEPARTMENT",
        "showcase_h2": "Front-End &amp; Detailed Engineering Design Solutions",
        "showcase_p1": "GASCO offers an extensive range of engineering disciplines, backed by a full-service design department implementing state-of-the-art technology.",
        "showcase_p2": "From initial concept and Front-End Engineering Design (FEED) to detailed mechanical, piping, electrical, instrumentation, and civil engineering packages, our multidisciplinary team delivers precision and compliance.",
        "showcase_p3": "Our engineers strictly follow ASME, API, and ISO standards to optimize facility efficiency, minimize design risks, and streamline field construction.",
        "showcase_btn": "Request Engineering Proposal ↗",
        "showcase_img": "/pictures/Page 18.jpeg",
        "statement_text": "At GASCO, our engineering and design department provides world-class technical consultancy and detailed engineering packages tailored to Pakistan's energy infrastructure. We combine <span>cutting-edge software</span>, <span>experienced multidisciplinary engineers</span>, and <span>rigorous industry standards</span> to turn complex engineering challenges into efficient, buildable solutions.",
        "stat1_val": "30+", "stat1_lbl": "Years Engineering",
        "stat2_val": "100+", "stat2_lbl": "Detailed Design Packages",
        "stat3_val": "100%", "stat3_lbl": "ASME &amp; API Compliance",
        "stat4_val": "24/7", "stat4_lbl": "Technical Support",
        "carousel_head": "Engineering &amp; Design Methodology",
        "carousel_desc": "Our structured engineering workflow spans concept evaluation through detailed design verification and construction support.",
        "cards": [
            ("01", "Concept &amp; Feasibility", "Initial site evaluation, flow assurance, and techno-economic feasibility studies for oil &amp; gas facilities."),
            ("02", "FEED &amp; Process Design", "Front-end engineering design, PFDs, P&amp;IDs, process simulations, and material selection."),
            ("03", "Detailed Mechanical &amp; Piping", "3D plant modeling, stress analysis, vessel sizing, and construction isometric drafting."),
            ("04", "Electrical &amp; Instrumentation", "Control philosophy, SCADA architecture, PLC programming, safety interlocks, and cable routing."),
            ("05", "Safety &amp; HAZOP Studies", "Hazard and operability (HAZOP) analysis, QRA, and Safety Instrumented System (SIS) design."),
            ("06", "Design Verification", "Final design validation, third-party code compliance audit, and site engineering support.")
        ],
        "projects_head": "Featured Engineering Projects",
        "proj1": ("/pictures/Pg 16.jpeg", "MOL Pakistan", "Central Compression FEED &amp; Engineering", "Front-end engineering design and 3D piping layouts for Makori Central Compression Facility."),
        "proj2": ("/pictures/HTDC Project pg 31.jpeg", "PPL (Pakistan Petroleum)", "Amine Sweetening Unit Detailed Design", "Detailed mechanical engineering and stress analysis for high-pressure gas sweetening absorber column."),
        "proj3": ("/pictures/Dhok Sultan - pg 33.jpeg", "Mari Petroleum (MPCL)", "Gas Booster Station Piping &amp; E&amp;I Design", "Comprehensive electrical, instrumentation, and piping stress analysis for field booster compressor skids.")
    },
    "pipeline-construction": {
        "hero_badge": "Premier Pipeline Construction Contractor",
        "hero_h2_line1": "PIPELINE",
        "hero_h2_line2": "Construction",
        "showcase_badge": "TURNKEY PIPELINE INFRASTRUCTURE",
        "showcase_h2": "High-Pressure Cross-Country &amp; Field Pipeline Delivery",
        "showcase_p1": "GASCO is determined to be Pakistan's premier pipeline construction and maintenance company, serving the pipeline industry with the utmost regard for safety and environmental protection.",
        "showcase_p2": "We handle high-pressure steel trunklines, wellhead gathering networks, and sales gas pipelines ranging from small diameter flowlines to large diameter main transmission pipelines.",
        "showcase_p3": "Equipped with specialized welding rigs, automatic NDT inspection equipment, and heavy trenching machinery, our team executes fast-track pipeline projects across complex terrains and HDD water crossings.",
        "showcase_btn": "Request Pipeline Proposal ↗",
        "showcase_img": "/pictures/SSGC_42_RLNG_80_Kms_Pipeline_Project_pg_37.jpg",
        "statement_text": "GASCO delivers resilient, high-integrity pipeline networks that safely connect gas fields to national transmission grids. Upholding the highest HSE standards, we integrate <span>advanced welding technology</span>, <span>rigorous NDT inspection</span>, and <span>environmental stewardship</span> to ensure long-term pipeline asset integrity.",
        "stat1_val": "500+", "stat1_lbl": "KM Pipelines Laid",
        "stat2_val": "30+", "stat2_lbl": "Cross-Country Lines",
        "stat3_val": "100%", "stat3_lbl": "NDT Weld Quality",
        "stat4_val": "Zero", "stat4_lbl": "LTI Incidents",
        "carousel_head": "Pipeline Construction Methodology",
        "carousel_desc": "Our disciplined pipeline execution methodology ensures rapid, safe, and code-compliant installation.",
        "cards": [
            ("01", "Route Survey &amp; ROW", "Topographical survey, soil resistivity testing, land clearing, and Right-of-Way (ROW) grading."),
            ("02", "Trenching &amp; Excavation", "Precision trenching, rock blasting, and soft padding preparation for pipe lowering."),
            ("03", "Stringing &amp; Bending", "Pipe hauling, stringing along the ROW, and field cold bending to match terrain contours."),
            ("04", "Welding &amp; NDT Inspection", "API 1104 qualified manual and semi-automatic welding with 100% Radiographic &amp; Ultrasonic testing."),
            ("05", "Coating &amp; Lowering-In", "Field joint heat-shrink sleeve application, holiday testing, trench padding, and pipe lowering."),
            ("06", "Hydrotest &amp; Tie-In", "Hydrostatic pressure testing, dewatering, vacuum drying, final hot tie-ins, and commissioning.")
        ],
        "projects_head": "Featured Pipeline Projects",
        "proj1": ("/pictures/RDMC - Water Piprline - pg 29.jpeg", "PGNIG", "Rizq-2, Rehman-4 &amp; Rehman-5 Lines", "High-pressure gas gathering pipelines connecting multiple wellheads to the central processing facility."),
        "proj2": ("/pictures/Shewa Relocation - pg 32.jpeg", "MOL Pakistan", "Makori High-Pressure Gas Loopline", "Fast-track cross-country steel pipeline installation including HDD river crossing and valve stations."),
        "proj3": ("/pictures/SSGC_42_RLNG_80_Kms_Pipeline_Project_pg_37.jpg", "Mari Petroleum (MPCL)", "Field Booster Interconnecting Network", "Large-diameter gathering network tie-in connecting booster compressors to the main transmission line.")
    },
    "rental-compression-production": {
        "hero_badge": "Flexible Rental Compression &amp; Production Fleet",
        "hero_h2_line1": "RENTAL COMPRESSION &amp;",
        "hero_h2_line2": "Production",
        "showcase_badge": "MODULAR COMPRESSION FLEET",
        "showcase_h2": "Zero CAPEX Gas Compression &amp; Production Equipment",
        "showcase_p1": "GASCO maintains a diverse fleet of gas compression and production equipment available under flexible rental, operating lease, or rent-to-purchase plans.",
        "showcase_p2": "Our mobile compression fleet enables operators to boost wellhead pressures, extend depleted field life, and increase sales gas volumes without heavy upfront capital investments.",
        "showcase_p3": "Every compression package is pre-engineered, factory-tested, skid-mounted, and supported by 24/7 on-site operations and maintenance technicians to ensure optimal uptime.",
        "showcase_btn": "Explore Rental Fleet ↗",
        "showcase_img": "/pictures/Dehydration unit pg 36.jpg",
        "statement_text": "GASCO provides fast-deployable compression solutions tailored to changing reservoir dynamics. Our rental fleet offers <span>flexible commercial terms</span>, <span>rapid field deployment</span>, and <span>guaranteed uptime</span>, empowering operators to maximize production economics with zero capital risk.",
        "stat1_val": "50+", "stat1_lbl": "Mobile Compressor Skids",
        "stat2_val": "98%+", "stat2_lbl": "Fleet Availability",
        "stat3_val": "48h", "stat3_lbl": "Rapid Site Hookup",
        "stat4_val": "24/7", "stat4_lbl": "Field Ops &amp; Spares",
        "carousel_head": "Rental Compression Deployment Process",
        "carousel_desc": "From wellhead parameter analysis to ongoing field maintenance, our rental process guarantees seamless gas boosting.",
        "cards": [
            ("01", "Well Parameter Analysis", "Evaluating wellhead suction pressure, discharge pressure, flow rates, and gas composition."),
            ("02", "Package Selection &amp; Sizing", "Matching driver horsepower and compressor stage cylinder configuration to field requirements."),
            ("03", "Transport &amp; Mobilization", "Heavy transport of skid-mounted package directly to wellhead location."),
            ("04", "Site Hookup &amp; Piping", "Connecting inlet separators, fuel gas lines, discharge manifolds, and flare systems."),
            ("05", "Pre-Commissioning &amp; Test", "Field alignment checks, lube oil flushing, safety shutdown testing, and load trial."),
            ("06", "24/7 O&amp;M &amp; Monitoring", "Continuous on-site operator coverage, daily telemetry monitoring, and preventive maintenance.")
        ],
        "projects_head": "Featured Compression Projects",
        "proj1": ("/pictures/Pg 16.jpeg", "Engro Fertilizers", "3 x 7,950 HP Gas Compression Package", "High-capacity rental compression station delivering 150 MMSCFD gas boosting for fertilizer feed."),
        "proj2": ("/pictures/HTDC Project pg 31.jpeg", "Eni Pakistan", "Bhit Wellhead Booster Compression", "Wellhead pressure boosting compression package extending economic field production."),
        "proj3": ("/pictures/Dehydration unit pg 36.jpg", "OMV Pakistan", "Miano 18 Low-Pressure Boosting Skid", "Skid-mounted gas compressor package boosting low-pressure well gas into main gathering header.")
    },
    "outsource-warehousing": {
        "hero_badge": "Secure Industrial Warehousing &amp; Logistics",
        "hero_h2_line1": "OUTSOURCE",
        "hero_h2_line2": "Warehousing",
        "showcase_badge": "PROFESSIONALLY MANAGED STORAGE",
        "showcase_h2": "Dedicated Industrial Storage &amp; Supply Chain Logistics",
        "showcase_p1": "GASCO offers dedicated outsource warehousing services trusted by multinational energy and industrial companies operating across Pakistan.",
        "showcase_p2": "We provide secure indoor climate-controlled storage and heavy-duty outdoor yards designed for critical spare parts, line pipes, valves, instrumentation, and heavy machinery.",
        "showcase_p3": "Utilizing real-time inventory management software, nitrogen purging preservation protocols, and 24/7 security, we protect high-value assets and streamline client supply chains.",
        "showcase_btn": "Request Storage Quote ↗",
        "showcase_img": "/pictures/Page 32.jpeg",
        "statement_text": "GASCO provides comprehensive industrial warehousing solutions that minimize inventory loss and reduce client overhead. Combining <span>state-of-the-art storage infrastructure</span>, <span>rigorous asset preservation</span>, and <span>integrated ERP tracking</span>, we safeguard critical energy sector inventory nationwide.",
        "stat1_val": "100k+", "stat1_lbl": "SQ.FT Storage Capacity",
        "stat2_val": "100%", "stat2_lbl": "Preservation Integrity",
        "stat3_val": "24/7", "stat3_lbl": "CCTV &amp; Physical Guard",
        "stat4_val": "Real-Time", "stat4_lbl": "ERP Stock Tracking",
        "carousel_head": "Outsource Warehousing Workflow",
        "carousel_desc": "Our systematic warehousing workflow ensures complete traceability and asset protection from intake to site delivery.",
        "cards": [
            ("01", "Inbound Intake &amp; QC", "Physical material receiving, quantity check, mill certificate verification, and damage inspection."),
            ("02", "Barcoding &amp; ERP Sync", "Item serialization, QR barcoding, and real-time integration into client inventory management ERP."),
            ("03", "Indoor &amp; Outdoor Storage", "Shelved storage for delicate electronics/spares and heavy-duty concrete yard for pipes &amp; valves."),
            ("04", "Asset Preservation", "Regular nitrogen purging, anti-corrosion coating, rotation of bearings, and desiccant management."),
            ("05", "Order Pick &amp; Kitting", "Fast-track material picking, custom project kitting, and protective crating for field shipment."),
            ("06", "Hot-Shot Site Logistics", "Express dispatch and secure transport direct to onshore drilling rigs and plant sites.")
        ],
        "projects_head": "Featured Warehousing Hubs",
        "proj1": ("/pictures/Page 32.jpeg", "Multinational E&P", "Central Oilfield Materials Storage Hub", "Turnkey management of major multinational E&P spare parts inventory and drilling consumables."),
        "proj2": ("/pictures/Pg 2.jpeg", "GASCO Operations", "Heavy Machinery &amp; Valve Preservation Yard", "Specialized preservation yard for high-pressure control valves, turbines, and compressor spares."),
        "proj3": ("/pictures/pg 21.jpeg", "Pipeline Division", "Line Pipe &amp; Heavy Fitting Depot", "Dedicated outdoor pipe storage depot with 24/7 crane handling and protective coating maintenance.")
    },
    "operations-maintenance": {
        "hero_badge": "Specialized Operations &amp; Maintenance Provider",
        "hero_h2_line1": "OPERATIONS &amp;",
        "hero_h2_line2": "Maintenance",
        "showcase_badge": "PROVEN O&amp;M EXCELLENCE",
        "showcase_h2": "24/7 Plant Operations &amp; Annual Turnaround Services",
        "showcase_p1": "GASCO Operations is active across every region of Pakistan, offering a team of highly trained specialists to manage, operate, and maintain customer facilities.",
        "showcase_p2": "With an availability and uptime guarantee of 98% and above, we handle routine gas plant operations, preventive maintenance, condition monitoring, and major annual turnarounds (TAR).",
        "showcase_p3": "Our O&M team brings over 14 years of field experience operating gas processing plants, sweetening units, compressor stations, and power generation skids.",
        "showcase_btn": "Request O&M Proposal ↗",
        "showcase_img": "/pictures/Dhok Sultan - pg 33.jpeg",
        "statement_text": "GASCO ensures maximum plant productivity and equipment longevity through disciplined facility operations and predictive maintenance. Backed by <span>certified plant engineers</span>, <span>98%+ guaranteed availability</span>, and <span>uncompromising safety protocols</span>, we optimize facility lifecycle performance.",
        "stat1_val": "98%+", "stat1_lbl": "Plant Uptime Guarantee",
        "stat2_val": "14+", "stat2_lbl": "Years O&M Track Record",
        "stat3_val": "35M+", "stat3_lbl": "Safe Operating Hours",
        "stat4_val": "24/7", "stat4_lbl": "Field Emergency Support",
        "carousel_head": "Operations &amp; Maintenance Methodology",
        "carousel_desc": "Our lifecycle facility management methodology guarantees continuous uptime, process safety, and peak performance.",
        "cards": [
            ("01", "Handover &amp; SOP Creation", "Comprehensive plant health audit, baseline condition assessment, and standard operating procedure setup."),
            ("02", "Continuous Plant Operations", "24/7 shift operator coverage, DCS/SCADA parameter tracking, process logging, and throughput optimization."),
            ("03", "Preventive Maintenance", "Scheduled lube oil filter replacement, seal inspections, valve testing, and calibration."),
            ("04", "Predictive Condition Audit", "Vibration analysis, thermographic imaging, oil degradation testing, and dynamic alignment checks."),
            ("05", "Annual Turnaround (TAR)", "Turnkey shutdown management, vessel decoking, heat exchanger bundle cleaning, and valve overhaul."),
            ("06", "Emergency Field Support", "Rapid 24/7 technical dispatch, root-cause failure analysis, and immediate OEM spare replacement.")
        ],
        "projects_head": "Featured O&M Projects",
        "proj1": ("/pictures/Dhok Sultan - pg 33.jpeg", "PPL (Pakistan Petroleum)", "HRL Compressor Revamp &amp; Turnaround", "Major overhaul and annual turnaround execution for Kandhkot gas field compressor package."),
        "proj2": ("/pictures/Pg 16.jpeg", "MOL Pakistan", "Makori Gas Plant Long-Term O&M", "Long-term facility operations and routine maintenance contract maintaining 98%+ plant availability."),
        "proj3": ("/pictures/Jhal Magsi Development Project  pg 30.jpeg", "Mari Petroleum (MPCL)", "Field Booster Station Maintenance", "24/7 operation and predictive maintenance of gas pressure boosting compressor stations.")
    }
}

for slug, cfg in configs.items():
    generate_service_body(slug, cfg)

print("All 5 service pages regenerated cleanly.")
