### 📌 Prompt: Extract Event Addresses and Write to JSON

Look at the `npc_events.json` file. For each event in the JSON object:

1. **Extract** the `title` of the event.
2. **Search the internet** for the full address using the event title.
3. **Create** a corresponding entry in a new file named `npc_address.json` with the following structure:

   ```json
   {
     "title": "<event title>",
     "full_address": "<full address>"
   }
   ```

4. If the address **cannot be found**, set `"full_address"` to:

   ```json
   "to be determined"
   ```
