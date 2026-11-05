#!/usr/bin/env python3
"""
Generate a one-page proposal PDF on the Business Hustle letterhead.

Strategy:
1. Render proposal content as a transparent PDF using ReportLab (A4,
   positioned to clear the letterhead's header and footer).
2. Merge the letterhead PDF (as background) with the proposal content
   using pypdf.
"""

import os
import sys
from datetime import date

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
)
from pypdf import PdfReader, PdfWriter

# ---------------------------------------------------------------------------
# Brand colours (extracted from the official Business Hustle letterhead)
# ---------------------------------------------------------------------------
NAVY = colors.HexColor("#012D60")       # Primary brand colour
GOLD = colors.HexColor("#FFC400")       # Accent
ORANGE = colors.HexColor("#FF8500")     # Secondary accent
DARK = colors.HexColor("#1A1A1A")       # Body text
GRAY = colors.HexColor("#6B6B6B")       # Muted text
LIGHT_GRAY = colors.HexColor("#F5F5F5") # Table zebra
MID_GRAY = colors.HexColor("#D0D0D0")   # Table border

# ---------------------------------------------------------------------------
# Font registration (use system fonts that exist in the sandbox)
# ---------------------------------------------------------------------------
FONT_DIR_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu",
    "/usr/share/fonts/truetype/liberation",
    "/usr/share/fonts/truetype/noto",
]

def _find_font(*names):
    for d in FONT_DIR_CANDIDATES:
        if not os.path.isdir(d):
            continue
        for n in names:
            p = os.path.join(d, n)
            if os.path.isfile(p):
                return p
    return None

REG = _find_font("DejaVuSans.ttf", "LiberationSans-Regular.ttf")
BOLD = _find_font("DejaVuSans-Bold.ttf", "LiberationSans-Bold.ttf")
ITAL = _find_font("DejaVuSans-Oblique.ttf", "LiberationSans-Italic.ttf")

if REG:
    pdfmetrics.registerFont(TTFont("BH", REG))
if BOLD:
    pdfmetrics.registerFont(TTFont("BH-Bold", BOLD))
if ITAL:
    pdfmetrics.registerFont(TTFont("BH-Italic", ITAL))

# Fall back gracefully
FN = "BH" if REG else "Helvetica"
FB = "BH-Bold" if BOLD else "Helvetica-Bold"
FI = "BH-Italic" if ITAL else "Helvetica-Oblique"

# ---------------------------------------------------------------------------
# Paragraph styles
# ---------------------------------------------------------------------------
STYLES = {}

STYLES["meta"] = ParagraphStyle(
    "meta", fontName=FN, fontSize=7.5, leading=10, textColor=GRAY,
    alignment=TA_LEFT, spaceAfter=1,
)
STYLES["meta_right"] = ParagraphStyle(
    "meta_right", parent=STYLES["meta"], alignment=TA_RIGHT,
)
STYLES["title"] = ParagraphStyle(
    "title", fontName=FB, fontSize=14, leading=16, textColor=NAVY,
    alignment=TA_LEFT, spaceAfter=1,
)
STYLES["subtitle"] = ParagraphStyle(
    "subtitle", fontName=FI, fontSize=8.5, leading=11, textColor=GRAY,
    alignment=TA_LEFT, spaceAfter=5,
)
STYLES["h2"] = ParagraphStyle(
    "h2", fontName=FB, fontSize=9, leading=11, textColor=NAVY,
    alignment=TA_LEFT, spaceBefore=2, spaceAfter=1,
)
STYLES["body"] = ParagraphStyle(
    "body", fontName=FN, fontSize=8, leading=10, textColor=DARK,
    alignment=TA_JUSTIFY, spaceAfter=1,
)
STYLES["body_left"] = ParagraphStyle(
    "body_left", parent=STYLES["body"], alignment=TA_LEFT,
)
STYLES["bullet"] = ParagraphStyle(
    "bullet", fontName=FN, fontSize=8, leading=10, textColor=DARK,
    alignment=TA_LEFT, leftIndent=10, bulletIndent=2, spaceAfter=1,
)
STYLES["small"] = ParagraphStyle(
    "small", fontName=FN, fontSize=7, leading=9, textColor=GRAY,
    alignment=TA_LEFT, spaceAfter=1,
)
STYLES["small_bold"] = ParagraphStyle(
    "small_bold", fontName=FB, fontSize=7, leading=9, textColor=DARK,
    alignment=TA_LEFT,
)
STYLES["table_h"] = ParagraphStyle(
    "table_h", fontName=FB, fontSize=7.5, leading=9, textColor=colors.white,
    alignment=TA_LEFT,
)
STYLES["table_h_right"] = ParagraphStyle(
    "table_h_right", parent=STYLES["table_h"], alignment=TA_RIGHT,
)
STYLES["table_c"] = ParagraphStyle(
    "table_c", fontName=FN, fontSize=7.5, leading=9, textColor=DARK,
    alignment=TA_LEFT,
)
STYLES["table_c_right"] = ParagraphStyle(
    "table_c_right", parent=STYLES["table_c"], alignment=TA_RIGHT,
)
STYLES["table_c_bold"] = ParagraphStyle(
    "table_c_bold", fontName=FB, fontSize=7.5, leading=9, textColor=DARK,
    alignment=TA_LEFT,
)
STYLES["table_c_bold_right"] = ParagraphStyle(
    "table_c_bold_right", parent=STYLES["table_c_bold"], alignment=TA_RIGHT,
)
STYLES["sign"] = ParagraphStyle(
    "sign", fontName=FN, fontSize=7.5, leading=8, textColor=DARK,
    alignment=TA_LEFT, spaceAfter=0,
)
STYLES["sign_label"] = ParagraphStyle(
    "sign_label", fontName=FB, fontSize=7, leading=9, textColor=GRAY,
    alignment=TA_LEFT,
)

# ---------------------------------------------------------------------------
# Proposal data
# ---------------------------------------------------------------------------
PROPOSAL_DATE = "5 November 2026"
PROPOSAL_REF = "BH-BEL-2026-11-05"
VALID_DAYS = 30

# Phase 1 line items (ex VAT)
PHASE1_ITEMS = [
    ("Discovery, UX & content audit", "R 60,000"),
    ("Design system & component library", "R 50,000"),
    ("Next.js development & headless CMS integration", "R 120,000"),
    ("QA, WCAG accessibility audit & launch", "R 50,000"),
]
PHASE1_TOTAL = "R 280,000"

# Phase 2 monthly retainer (ex VAT)
PHASE2_ITEMS = [
    ("Outbound to architects & specifiers (email + LinkedIn)", "R 25,000"),
    ("Inbound nurture sequences & CRM integration", "R 15,000"),
    ("Qualified B2B appointment setting", "R 15,000"),
    ("Performance dashboard & monthly reporting", "R 10,000"),
]
PHASE2_MONTHLY = "R 65,000"

# Year-one summary
YEAR1_ITEMS = [
    ("Phase 1: Site rebuild (one-time)", "R 280,000"),
    ("Phase 2: B2B retainer (12 months at R 65,000)", "R 780,000"),
    ("Optional: CRO & performance retainer (12 months)", "R 264,000"),
]
YEAR1_SUBTOTAL = "R 1,324,000"
YEAR1_VAT = "R 198,600"
YEAR1_TOTAL = "R 1,522,600"

PILOT_TOTAL = "R 475,000"

# ---------------------------------------------------------------------------
# Build the proposal content (transparent background)
# ---------------------------------------------------------------------------
def build_content_pdf(path):
    """Build the proposal content as a transparent-background PDF."""
    page_w, page_h = A4  # 595.27, 841.89

    # Margins — clear the letterhead header (top ~125pt) and footer (~50pt)
    left = 42
    right = 42
    top = 125
    bottom = 50

    doc = SimpleDocTemplate(
        path,
        pagesize=A4,
        leftMargin=left,
        rightMargin=right,
        topMargin=top,
        bottomMargin=bottom,
        title="Business Hustle — Proposal for Belgotex",
        author="Business Hustle (Simple Eternity Holdings (Pty) Ltd)",
        subject="Proposal: Belgotex Digital Reimagining & B2B Pipeline Engine",
    )

    story = []
    avail_w = page_w - left - right  # ~505pt

    # --- Title block ---
    title_tbl = Table(
        [
            [
                Paragraph("PROPOSAL", STYLES["title"]),
                Paragraph(
                    f"<b>Date:</b> {PROPOSAL_DATE}<br/>"
                    f"<b>Ref:</b> {PROPOSAL_REF}<br/>"
                    f"<b>Valid:</b> {VALID_DAYS} days",
                    STYLES["meta_right"],
                ),
            ]
        ],
        colWidths=[avail_w * 0.55, avail_w * 0.45],
    )
    title_tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("LINEBELOW", (0, 0), (-1, 0), 1.2, NAVY),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 4),
    ]))
    story.append(title_tbl)
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "Belgotex Digital Reimagining &amp; B2B Pipeline Engine",
        STYLES["subtitle"],
    ))

    # --- Addressed To / From ---
    addr = Table(
        [
            [
                Paragraph(
                    "<b>To:</b> Belgotex Floorcoverings (Pty) Ltd<br/>"
                    "Pietermaritzburg, KwaZulu-Natal<br/>"
                    "Attention: Marketing &amp; Digital Leadership",
                    STYLES["meta"],
                ),
                Paragraph(
                    "<b>From:</b> Business Hustle<br/>"
                    "Simple Eternity Holdings (Pty) Ltd<br/>"
                    "99 Kloof Street, Gardens, Cape Town, 8001",
                    STYLES["meta_right"],
                ),
            ]
        ],
        colWidths=[avail_w * 0.5, avail_w * 0.5],
    )
    addr.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(addr)
    story.append(Spacer(1, 3))

    # --- 1. Executive Summary ---
    story.append(Paragraph("1. Executive Summary", STYLES["h2"]))
    story.append(Paragraph(
        "Business Hustle proposes a two-phase engagement to transform Belgotex's "
        "digital presence and B2B pipeline. Phase 1 rebuilds belgotex.co.za as a "
        "sub-second, fully accessible, conversion-focused platform (working demo "
        "delivered). Phase 2 installs a dedicated B2B demand-generation engine "
        "targeting architects, specifiers, developers and contractors across "
        "South Africa.",
        STYLES["body"],
    ))

    # --- 2. The Opportunity ---
    story.append(Paragraph("2. The Opportunity", STYLES["h2"]))
    story.append(Paragraph(
        "Belgotex.co.za currently loads in 15.3 seconds, fails WCAG accessibility "
        "audits, and ships 3.6 MB on first paint. The delivered demo proves a "
        "measurable improvement: sub-1.5s interactive, under 200 KB payload, "
        "WCAG AA+ across all categories. Combined with proactive B2B lead "
        "generation, Belgotex can convert latent demand into qualified pipeline "
        "within 90 days of engagement.",
        STYLES["body"],
    ))

    # --- 3. Scope of Work & Investment ---
    story.append(Paragraph("3. Scope of Work &amp; Investment", STYLES["h2"]))

    # Phase 1 table
    p1_data = [[
        Paragraph("Phase 1: Site Rebuild (one-time, 8 weeks)", STYLES["table_h"]),
        Paragraph("Investment (ex VAT)", STYLES["table_h_right"]),
    ]]
    for desc, amt in PHASE1_ITEMS:
        p1_data.append([
            Paragraph(desc, STYLES["table_c"]),
            Paragraph(amt, STYLES["table_c_right"]),
        ])
    p1_data.append([
        Paragraph("<b>Phase 1 Total</b>", STYLES["table_c_bold"]),
        Paragraph(f"<b>{PHASE1_TOTAL}</b>", STYLES["table_c_bold_right"]),
    ])
    p1 = Table(p1_data, colWidths=[avail_w * 0.70, avail_w * 0.30])
    p1.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, LIGHT_GRAY]),
        ("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#E8E8E8")),
        ("LINEBELOW", (0, 0), (-1, 0), 0.5, NAVY),
        ("LINEABOVE", (0, -1), (-1, -1), 0.5, MID_GRAY),
        ("LINEBELOW", (0, -1), (-1, -1), 1, NAVY),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    story.append(p1)
    story.append(Spacer(1, 3))

    # Phase 2 table
    p2_data = [[
        Paragraph("Phase 2: B2B Lead Generation (monthly retainer, 3-month minimum)", STYLES["table_h"]),
        Paragraph("Per Month (ex VAT)", STYLES["table_h_right"]),
    ]]
    for desc, amt in PHASE2_ITEMS:
        p2_data.append([
            Paragraph(desc, STYLES["table_c"]),
            Paragraph(amt, STYLES["table_c_right"]),
        ])
    p2_data.append([
        Paragraph("<b>Phase 2 Monthly Retainer</b>", STYLES["table_c_bold"]),
        Paragraph(f"<b>{PHASE2_MONTHLY}</b>", STYLES["table_c_bold_right"]),
    ])
    p2 = Table(p2_data, colWidths=[avail_w * 0.70, avail_w * 0.30])
    p2.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, LIGHT_GRAY]),
        ("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#E8E8E8")),
        ("LINEBELOW", (0, 0), (-1, 0), 0.5, NAVY),
        ("LINEABOVE", (0, -1), (-1, -1), 0.5, MID_GRAY),
        ("LINEBELOW", (0, -1), (-1, -1), 1, NAVY),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    story.append(p2)
    story.append(Spacer(1, 4))

    # --- 4. Year-One Investment Summary ---
    story.append(Paragraph("4. Year-One Investment Summary", STYLES["h2"]))

    y1_data = [[
        Paragraph("Item", STYLES["table_h"]),
        Paragraph("Amount (ex VAT)", STYLES["table_h_right"]),
    ]]
    for desc, amt in YEAR1_ITEMS:
        is_optional = "Optional" in desc
        style_c = STYLES["table_c"] if not is_optional else ParagraphStyle(
            "opt", parent=STYLES["table_c"], textColor=GRAY)
        style_r = STYLES["table_c_right"] if not is_optional else ParagraphStyle(
            "opt_r", parent=STYLES["table_c_right"], textColor=GRAY)
        y1_data.append([
            Paragraph(desc, style_c),
            Paragraph(amt, style_r),
        ])
    y1_data.append([
        Paragraph("<b>Year-One Subtotal (ex VAT)</b>", STYLES["table_c_bold"]),
        Paragraph(f"<b>{YEAR1_SUBTOTAL}</b>", STYLES["table_c_bold_right"]),
    ])
    y1_data.append([
        Paragraph("VAT (15%)", STYLES["table_c"]),
        Paragraph(YEAR1_VAT, STYLES["table_c_right"]),
    ])
    y1_data.append([
        Paragraph("<b>Year-One Total (incl VAT)</b>", STYLES["table_c_bold"]),
        Paragraph(f"<b>{YEAR1_TOTAL}</b>", STYLES["table_c_bold_right"]),
    ])
    y1 = Table(y1_data, colWidths=[avail_w * 0.70, avail_w * 0.30])
    y1.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("ROWBACKGROUNDS", (0, 1), (-1, 2), [colors.white, LIGHT_GRAY]),
        ("BACKGROUND", (0, 3), (-1, 3), colors.HexColor("#E8E8E8")),
        ("BACKGROUND", (0, 5), (-1, 5), GOLD),
        ("LINEBELOW", (0, 0), (-1, 0), 0.5, NAVY),
        ("LINEABOVE", (0, 3), (-1, 3), 0.5, MID_GRAY),
        ("LINEBELOW", (0, 3), (-1, 3), 0.5, MID_GRAY),
        ("LINEABOVE", (0, 5), (-1, 5), 1, NAVY),
        ("LINEBELOW", (0, 5), (-1, 5), 1.5, NAVY),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    story.append(y1)
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        f"<i>Pilot option:</i> Phase 1 + 3-month B2B pilot = <b>{PILOT_TOTAL} ex VAT</b>.",
        STYLES["small"],
    ))
    story.append(Spacer(1, 3))

    # --- 5. Expected Outcomes ---
    story.append(Paragraph("5. Expected Outcomes (90-day targets)", STYLES["h2"]))
    outcomes = [
        "Largest Contentful Paint under 1.2s, Lighthouse 90+ across all categories.",
        "120+ qualified B2B leads per month by month 3; 47% lower cost per qualified lead.",
        "18-day average time to first qualified meeting from engagement start.",
    ]
    for o in outcomes:
        story.append(Paragraph(f"• {o}", STYLES["bullet"]))

    story.append(Spacer(1, 2))

    # --- 6. Validity & Acceptance ---
    story.append(Paragraph("6. Validity &amp; Acceptance", STYLES["h2"]))
    story.append(Paragraph(
        f"This proposal is valid for {VALID_DAYS} days. To accept, sign below and "
        "return to team@businesshustle.co.za. A kickoff workshop will be scheduled "
        "within 5 business days of signature. All amounts are in South African "
        "Rand and exclude VAT unless stated.",
        STYLES["body"],
    ))

    story.append(Spacer(1, 3))

    # --- Signature block ---
    sig_data = [
        [
            Paragraph("Accepted for Belgotex Floorcoverings (Pty) Ltd", STYLES["sign_label"]),
            Paragraph("Accepted for Simple Eternity Holdings (Pty) Ltd t/a Business Hustle", STYLES["sign_label"]),
        ],
        [Spacer(1, 10), Spacer(1, 10)],
        [
            Paragraph("Name: ____________________________", STYLES["sign"]),
            Paragraph("Name: ____________________________", STYLES["sign"]),
        ],
        [
            Paragraph("Title: ____________________________", STYLES["sign"]),
            Paragraph("Title: ____________________________", STYLES["sign"]),
        ],
        [
            Paragraph("Date: ____________________________", STYLES["sign"]),
            Paragraph("Date: ____________________________", STYLES["sign"]),
        ],
        [
            Paragraph("Signature: ________________________", STYLES["sign"]),
            Paragraph("Signature: ________________________", STYLES["sign"]),
        ],
    ]
    sig = Table(sig_data, colWidths=[avail_w * 0.5, avail_w * 0.5])
    sig.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        # Signature lines
        ("LINEBELOW", (0, 1), (0, 1), 0.5, MID_GRAY),
        ("LINEBELOW", (1, 1), (1, 1), 0.5, MID_GRAY),
    ]))
    story.append(sig)

    doc.build(story)


# ---------------------------------------------------------------------------
# Merge letterhead (background) + content (overlay)
# ---------------------------------------------------------------------------
def merge_with_letterhead(letterhead_path, content_path, output_path):
    """Use the letterhead PDF as a background and overlay the content PDF."""
    lh_reader = PdfReader(letterhead_path)
    content_reader = PdfReader(content_path)
    writer = PdfWriter()

    lh_page = lh_reader.pages[0]
    content_page = content_reader.pages[0]

    # Overlay content on top of letterhead (letterhead is the base)
    lh_page.merge_page(content_page)

    # Set metadata
    writer.add_metadata({
        "/Title": "Business Hustle — Proposal for Belgotex",
        "/Author": "Business Hustle (Simple Eternity Holdings (Pty) Ltd)",
        "/Subject": "Proposal: Belgotex Digital Reimagining & B2B Pipeline Engine",
        "/Creator": "Business Hustle",
        "/Producer": "Business Hustle",
    })

    writer.add_page(lh_page)

    with open(output_path, "wb") as f:
        writer.write(f)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    letterhead = "/home/z/my-project/upload/Letterhead (1).pdf"
    content_pdf = "/tmp/letterhead/proposal-content.pdf"
    output = "/home/z/my-project/download/Business-Hustle-Proposal-Belgotex.pdf"

    os.makedirs(os.path.dirname(output), exist_ok=True)

    print("[1/3] Building proposal content (transparent PDF)...")
    build_content_pdf(content_pdf)
    print(f"      Wrote: {content_pdf}")

    print("[2/3] Merging with letterhead...")
    merge_with_letterhead(letterhead, content_pdf, output)
    print(f"      Wrote: {output}")

    print("[3/3] Done.")
    print(f"      Final: {output}")
    print(f"      Size:  {os.path.getsize(output):,} bytes")


if __name__ == "__main__":
    main()
