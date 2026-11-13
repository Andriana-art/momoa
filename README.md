# MOMOA

MOMOA is a fictional university gallery of Greek sculpture and reproductions. This project contains 22 French and English pages in HTML, CSS, and JavaScript, based on the Builder export and the [approved Figma maquettes](https://www.figma.com/design/2hP92QF9qMobRzZcJIsvFf/Momoa-Export-HTM-Builder.io?node-id=282-1408).

| Path | Contents |
| --- | --- |
| `docs/` | Complete website, ready to serve from a static host |
| `docs/assets/styles.css` | Shared layout, typography, and responsive styles |
| `docs/assets/site.js` | Mobile menu and local demo form |
| `docs/assets/images/` and `docs/assets/fonts/` | Local images, typefaces, and font licenses |
| `src/content.mjs` | French and English copy, artwork records, and route map |
| `src/build.mjs` | Rebuilds the HTML from the shared templates and copy |

## Preview on your computer

1. Extract the ZIP. Open the extracted `momoa-website` folder.
2. Open a terminal in that folder. On Windows, you can type `powershell` in the File Explorer address bar and press Enter.
3. If Python is installed, run the command for your system.

   Windows:

   ```powershell
   py -m http.server 8000 --bind 127.0.0.1 --directory docs
   ```

   macOS or Linux:

   ```bash
   python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
   ```

4. Open [http://localhost:8000/](http://localhost:8000/) in your browser. Keep the terminal open while previewing. Press Ctrl+C in the terminal to stop.

The HTML is already generated. To edit copy, change `src/content.mjs` and run `node src/build.mjs` with Node.js 22 or later. Refresh the browser after editing the styles or JavaScript.

## Publish on GitHub Pages

1. In the team's GitHub repository, add the extracted project's contents so `docs/index.html` is at the root of the `docs` folder. Include `docs/.nojekyll`.
2. Commit the project to the branch you want to publish, such as `main`.
3. Open **Settings → Pages**. Choose **Deploy from a branch**. Select your branch and **/docs**, then click **Save**.
4. Open the address GitHub displays. Check the homepage, the English switch, and a notice reached directly through its URL.

The generated links are relative to the project folder. GitHub documents the publishing options and the `/docs` source folder in its [Pages setup guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Verification

| Check | Result |
| --- | --- |
| HTML and CSS | Nu HTML Checker reported zero errors across the 22 documents and the stylesheet. |
| Routes and local assets | All 22 pages, their language counterparts, and 811 local references resolved under a GitHub Pages style project path. |
| Collection and FAQ | Checked all six cards in both languages, all twelve previous/next links in each direction, and the homepage links to the full FAQ. |
| Resizing | Chromium rendered all 22 pages at 320, 360, 390, 639, 640, 768, 895, 896, 1024, 1440, and 1920 CSS px. The measured layouts had zero horizontal overflow, clipped text, or unintended intersections in the checked grids and controls. The open menu and form error and confirmation states also passed. |
| Keyboard navigation | Chromium passed 58 interaction checks, including Tab, Shift+Tab, skip-to-content, Enter, Space, Escape, menu focus return, a notice language switch, and both demo forms. A separate test passed 90 menu resize cases across both languages. The form resets input and makes no submission requests. |
| Accessibility scan and contrast | axe-core 4.14.0 reported zero automated WCAG A/AA violations in 54 checks across mobile, desktop, menus, and form states. The 832 text samples on textured backgrounds met their contrast thresholds. The lowest sampled ratio was 5.07 to 1. |
| Image files | All WebP files decoded. The bust and pedestal stay in one responsive image, and smaller viewports can load smaller assets. Collection cards and notices use their corresponding Figma crops, with separate desktop and mobile notice sources. |
| Lighthouse 13.6.0 | All 22 pages scored 94–99 for mobile Performance and 100 for mobile Accessibility, Best Practices, and SEO. Both Gallery pages scored 99 for mobile Performance. All four desktop scores were 100 on every page. Every page passed the meta description and HTTP status audits. |
| WAVE | Pending a WebAIM report for the published site. Enter the GitHub Pages URL in the WAVE web tool and review the Errors, Contrast Errors, and Alerts counts for each page tested. Use the WAVE extension for interactive states such as the open menu and form messages. |

The browser checks included 12 layouts at the CSS viewport size corresponding to 200% zoom in a 1440px window. A test using the browser's zoom control remains separate. Lighthouse ran against the locally served site. The `verification/` folder contains all 44 scores and the mobile and desktop reports for the French homepage and Gallery.

Run PageSpeed Insights against the public GitHub Pages URL after deployment. A sign-in-protected preview returns HTTP 401 to PageSpeed, which then audits the sign-in screen. Check that the report screenshot shows MOMOA.

## Content and credits for submission

- The final collection follows the six works in the approved Figma maquettes: Victoire de Samothrace, Discobole, Vénus de Milo, Prométhée, Athéna, and Poséidon.
- The Gallery information card links to the FAQ in both languages. This replaces the legacy DEDAL email and phone from the Builder export.
- Notice credits and original photo links are included where available. The adapted Discobole images carry the CC BY-SA 3.0 attribution and license link. The original museum link is retained, with the Cambridge museum page as a second source.
- The Prométhée notice cites the Berlin Nationalgalerie archive entry for the sculpture. The GNM replica record was unavailable during verification.
- The export credits the gallery portrait and exhibition photograph to Montserrat Mondragón / Pexels and the caryatids photograph to Efrem Efre / Pexels. The image files follow the supplied maquettes.
