#!/usr/bin/env python3
"""Generate an SVG QR code for a given URL."""

import qrcode
import qrcode.image.svg

DATA = "https://www.linkedin.com/in/keyvanmsadeghi"
OUTPUT = "public/qr.svg"


def main():
    factory = qrcode.image.svg.SvgImage
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
        image_factory=factory,
    )
    qr.add_data(DATA)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#FF6B00", back_color="transparent")
    img.save(OUTPUT)
    print(f"Saved QR code to {OUTPUT}")


if __name__ == "__main__":
    main()
