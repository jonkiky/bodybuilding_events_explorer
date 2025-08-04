import requests
import re
import json

# Step 1: Fetch HTML source
url = "https://npcnewsonline.com/schedule/"
headers = {
    "User-Agent": "Mozilla/5.0"
}

response = requests.get(url, headers=headers)
html = response.text

# Debug: Check if stecJsonEvents exists in the HTML
if 'stecJsonEvents' in html:
    print("✅ Found 'stecJsonEvents' in HTML")
    # Find the start and get a sample
    start_pos = html.find('stecJsonEvents')
    sample = html[start_pos:start_pos+200]
    print(f"Sample: {sample}")
else:
    print("❌ 'stecJsonEvents' not found in HTML")

# Step 2: Extract stecJsonEvents object using improved regex
# Look for the variable assignment and capture the JSON array
# The actual format is: stecJsonEvents['stec-id-XXXX']=[array];
match = re.search(r'stecJsonEvents\[\'[^\']+\'\]\s*=\s*(\[.*?\]);', html, re.DOTALL)

if match:
    json_raw = match.group(1)

    try:
        # Step 3: Parse to Python object
        events = json.loads(json_raw)

        # Step 4: Save to JSON file
        with open("npc_events.json", "w", encoding="utf-8") as f:
            json.dump(events, f, indent=2, ensure_ascii=False)

        print(f"✅ Extracted {len(events)} events to npc_events.json")

    except json.JSONDecodeError as e:
        print("❌ JSON decoding error:", e)
else:
    print("❌ Could not find stecJsonEvents object in the page.")
