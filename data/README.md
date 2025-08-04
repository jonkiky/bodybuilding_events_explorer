# Bodybuilding Events Explorer - Data Processing

## Python Virtual Environment Setup

### Creating a Virtual Environment

1. **Create a new virtual environment:**
   ```bash
   python3 -m venv venv
   ```

2. **Activate the virtual environment:**
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

3. **Install required packages:**
   ```bash
   pip install -r requirements.txt
   ```
   
   **Alternative: Install packages individually:**
   ```bash
   pip install requests
   pip install opencage
   pip install -r requirements.txt
   ```

4. **Verify package installation:**
   ```bash
   pip list
   # Should show: requests, opencage, and their dependencies
   ```

### Using the Virtual Environment

- **Always activate the virtual environment before running scripts:**
  ```bash
  source venv/bin/activate  # macOS/Linux
  # or
  venv\Scripts\activate     # Windows
  ```

- **Run your Python scripts:**
  ```bash
  python extract_npc_events.py
  python refine_events.py
  ```

- **Deactivate the virtual environment when done:**
  ```bash
  deactivate
  ```

### Verifying Your Setup

You can verify that you're in the correct virtual environment by checking:
```bash
which python    # Should show path to venv/bin/python
pip list        # Should show only the packages you've installed
```

## Project Scripts

- `extract_npc_events.py` - Extracts NPC events data
- `refine_events.py` - Refines and transforms event data to the required format
- `requirements.txt` - Python package dependencies