Conver the object to required format. 
required format:

{
  "data": [
    {
      "id": random_uuid,
      "position": [
        latitude,
        longitude
      ],
      "name": event title or event name,
      "popupText": name of this object,
    
      "address": address,
      "fullAddress": fullAddress ,
      "date": event start_date,
      "federation": name of federation,
      "flyers": flyer image url,
      "link": event's website,
      "eventType": [
       if  Amateur Competition then "Amateur Competition",
       if  Pro Competition then "Pro Competition"
       if both add both
      ],
      "divisions": [
        event categories 
      ],
      "proPayouts": any cash price,
      "promoter": name of prompter or contact,
      "email": email of contact,
      "phone": photo number of contact
    },
]
}

for example if we have json object that have event like this. 



{
    "post_status": "publish",
    "event_status": "EventScheduled",
    "id": 967583,
    "author": "Rebecca Schramm",
    "title": "2025 NPC Mel Chancey Holiday Classic",
    "slug": "2025-npc-mel-chancey-holiday-classic",
    "description": "<p><a href=\"https://www.muscleware.com/register/2025-MCHY-HOLC\" class=\"npc-schedule-button\" target=\"_blank\" rel=\"noopener\">Athlete Registration</a></p>\n",
    "description_short": "",
    "uid": "2025-MCHY-HOLC",
    "recurrence_id": "",
    "calid": 686587,
    "color": "#f5d42d",
    "icon": "fa",
    "icon_type": "date",
    "visibility": [
      "stec_cal_default"
    ],
    "back_visibility": [
      "stec_cal_default"
    ],
    "featured": 0,
    "start_date": "2025-12-20 03:00:00",
    "end_date": "2025-12-20 17:00:00",
    "all_day": 1,
    "hide_end": 0,
    "keywords": "",
    "counter": 0,
    "comments": 0,
    "rsvp": 0,
    "link": {
      "url": "http://www.npcholidayclassic.com",
      "text": "Visit Website"
    },
    "approved": 1,
    "exdate": "",
    "rrule": "",
    "is_advanced_rrule": 0,
    "location": {
      "id": 6831,
      "full_address": "Punta Gorda, FL",
      "title": "",
      "address": "Punta Gorda, FL",
      "city": "",
      "country": "",
      "coordinates": "",
      "details": "",
      "type": "physical",
      "qrcode": ""
    },
    "images": [
      967582
    ],
    "images_meta": [
      {
        "alt": "",
        "caption": "",
        "description": "",
        "src": "https://npcnewsonline.com/wp-content/uploads/2025/01/2025-MCHY-HOLC.jpg?rev=1738170055",
        "thumb": "https://npcnewsonline.com/wp-content/uploads/2025/01/2025-MCHY-HOLC-148x200.jpg?rev=1738170055",
        "title": "2025-MCHY-HOLC.jpg",
        "id": 967582
      }
    ],
    "icon_images": [],
    "icon_images_meta": [],
    "schedule": [],
    "guests": [],
    "organizers": [
      {
        "id": 6729,
        "name": "Chancey Fitness LLC",
        "photo": null,
        "photo_src": null,
        "details": "",
        "social": [
          {
            "ico": "fas fa-globe",
            "link": "http://www.npcholidayclassic.com"
          }
        ],
        "permalink": "https://npcnewsonline.com/schedule_organizer/Chancey_Fitness_LLC"
      }
    ],
    "attendance": [],
    "attendance_visibility": "public",
    "rsvp_limit": 0,
    "attachments": [],
    "products": [],
    "bookable_products": [],
    "bookable_purchase_limit": "0",
    "timezone_utc_offset": -14400,
    "timezone": "America/New_York",
    "permalink": "https://npcnewsonline.com/schedule_event/2025-npc-mel-chancey-holiday-classic/",
    "calendar": {
      "id": 686587,
      "title": "Contest Schedule",
      "color": "#f5d42d",
      "timezone": "America/New_York"
    },
    "category": [
      {
        "id": 6595,
        "title": "Bikini",
        "color": "#f5d42d"
      },
      {
        "id": 6761,
        "title": "Classic Physique",
        "color": "#f5d42d"
      },
      {
        "id": 6773,
        "title": "Figure",
        "color": "#f5d42d"
      },
      {
        "id": 6760,
        "title": "Men's Bodybuilding",
        "color": "#f5d42d"
      },
      {
        "id": 6762,
        "title": "Men's Physique",
        "color": "#f5d42d"
      },
      {
        "id": 6612,
        "title": "National Physique Committee",
        "color": "#f5d42d"
      },
      {
        "id": 6765,
        "title": "Wellness",
        "color": "#f5d42d"
      },
      {
        "id": 6763,
        "title": "Women's Bodybuilding",
        "color": "#f5d42d"
      },
      {
        "id": 7552,
        "title": "Women's Fit Model",
        "color": "#f5d42d"
      },
      {
        "id": 6764,
        "title": "Women's Physique",
        "color": "#f5d42d"
      }
    ],
    "edit_link": null
  },


add a object to data array like this. 

{
  "data": [
    {
      "id": "2025-MCHY-HOLC",
      "position": [],
      "popupText": "2025 NPC Mel Chancey Holiday Classic",
      "name": "2025 NPC Mel Chancey Holiday Classic",
      "address": "Punta Gorda, FL",
      "fullAddress": "tbd",
      "date": "2025-12-20",
      "federation":"NPC",
      "flyers": "https://npcnewsonline.com/wp-content/uploads/2025/01/2025-MCHY-HOLC.jpg?rev=1738170055",
      "link": "http://www.npcholidayclassic.com",
      "eventType": [],
      "divisions": [
        "Bikini",
        "Classic Physique",
        "Figure",
        "Men's Bodybuilding",
        "National Physique Committee",
        "Wellness",
        "Women's Bodybuilding",
        "Women's Fit Model",
        "Women's Physique"
      ],
      "proPayouts": "1500, 1000, 500",
      "promoter": "Rebecca Schramm",
      "email": "",
      "phone": ""
    },
]
}
