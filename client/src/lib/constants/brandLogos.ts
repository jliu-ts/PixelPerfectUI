// Brand marks sourced from Brandfetch and vendored into the repo rather than hotlinked.
// The Brandfetch CDN rejects unregistered origins (302 -> hotlinking guidelines, which the
// browser then blocks), and the credentials that do permit access are per-request, so an
// embedded CDN URL would eventually 404. Local files cannot break.
//
// -icon        square mark, for the white logo chips and circular story avatars
// -wordmark-light  light-ink wordmark, only legible variant on MediaKit's dark grayscale box

import adobeWordmark from "@assets/brand_logos/adobe-wordmark-light.png";
import canva from "@assets/brand_logos/canva-icon.png";
import elevenlabs from "@assets/brand_logos/elevenlabs-icon.png";
import epidemicsound from "@assets/brand_logos/epidemicsound-icon.png";
import fandom from "@assets/brand_logos/fandom-icon.png";
import hellofresh from "@assets/brand_logos/hellofresh-icon.png";
import heygen from "@assets/brand_logos/heygen-icon.png";
import huggingface from "@assets/brand_logos/huggingface-icon.png";
import instagram from "@assets/brand_logos/instagram-icon.png";
import leonardo from "@assets/brand_logos/leonardo-icon.png";
import midjourney from "@assets/brand_logos/midjourney-icon.png";
import nike from "@assets/brand_logos/nike-icon.png";
import nikeWordmark from "@assets/brand_logos/nike-wordmark-light.png";
import nordvpn from "@assets/brand_logos/nordvpn-icon.png";
import notion from "@assets/brand_logos/notion-icon.png";
import openai from "@assets/brand_logos/openai-icon.png";
import pika from "@assets/brand_logos/pika-icon.png";
import raycon from "@assets/brand_logos/rayconglobal-icon.png";
import runway from "@assets/brand_logos/runwayml-icon.png";
import samsung from "@assets/brand_logos/samsung-icon.png";
import samsungWordmark from "@assets/brand_logos/samsung-wordmark-light.png";
import shopify from "@assets/brand_logos/shopify-icon.png";
import skillshare from "@assets/brand_logos/skillshare-icon.png";
import spotifyWordmark from "@assets/brand_logos/spotify-wordmark-light.png";
import squarespace from "@assets/brand_logos/squarespace-icon.png";
import stability from "@assets/brand_logos/stability-icon.png";
import techcrunch from "@assets/brand_logos/techcrunch-icon.png";
import theverge from "@assets/brand_logos/theverge-icon.png";
import tiktok from "@assets/brand_logos/tiktok-icon.png";
import wired from "@assets/brand_logos/wired-icon.png";
import youtube from "@assets/brand_logos/youtube-icon.png";
import figma from "@assets/brand_logos/figma-icon.png";
import google from "@assets/brand_logos/google-icon.png";
import pandadoc from "@assets/brand_logos/pandadoc-icon.png";
import n8n from "@assets/brand_logos/n8n-icon.png";
import slack from "@assets/brand_logos/slack-icon.png";
import airtable from "@assets/brand_logos/airtable-icon.png";

export const BRAND_LOGOS = {
  airtable,
  slack,
  n8n,
  pandadoc,
  google,
  figma,
  adobe: adobeWordmark,
  canva,
  elevenlabs,
  epidemicsound,
  fandom,
  hellofresh,
  heygen,
  huggingface,
  instagram,
  leonardo,
  midjourney,
  nike,
  nikeWordmark,
  nordvpn,
  notion,
  openai,
  pika,
  raycon,
  runway,
  samsung,
  samsungWordmark,
  shopify,
  skillshare,
  spotify: spotifyWordmark,
  squarespace,
  stability,
  techcrunch,
  theverge,
  tiktok,
  wired,
  youtube,
} as const;

export type BrandLogoKey = keyof typeof BRAND_LOGOS;
