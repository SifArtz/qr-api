const express = require("express");
const QRCodeStyling = require("qr-code-styling-node");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.post("/generate", async (req, res) => {
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
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 QR API running at http://localhost:${PORT}`);
});
