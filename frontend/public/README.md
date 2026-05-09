# Brand assets

Drop your real ZENKO logo files here. The site reads them automatically.

| File           | Used by                          | Recommended size                   |
|----------------|----------------------------------|------------------------------------|
| `logo.png`     | Header, Hero center, Phone mock  | Square, transparent, ≥ 512×512 px  |
| `favicon.ico`  | Browser tab                      | 32×32 (or multi-res ico)           |
| `og-image.png` | Social share preview (optional)  | 1200×630, opaque                   |

`logo.png` is the icon-only mark (the green diamond). The wordmark "ZENKO"
is rendered as text next to it in the header, so you don't need to bake it
into the image.

If you want to use SVG instead, save as `logo.svg` and override in any
`<Logo />` use site like `<Logo src="/logo.svg" />`.
