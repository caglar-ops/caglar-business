#!/usr/bin/env python3
"""
Manolo Blahnik Hangisi Blue Satin Jewel Buckle Pump - Size 41.5
Resale tracker: searches eBay, Poshmark, TheRealReal, Vestiaire, Depop
Sends Telegram alert when new listings are found.
"""

import json
import os
import hashlib
import requests
from datetime import datetime
from urllib.parse import quote_plus

# --- Config ---
BRAVE_API_KEY = os.environ.get("BRAVE_API_KEY", "BSAdtjyLovFQSxX0fYDOxzcaWRd2TMw")
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8681867926:AAG7WoXHB3nUqN4MRHy-VZWkZlikq-VD23I")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "6635217245")
SEEN_FILE = os.path.join(os.path.dirname(__file__), "seen_listings.json")

SEARCH_QUERIES = [
    'site:poshmark.com "manolo blahnik" "hangisi" "blue" "satin" "41.5"',
    'site:therealreal.com "manolo blahnik" "hangisi" "blue" "satin" "41.5"',
    'site:ebay.com "manolo blahnik hangisi" "blue satin" "41.5"',
    'site:vestiairecollective.com "manolo blahnik" "hangisi" "blue" "41.5"',
    'site:depop.com "manolo blahnik" "hangisi" "blue" "41.5"',
    '"manolo blahnik" "hangisi" "blue satin" "jewel" "41.5" (poshmark OR therealreal OR ebay OR vestiaire)',
]

def load_seen():
    if os.path.exists(SEEN_FILE):
        with open(SEEN_FILE) as f:
            return json.load(f)
    return {}

def save_seen(seen):
    with open(SEEN_FILE, "w") as f:
        json.dump(seen, f, indent=2)

def listing_id(url):
    return hashlib.md5(url.encode()).hexdigest()

def brave_search(query):
    headers = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": BRAVE_API_KEY,
    }
    params = {
        "q": query,
        "count": 10,
        "freshness": "pw",  # past week
    }
    try:
        r = requests.get(
            "https://api.search.brave.com/res/v1/web/search",
            headers=headers,
            params=params,
            timeout=15,
        )
        r.raise_for_status()
        data = r.json()
        return data.get("web", {}).get("results", [])
    except Exception as e:
        print(f"Search error for query '{query}': {e}")
        return []

def is_relevant(result):
    """Filter to make sure result is actually about the right shoe."""
    text = (result.get("title", "") + " " + result.get("description", "")).lower()
    keywords = ["hangisi", "manolo", "41.5", "blue"]
    return all(kw in text for kw in keywords)

def send_telegram(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "HTML",
        "disable_web_page_preview": False,
    }
    try:
        r = requests.post(url, json=payload, timeout=10)
        r.raise_for_status()
        print("Telegram alert sent.")
    except Exception as e:
        print(f"Telegram error: {e}")

def source_label(url):
    if "poshmark" in url: return "Poshmark"
    if "therealreal" in url: return "TheRealReal"
    if "ebay" in url: return "eBay"
    if "vestiaire" in url: return "Vestiaire Collective"
    if "depop" in url: return "Depop"
    if "facebook" in url: return "Facebook Marketplace"
    return "Resale Site"

def run():
    print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting shoe tracker scan...")
    seen = load_seen()
    new_listings = []

    for query in SEARCH_QUERIES:
        print(f"Searching: {query[:80]}...")
        results = brave_search(query)
        for result in results:
            url = result.get("url", "")
            if not url:
                continue
            if not is_relevant(result):
                continue
            lid = listing_id(url)
            if lid not in seen:
                seen[lid] = {
                    "url": url,
                    "title": result.get("title", ""),
                    "description": result.get("description", ""),
                    "found_at": datetime.now().isoformat(),
                }
                new_listings.append(result)
                print(f"  NEW: {result.get('title', '')[:80]}")

    save_seen(seen)

    if new_listings:
        msg_lines = ["👠 <b>Manolo Blahnik Hangisi Alert!</b>\n"]
        msg_lines.append(f"Found <b>{len(new_listings)}</b> new listing(s) — size 41.5 blue satin:\n")
        for r in new_listings[:5]:  # cap at 5 per alert
            source = source_label(r.get("url", ""))
            title = r.get("title", "No title")[:80]
            url = r.get("url", "")
            msg_lines.append(f"🔹 <b>{source}</b>: {title}")
            msg_lines.append(f"   <a href='{url}'>View listing →</a>\n")
        send_telegram("\n".join(msg_lines))
        print(f"Sent alert for {len(new_listings)} new listing(s).")
    else:
        print("No new listings found. Silent — no message sent.")

    print("Scan complete.")

if __name__ == "__main__":
    run()
