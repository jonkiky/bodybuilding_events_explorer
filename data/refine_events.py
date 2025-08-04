import json
import uuid
from datetime import datetime
from opencage.geocoder import OpenCageGeocode

def transform_event(event):
    """Transforms a single event object to the required format."""
    
    # Determine eventType
    event_type = []
    category_titles = [cat.get('title', '') for cat in event.get('category', [])]
    if "National Physique Committee" in category_titles:
        event_type.append("Amateur Competition")
    if "IFBB Professional League" in category_titles:
        event_type.append("Pro Competition")

    # Extract divisions, filtering out federation names
    divisions = [
        cat.get('title', '') for cat in event.get('category', [])
    ]

    # Determine federation
    federation = ""
    if "npc" in event.get("title", "") or "NPC" in event.get("title", ""):
        federation = "NPC"
    elif "IFBB" in event.get("title", "") or "ifbb" in event.get("title", ""):
        federation = "IFBB"

    # Extract coordinates
    position = []
    coords = event.get('location', {}).get('coordinates')
    if coords and isinstance(coords, str) and ',' in coords:
        try:
            position = [float(c.strip()) for c in coords.split(',')]
        except (ValueError, TypeError):
            position = [] # Keep it empty if conversion fails

    # Extract latitude and longitude using OpenCage Geocoder

    # Initialize OpenCage Geocoder with your API key
    API_KEY = "eb8f5c09f1864aa59ab3bbdfe0942d0b"  # Replace with your actual OpenCage API key
    geocoder = OpenCageGeocode(API_KEY)

    position = []
    address = event.get("location", {}).get("address", "")
    if address:
        try:
            result = geocoder.geocode(address, no_annotations='1', limit=1)
            if result and len(result) > 0:
                geometry = result[0].get("geometry", {})
                position = [geometry.get("lat"), geometry.get("lng")]
        except Exception as e:
            print(f"Error geocoding address '{address}': {e}")

    return {
        "id": event.get("uid") or str(uuid.uuid4()),
        "position": position, 
        "name": event.get("title", ""),
        "popupText": event.get("title", ""),
        "address": event.get("location", {}).get("address", ""),
        "fullAddress": event.get("location", {}).get("full_address", ""),
        "date": event.get("start_date", "").split(" ")[0],
        "federation": federation,
        "flyers": event.get("images_meta", [{}])[0].get("src", "") if event.get("images_meta") else "",
        "link": event.get("link", {}).get("url", ""),
        "eventType": event_type,
        "divisions": divisions,
        "proPayouts": "",  # This information is not available in the source
        "promoter": event.get("organizers", [{}])[0].get("name", "") if event.get("organizers") else "",
        "email": "",  # This information is not available in the source
        "phone": ""  # This information is not available in the source
    }

def main():
    """
    Reads events from npc_events.json, transforms them,
    and saves them to npc_event_refine.json.
    """
    try:
        with open("npc_events.json", "r", encoding="utf-8") as f:
            source_events = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error reading npc_events.json: {e}")
        return

    refined_data = {"data": []}
    for event in source_events:
        try:
            event_date_str = event.get("start_date", "")
            event_date = datetime.strptime(event_date_str, "%Y-%m-%d %H:%M:%S")
            cutoff_date = datetime(2025, 9, 1)
            if event_date > cutoff_date:
                 print(f"Event {event.get('title', 'Unknown')} is after cutoff date.")
                 transformed = transform_event(event)
                 refined_data["data"].append(transformed)
        except ValueError:
            print(f"Skipping event with invalid date: {event.get('title', 'Unknown')}")
            continue  # Skip events with invalid or missing dates


    try:
        print(f"Successfully transformed {len(refined_data['data'])} events and saved to npc_event_refine.json")
        with open("npc_event_refine.json", "w", encoding="utf-8") as f:
            json.dump(refined_data, f, indent=2, ensure_ascii=False)
    except IOError as e:
        print(f"Error writing to npc_event_refine.json: {e}")

if __name__ == "__main__":
    main()
