import { createTheme, type Theme, type ThemeOptions } from "@mui/material/styles";

// The mode IS PASSED AS A PARAMETER (no more hard-coded 'dark'): otherwise CssBaseline paints the
// <body> #121212 and field texts stay light => light mode breaks.
//
// background.default/paper = 'transparent' so that styles/tokens.css (--* tokens) keeps
// control over backgrounds, with no cascade war against the Emotion-injected styles.
export function buildTheme(mode: "light" | "dark"): Theme {
    return createTheme({
        cssVariables: true,
        palette: {
            mode,
            // ezjsdev brand (site/theme.css tokens). MUI needs parsable colors (no var()), so the
            // values are mirrored here, per mode: outlined/text buttons use them as TEXT color,
            // hence lighter on dark and darker on light (AA on --bg-0 / --surface-*). contrastText is
            // the label of the primary (blue → cyan gradient) button: navy on dark, white on light.
            primary:
                mode === "dark"
                    ? { main: "#5b9bff", contrastText: "#06101f" }
                    : { main: "#1d4ed8", contrastText: "#ffffff" },
            secondary: { main: mode === "dark" ? "#22c3ee" : "#0e7490" },
            background: {
                default: "transparent",
                paper: "transparent",
                // MUI v9 cannot derive a channel from 'transparent' (not parsable): the token is
                // explicitly removed to silence the warning, the background being controlled
                // by styles/base.css (CssBaseline must paint nothing).
                defaultChannel: undefined,
                paperChannel: undefined,
            },
        } as unknown as ThemeOptions["palette"],
        shape: { borderRadius: 12 },
        typography: {
            fontFamily: "var(--font-sans, system-ui, sans-serif)",
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        fontWeight: 600,
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    root: "html,body{margin:0}",
                },
            },
        },
    });
}

export const theme = buildTheme("dark");
