"""Conservative WCAG contrast bounds for MOMOA's static CSS text palettes.

Normal source-over compositing in sRGB: composite = alpha*overlay +
(1-alpha)*image. Each image channel may be anywhere in [0,255]. WCAG
relative luminance is monotonic in each channel, so interval endpoints
bound every pixel, regardless of the actual texture. Additional ink
gradients only darken the dark families and cannot lower light-text contrast.
"""
import hashlib
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS = ROOT / 'docs/assets/styles.css'
OUT = ROOT / 'verification/contrastes.json'

def rgb(value):
    return [int(value[index:index + 2], 16) for index in (1, 3, 5)]

def luminance(channels):
    channels = [value / 255 for value in channels]
    linear = [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4 for value in channels]
    return sum(value * weight for value, weight in zip(linear, (0.2126, 0.7152, 0.0722)))

def contrast(first, second):
    low, high = sorted((luminance(first), luminance(second)))
    return (high + 0.05) / (low + 0.05)

families = [
    ('stone', '.stone, .site-header, .mobile-menu', '#dce2e4', .97,
     'rgba(220, 226, 228, 0.97)', [
         ('#101722', 'Inherited body text, headings, ordinary links, form labels, mobile-menu text'),
         ('#233653', '.faq-links'),
         ('#983d35', '.field-error'),
     ]),
    ('home-artworks', '.home-artworks, .home-featured', '#233340', .78,
     'rgba(35, 51, 64, 0.78)', [
         ('#ffffff', 'Inherited .home-artworks headings'),
         ('#dadee3', '.featured-heading p, .artwork-card--home .artwork-description p'),
     ]),
    ('hero', '.hero::before', '#101722', .87,
     'rgba(16, 23, 34, 0.87)', [
         ('#ffffff', 'Inherited .hero headings and homepage-header text'),
         ('#dadee3', '.hero-subtitle'),
     ]),
    ('reproductions', '.home-reproductions', '#30404a', .95,
     'rgba(48, 64, 74, 0.95)', [
         ('#ffffff', 'Inherited headings and transparent outline button'),
         ('#dadee3', '.reproductions-copy p'),
     ]),
    ('gallery-history', '.gallery-history', '#101722', .64,
     'rgba(16, 23, 34, 0.64)', [
         ('#ffffff', '.history-copy h2'),
         ('#eef0f2', '.history-copy'),
     ]),
]

source = CSS.read_text()
rows = []
for family, selector, overlay, alpha, css_rgba, foregrounds in families:
    assert css_rgba in source, f'Expected overlay missing: {css_rgba}'
    # Round outwards so 8-bit display quantization cannot make the bound optimistic.
    darkest = [math.floor(alpha * value) for value in rgb(overlay)]
    brightest = [math.ceil(alpha * value + (1 - alpha) * 255) for value in rgb(overlay)]
    for foreground, text_scope in foregrounds:
        fore = rgb(foreground)
        fore_lum = luminance(fore)
        if fore_lum < luminance(darkest):
            worst = darkest
            underlying = '#000000'
        elif fore_lum > luminance(brightest):
            worst = brightest
            underlying = '#ffffff'
        else:
            raise AssertionError(f'Foreground lies inside possible luminance interval: {family}, {foreground}')
        ratio = contrast(fore, worst)
        rows.append({
            'family': family, 'backgroundSelectors': selector,
            'overlay': overlay, 'minimumAlpha': alpha,
            'foreground': foreground, 'textScope': text_scope,
            'worstUnderlyingImagePixel': underlying,
            'worstCompositeRGB': worst, 'minimumContrastRatio': ratio,
            'normalTextAAThreshold': 4.5, 'passesForNormalAndLargeText': ratio >= 4.5,
        })

solid_pairs = [
    ('#233653', '#ffffff', '.button--ivory'),
    ('#233653', '#f5f2ec', '.button--ivory:hover'),
    ('#101722', '#ffffff', '.skip-link; .home-reproductions .button:hover'),
    ('#101722', '#e8eceb', '.panel; .menu-links a:hover; .signup-complete .signup-about'),
    ('#101722', '#f5f2ec', '.form-field input'),
    ('#ffffff', '#101722', '.button--primary; .button--outline:hover; footer; menu-open header'),
    ('#ffffff', '#233653', '.button--primary:hover; .artwork-card--home .artwork-link:hover .button'),
]
solids = [{'foreground': fore, 'background': back, 'textScope': scope,
           'contrastRatio': contrast(rgb(fore), rgb(back)),
           'normalTextAAThreshold': 4.5,
           'passesForNormalAndLargeText': contrast(rgb(fore), rgb(back)) >= 4.5}
          for fore, back, scope in solid_pairs]

result = {
    'cssSHA256': hashlib.sha256(CSS.read_bytes()).hexdigest(),
    'method': 'Conservative sRGB source-over channel bounds followed by WCAG 2 relative luminance; arbitrary image channels 0..255; composite channel bounds rounded outwards to integer RGB for display quantization; all text is tested at the stricter normal-text AA threshold 4.5:1 regardless of size or weight.',
    'mapping': 'CSS foreground inheritance and explicit color overrides were reviewed for each textured family and for solid text/button palettes. The gallery-history bound uses its lowest alpha 0.64 anywhere in either mobile or desktop gradient. Additional ink-to-transparent hero/featured gradients only improve light-text contrast.',
    'scope': 'Stable authored foreground/background colors of regular text, including all gradient families and normal/settled hover palettes. This resolves the gradient-background contrast uncertainty from the 50 axe checks; it is not a complete manual WCAG audit and does not model antialiasing or intermediate animation frames.',
    'gradientChecks': rows,
    'solidChecks': solids,
    'lowestGradientRatio': min(row['minimumContrastRatio'] for row in rows),
    'allPassNormalTextAA': all(row['passesForNormalAndLargeText'] for row in rows + solids),
}
OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'gradientPairs': len(rows), 'solidPairs': len(solids),
                  'lowestRatio': result['lowestGradientRatio'],
                  'allPassNormalTextAA': result['allPassNormalTextAA'], 'output': str(OUT)}))
