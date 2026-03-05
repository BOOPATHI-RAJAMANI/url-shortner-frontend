import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  InputAdornment,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import CompressIcon from "@mui/icons-material/Compress";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedIcon from "@mui/icons-material/Verified";
import DevicesIcon from "@mui/icons-material/Devices";
import ClearIcon from "@mui/icons-material/Clear";
import "./App.css";
import axios from "axios";

// Color palette constants
const COLORS = {
  background: "#F8FAFC",
  card: "#FFFFFF",
  primary: "#1E40AF",
  primaryHover: "#1a3a9e",
  secondary: "#3B82F6",
  success: "#16A34A",
  danger: "#DC2626",
  textPrimary: "#0F172A",
  textMuted: "#64748B",
  border: "#E2E8F0",
};

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleShortenUrl = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    try {
      const response = await fetch("https://url-shortner-backend-36so.onrender.com/api/url/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortenedUrl(`https://url-shortner-backend-36so.onrender.com/api/url/${data.alias}`);
      } else {
        alert(`Failed to shorten URL: ${data.message}`);
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Failed to shorten URL due to a network error.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    alert("Copied to clipboard!");
  };

  const handleRegenerate = async () => {
    if (!url) {
      alert("Enter a URL first!");
      return;
    }
    await handleShortenUrl();
    alert("New shortened URL generated!");
  };

  const handleClear = () => {
    setUrl("");
    setShortenedUrl("");
  };

  const fetchQRCode = async () => {
  if (!shortenedUrl) {
    alert("Please shorten a URL first.");
    return;
  }

  try {
    const response = await axios.get(
      `https://url-shortner-backend-36so.onrender.com/url/qrcode?url=${shortenedUrl}`
    );

    if (response.data.qrCode) {
      setQrCode(response.data.qrCode);
    } else {
      throw new Error("QR code generation failed");
    }
  } catch (error) {
    console.error("Error fetching QR code:", error);
    setQrCode("");
    alert("Failed to fetch QR Code.");
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: COLORS.background,
        padding: "20px",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          p: 4,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          borderRadius: 4,
          bgcolor: COLORS.card,
          color: COLORS.textPrimary,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: COLORS.primary, fontWeight: "bold" }}
        >
          SHORTEN YOUR URL
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ color: COLORS.textMuted, mb: 3 }}
        >
          Here is your URL Shortener Tool
        </Typography>

        <TextField
          fullWidth
          label="Please Paste Your URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{
            mb: 2,
            bgcolor: COLORS.card,
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              color: COLORS.textPrimary,
              "& fieldset": {
                borderColor: COLORS.border,
              },
              "&:hover fieldset": {
                borderColor: COLORS.secondary,
              },
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
                borderWidth: 2,
              },
            },
            "& .MuiInputLabel-root": {
              color: COLORS.textMuted,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ClearIcon />}
                  onClick={handleClear}
                  sx={{
                    color: COLORS.danger,
                    borderColor: COLORS.danger,
                    "&:hover": {
                      borderColor: COLORS.danger,
                      backgroundColor: "rgba(220, 38, 38, 0.05)",
                    },
                    borderRadius: "8px",
                    padding: "4px 12px",
                  }}
                >
                  Clear
                </Button>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          startIcon={<LinkIcon />}
          fullWidth
          onClick={handleShortenUrl}
          sx={{
            mb: 3,
            fontWeight: "bold",
            backgroundColor: COLORS.primary,
            color: COLORS.secondary,
            "&:hover": {
              backgroundColor: COLORS.primaryHover,
              transform: "translateY(-1px)",
              boxShadow: "0 6px 16px rgba(30, 64, 175, 0.25)",
            },
            borderRadius: "8px",
            transition: "all 0.3s ease",
            py: 1.5,
          }}
        >
          Shorten URL
        </Button>

        {shortenedUrl && (
          <Box sx={{ mt: 2, width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              value={shortenedUrl}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={handleCopy}
                      sx={{
                        backgroundColor: COLORS.secondary,
                        color: COLORS.secondary,
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#2563eb",
                        },
                        padding: "8px 16px",
                        mr: 1,
                        minWidth: "auto",
                      }}
                    >
                      <ContentCopyIcon />
                    </Button>
                    <Button
                      onClick={handleRegenerate}
                      sx={{
                        backgroundColor: "#f59e0b",
                        color: COLORS.textPrimary,
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#d97706",
                        },
                        padding: "8px 16px",
                        minWidth: "auto",
                      }}
                    >
                      <AutorenewIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: COLORS.background,
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  color: COLORS.textPrimary,
                  "& fieldset": {
                    borderColor: COLORS.border,
                  },
                },
              }}
            />
          </Box>
        )}

        <Typography variant="h6" sx={{ mt: 4, color: COLORS.textPrimary }}>
          Generate QR Code for Shortened URL
        </Typography>
        <TextField
          fullWidth
          label="Enter URL Alias"
          variant="outlined"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          sx={{
            mt: 2,
            "& .MuiOutlinedInput-root": {
              color: COLORS.textPrimary,
              "& fieldset": {
                borderColor: COLORS.border,
              },
              "&:hover fieldset": {
                borderColor: COLORS.secondary,
              },
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
              },
            },
            "& .MuiInputLabel-root": {
              color: COLORS.textMuted,
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: COLORS.secondary,
            "&:hover": {
              backgroundColor: "#2563eb",
            },
            borderRadius: "8px",
          }}
          onClick={fetchQRCode}
        >
          Generate QR Code
        </Button>

        {qrCode && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ color: COLORS.textPrimary, mb: 1 }}>
              QR Code:
            </Typography>
            <Box
              sx={{
                border: `4px solid ${COLORS.border}`,
                borderRadius: 2,
                padding: 1,
                bgcolor: COLORS.card,
                display: "inline-block",
              }}
            >
              <img src={qrCode} alt="QR Code" />
            </Box>
          </Box>
        )}
      </Container>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ mt: 5, maxWidth: 800, textAlign: "center" }}
      >
        {[
          {
            icon: (
              <AccessibilityIcon
                fontSize="large"
                sx={{ color: COLORS.primary }}
              />
            ),
            text: "User-Friendly",
          },
          {
            icon: (
              <CompressIcon fontSize="large" sx={{ color: COLORS.primary }} />
            ),
            text: "Compact",
          },
          {
            icon: (
              <SecurityIcon fontSize="large" sx={{ color: COLORS.primary }} />
            ),
            text: "Protected",
          },
          {
            icon: (
              <VerifiedIcon
                fontSize="large"
                sx={{ color: COLORS.primary }}
              />
            ),
            text: "Dependable",
          },
          {
            icon: (
              <DevicesIcon fontSize="large" sx={{ color: COLORS.primary }} />
            ),
            text: "Cross-Platform",
          },
        ].map((feature, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            key={index}
            sx={{ mb: 2 }}
            className="grid-icon"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                p: 2,
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(59, 130, 246, 0.08)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              {feature.icon}
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ color: COLORS.textMuted, fontSize: "0.95rem" }}
              >
                {feature.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: 5,
          py: 3,
          textAlign: "center",
          width: "100%",
          maxWidth: 600,
        }}
      >
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
          {[
            "Shorten Link",
            "Track URL Clicks",
            "Report Suspicious Link",
            "Get in Touch",
          ].map((item, index) => (
            <Link
              key={index}
              href="#"
              sx={{
                color: COLORS.textMuted,
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: COLORS.primary,
                },
              }}
            >
              {item}
            </Link>
          ))}
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            color: COLORS.textMuted,
            mt: 2,
          }}
        >
          © 2025 ShortUrl.at - Your trusted tool for shortening links with ease
          and security.
        </Typography>
      </Box>
    </Box>
  );
}

export default App;

