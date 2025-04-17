const QRCodeStyling = require("qr-code-styling-node");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const {
    data = "https://example.com",
    dotsColor = "#000000",
    eyeInnerColor = "#000000",
    eyeOuterColor = "#000000",
    dotsType = "rounded",
    eyeInnerShape = "rounded",
    eyeOuterShape = "extra-rounded",
    transparent = false,
    backgroundColor = "#ffffff",
    logo = null,
    format = "png"
  } = req.body;

  const qrCode = new QRCodeStyling({
    width: 600,
    height: 600,
    type: format,
    data: data,
    dotsOptions: {
      color: dotsColor,
      type: dotsType,
    },
    cornersSquareOptions: {
      color: eyeOuterColor,
      type: eyeOuterShape,
    },
    cornersDotOptions: {
      color: eyeInnerColor,
      type: eyeInnerShape,
    },
    backgroundOptions: {
      color: transparent ? "transparent" : backgroundColor,
    },
    image: logo || undefined,
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 10,
    },
  });

  try {
    const buffer = await qrCode.getRawData(format);
    res.setHeader("Content-Disposition", `attachment; filename=qr-code.${format}`);
    res.setHeader("Content-Type", `image/${format}`);
    res.send(buffer);
  } catch (err) {
    res.status(500).send("Error generating QR code");
  }
};
