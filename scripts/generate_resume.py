#!/usr/bin/env python3
"""Generate the public, employer-facing resume linked from the site."""

from __future__ import annotations

import shutil
from pathlib import Path
from xml.sax.saxutils import escape

from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "resume.pdf"
ARCHIVE_OUTPUT = ROOT / "output" / "pdf" / "Christopher-Brown-Resume.pdf"

FOREST = colors.HexColor("#153C32")
RUST = colors.HexColor("#8F3929")
INK = colors.HexColor("#1C2B26")
MUTED = colors.HexColor("#52605B")
LINE = colors.HexColor("#D5CEC3")
PAPER = colors.HexColor("#FBF8F2")

PAGE_WIDTH, PAGE_HEIGHT = LETTER
LEFT = 0.58 * inch
RIGHT = 0.58 * inch
TOP = 0.50 * inch
BOTTOM = 0.48 * inch


styles = getSampleStyleSheet()

NAME = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=22,
    leading=24,
    textColor=FOREST,
    spaceAfter=2,
)

SUBTITLE = ParagraphStyle(
    "Subtitle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10.4,
    leading=13,
    textColor=RUST,
    spaceAfter=4,
)

CONTACT = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=10.5,
    textColor=MUTED,
    spaceAfter=7,
)

SECTION = ParagraphStyle(
    "Section",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.3,
    leading=12,
    textColor=RUST,
    tracking=0.5,
    spaceBefore=5,
    spaceAfter=4,
)

BODY = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.0,
    leading=11.7,
    textColor=INK,
    spaceAfter=3,
)

BODY_SMALL = ParagraphStyle(
    "BodySmall",
    parent=BODY,
    fontSize=8.5,
    leading=10.9,
)

BULLET = ParagraphStyle(
    "Bullet",
    parent=BODY,
    leftIndent=10,
    firstLineIndent=-8,
    spaceAfter=2.3,
)

ROLE = ParagraphStyle(
    "Role",
    parent=BODY,
    fontName="Helvetica-Bold",
    fontSize=9.4,
    leading=11.5,
    textColor=FOREST,
)

COMPANY = ParagraphStyle(
    "Company",
    parent=BODY,
    fontName="Helvetica-Bold",
    fontSize=9.0,
    leading=11.5,
    textColor=INK,
)

DATE = ParagraphStyle(
    "Date",
    parent=BODY,
    fontName="Helvetica-Bold",
    fontSize=8.0,
    leading=10,
    alignment=TA_RIGHT,
    textColor=MUTED,
)

FOOTER = ParagraphStyle(
    "Footer",
    parent=BODY,
    fontSize=7.5,
    leading=9,
    textColor=MUTED,
)


def section(title: str):
    return [
        Spacer(1, 4),
        Paragraph(escape(title.upper()), SECTION),
        HRFlowable(width="100%", thickness=0.6, color=LINE, spaceBefore=0, spaceAfter=5),
    ]


def role_header(role: str, company: str, dates: str):
    table = Table(
        [[Paragraph(escape(role), ROLE), Paragraph(escape(dates), DATE)], [Paragraph(escape(company), COMPANY), ""]],
        colWidths=[5.55 * inch, 1.25 * inch],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("SPAN", (1, 0), (1, 1)),
            ]
        )
    )
    return table


def role_block(role: str, company: str, dates: str, bullets: list[str]):
    first = [role_header(role, company, dates), Spacer(1, 3), Paragraph(f"- {escape(bullets[0])}", BULLET)]
    flowables = [KeepTogether(first)]
    flowables.extend(Paragraph(f"- {escape(bullet)}", BULLET) for bullet in bullets[1:])
    flowables.append(Spacer(1, 5))
    return flowables


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(LEFT, 0.34 * inch, PAGE_WIDTH - RIGHT, 0.34 * inch)
    canvas.setFont("Helvetica", 7.3)
    canvas.setFillColor(MUTED)
    canvas.drawString(LEFT, 0.19 * inch, "Christopher Brown | christopherbrown.io")
    canvas.drawRightString(PAGE_WIDTH - RIGHT, 0.19 * inch, f"Page {doc.page}")
    canvas.restoreState()


def add_accessibility_metadata(path: Path):
    """Add document language and predictable row-order tab metadata."""
    reader = PdfReader(path)
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    writer._root_object[NameObject("/Lang")] = TextStringObject("en-US")
    for page in writer.pages:
        page[NameObject("/Tabs")] = NameObject("/R")

    temporary = path.with_suffix(".tmp.pdf")
    with temporary.open("wb") as handle:
        writer.write(handle)
    temporary.replace(path)


def build_story():
    story = []

    story.append(Paragraph("CHRISTOPHER BROWN", NAME))
    story.append(Paragraph("ENTERPRISE CUSTOMER ENGINEERING &amp; POST-SALES OPERATIONS LEADER", SUBTITLE))
    story.append(
        Paragraph(
            'Alexandria, VA&nbsp;&nbsp;|&nbsp;&nbsp;'
            '<link href="mailto:hello@christopherbrown.io">hello@christopherbrown.io</link>&nbsp;&nbsp;|&nbsp;&nbsp;'
            '<link href="https://www.linkedin.com/in/christopherrbrown3/">linkedin.com/in/christopherrbrown3</link>&nbsp;&nbsp;|&nbsp;&nbsp;'
            '<link href="https://christopherbrown.io/">christopherbrown.io</link>',
            CONTACT,
        )
    )
    story.append(HRFlowable(width="100%", thickness=2.2, color=FOREST, spaceBefore=0, spaceAfter=7))

    story.extend(section("Executive Summary"))
    story.append(
        Paragraph(
            "Enterprise customer engineering and post-sales operations leader with 15+ years across AWS and consulting. "
            "Leads strategic-account teams, applied-AI workflows, incident and service-improvement mechanisms, and talent systems "
            "in complex global environments. Translates technical risk into clear executive decisions and repeatable operating practices.",
            BODY,
        )
    )

    story.extend(section("Selected Impact"))
    story.append(
        Paragraph(
            "15+ years enterprise technology&nbsp;&nbsp;|&nbsp;&nbsp;TAM organization scaled from 7 to 30+&nbsp;&nbsp;|&nbsp;&nbsp;"
            "LLM tools used by thousands&nbsp;&nbsp;|&nbsp;&nbsp;Hundreds trained in applied AI&nbsp;&nbsp;|&nbsp;&nbsp;2 issued U.S. patents",
            BODY_SMALL,
        )
    )

    story.extend(section("Core Strengths"))
    story.append(
        Paragraph(
            "Enterprise Customer Engineering; Post-Sales Operations; Strategic Accounts; Technical Account Management; "
            "Executive Stakeholder Management; Incident and Escalation Governance; AI-Enabled Support Operations; "
            "Cloud Transformation; Organizational Scaling; Talent Development; Executive Communication; Cross-Functional Leadership",
            BODY_SMALL,
        )
    )

    story.extend(section("Professional Experience"))
    story.extend(
        role_block(
            "Enterprise Support Manager - Strategic Accounts",
            "Amazon Web Services (AWS)",
            "Nov 2021 - Present",
            [
                "Lead post-sales teams and support operations in a complex global strategic-account environment; helped scale the TAM organization from 7 to 30+.",
                "Led a cross-company support transformation that aligned customer-success leaders with AWS incident-management practices, tooling, and governance, improving post-incident review speed and quality.",
                "Designed and oversaw LLM-powered tools used by thousands of employees for case synthesis, issue triage, and executive reporting; trained hundreds on prompt design and responsible workflow integration.",
                "Coached and supported the promotion of the organization's first Principal-level specialist and created a structured readiness path for individual contributors moving into management.",
                "Partner with Sales, Solutions Architecture, Product, and service leaders to align customer outcomes, risk decisions, and delivery plans during high-stakes escalations.",
            ],
        )
    )
    story.extend(
        role_block(
            "Enterprise Support Lead",
            "Amazon Web Services (AWS)",
            "Dec 2020 - Nov 2021",
            [
                "Set the vision and operating cadence for a cross-functional TAM organization supporting mission-critical enterprise workloads through sustained disruption.",
                "Developed executive reports for customer health, business risk, and technical escalations and piloted support mechanisms that scaled across the organization.",
            ],
        )
    )
    story.extend(
        role_block(
            "Senior Technical Account Manager",
            "Amazon Web Services (AWS)",
            "Dec 2018 - Dec 2020",
            [
                "Advised senior leaders through a managed-service-to-SaaS transformation, balancing modernization goals with reliability and customer experience.",
                "Led cloud operations reviews and coordinated maintenance, dependency, capacity, and API strategies across interconnected products.",
            ],
        )
    )

    story.append(PageBreak())
    story.extend(section("AWS Experience - Continued"))

    story.extend(
        role_block(
            "Technical Account Manager",
            "Amazon Web Services (AWS)",
            "Sep 2016 - Nov 2018",
            [
                "Provided operational and architectural guidance for large global cloud environments and translated technical risk into executive-ready plans.",
                "Partnered with AWS service teams to influence roadmap decisions using enterprise feedback, operating patterns, and emerging use cases.",
            ],
        )
    )

    story.extend(section("Earlier Experience"))
    story.extend(
        role_block(
            "Analyst, Consultant, and Software Engineering Manager",
            "Accenture Federal Services",
            "Sep 2012 - Aug 2016",
            [
                "Advanced through three roles while leading secure cloud, identity, DevOps, and application-delivery programs for defense and civilian agencies.",
                "Served as the federal lead for Microsoft Azure capabilities and a technical delivery lead for U.S. Air Force programs.",
                "Designed reusable identity and access frameworks using SAML, WS-Federation, WS-Trust, and PKI and led a secure self-service cloud portal for PaaS provisioning.",
                "Designed and oversaw a DevOps framework using continuous integration, delivery automation, version control, and automated testing.",
            ],
        )
    )
    story.extend(
        role_block(
            "Solution Developer",
            "Avanade",
            "Jul 2011 - Sep 2012",
            [
                "Led architecture and development for USPS Merchant Returns, a SaaS platform for chargeback-based return shipping.",
                "Rebuilt the user interface, developed location-based routing, delivered customer integrations, and supported international expansion with Canada Post.",
            ],
        )
    )
    story.extend(
        role_block(
            "Junior Developer and QA Lead",
            "Harmonia Holdings Group",
            "May 2010 - Jun 2011",
            [
                "Built research software for NIH and U.S. Army programs focused on data mining, storytelling, and statistical visualization.",
                "Promoted to lead release testing, regression suites, and automated quality workflows across concurrent projects.",
            ],
        )
    )

    story.extend(section("Education"))
    story.append(Paragraph("<b>Harvard Business School Online</b> - Credential of Leadership, Impact, and Management in Business (CLIMB), Experienced Leaders cohort, 2025; Credential of Readiness (CORe), High Honors, 2021.", BODY))
    story.append(Paragraph("<b>Virginia Tech</b> - Bachelor of Science, Computer Science, 2011.", BODY))

    story.extend(section("Certifications and Leadership Practice"))
    story.append(Paragraph("<b>AWS:</b> Machine Learning Engineer - Associate; AI Practitioner; Solutions Architect - Associate; SysOps Administrator - Associate; Developer - Associate.", BODY))
    story.append(Paragraph("<b>Additional:</b> MCSA: Cloud Platform; Enterprise Sales Professional Certificate, Smith School of Business at Queen's University.", BODY))
    story.append(Paragraph("<b>Leadership:</b> Amazon Doc Bar Raiser; Amazon Blog Bar Raiser; executive-onboarding coach; Global Mentorship Initiative Platinum Mentor and Certified Mentor.", BODY))

    story.extend(section("Issued U.S. Patents"))
    story.append(Paragraph('<b>US 11,194,558 (2021)</b> - <link href="https://patents.google.com/patent/US11194558">Application Migration System</link>: coordinated enterprise application and data migration automation.', BODY))
    story.append(Paragraph('<b>US 10,409,589 (2019)</b> - <link href="https://patents.google.com/patent/US10409589">Application-Centric Continuous Integration and Delivery</link>: lifecycle automation with service assurance and governance.', BODY))

    return story


def generate(output_path: Path = OUTPUT):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    frame = Frame(LEFT, BOTTOM, PAGE_WIDTH - LEFT - RIGHT, PAGE_HEIGHT - TOP - BOTTOM, id="resume")
    template = PageTemplate(id="resume", frames=[frame], onPageEnd=footer)
    doc = BaseDocTemplate(
        str(output_path),
        pagesize=LETTER,
        leftMargin=LEFT,
        rightMargin=RIGHT,
        topMargin=TOP,
        bottomMargin=BOTTOM,
        title="Christopher Brown - Enterprise Customer Engineering and Post-Sales Operations Resume",
        author="Christopher Brown",
        subject="Enterprise customer engineering, post-sales operations, strategic accounts, and AI-enabled support leadership",
    )
    doc.addPageTemplates(template)
    doc.build(build_story())
    add_accessibility_metadata(output_path)

    ARCHIVE_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(output_path, ARCHIVE_OUTPUT)
    return output_path


if __name__ == "__main__":
    generated = generate()
    print(generated)
