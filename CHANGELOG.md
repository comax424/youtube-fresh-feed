# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2026-11-26

First public release. Versions 1.0.0–1.2.0 were only used locally.

### Added

- Icon: a fresh leaf with a play triangle as its vein, in 16, 32, 48, 96 and 128 px.
- Firefox package (142 or later), signed by Mozilla, built from the same code by `build.sh`; `sign-firefox.sh` for signing.
- Documentation in English and German, MIT license, security policy.

## [1.2.0] - 2026-11-26

### Added

- Name, description and popup in 29 languages (all official EU languages plus Norwegian, Ukrainian, Russian,
  Turkish and Catalan), following the browser language.
- Age recognition in every YouTube language: the browser generates all possible age texts with
  `Intl.RelativeTimeFormat` in the page language. Tested with 909 real texts in 27 languages.

### Changed

- Renamed to “Fresh Feed for YouTube (unofficial)”.
- The popup heading is now “Maximum age of videos on the home page”, which works with every language's grammar.

## [1.1.0] - 2026-11-26

### Added

- Popup with a slider for the limit: 1–4 weeks, 1–11 months, 1–5 years. Changes apply immediately.

## [1.0.0] - 2026-11-26

### Added

- Hides videos on the YouTube home page that are older than 4 weeks (German and English interface).

[Unreleased]: https://github.com/comax424/youtube-fresh-feed/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/comax424/youtube-fresh-feed/releases/tag/v1.3.0
